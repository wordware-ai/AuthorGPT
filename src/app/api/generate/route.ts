import { db } from "@/db/db";
import { books } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NdJsonStream, OutputType, StreamToIterable } from "@/lib/stream";
import { BookData } from "@/lib/types";
import { SES } from "@aws-sdk/client-ses";
import { render } from "@jsx-email/render";
import { Template } from "@/emails/BookReady";

interface ImageGenerationOutput {
  nodeType: string;
  output: {
    type: string;
    image_url: string;
  };
}

interface ImageGenerationValues {
  "Image generation": ImageGenerationOutput;
  [key: string]: any;
}

export const maxDuration = 300;
export async function POST(req: Request): Promise<Response> {
  const { bookId } = await req.json();
  console.log("Book id", bookId);

  const book = await db.query.books.findFirst({
    where: eq(books.id, bookId),
  });

  if (!book) {
    throw Error("No book with id: " + bookId);
  }

  console.log("Got book data", JSON.stringify(book.bookData, undefined, 4));

  const { genre, style, chapters, outline, title } = book.bookData as BookData;
  console.log("Title", title);

  const content = book.content ?? {};
  const generatedChapters = new Set(Object.keys(content));
  const chaptersRemaining = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].filter(
    (v) => !generatedChapters.has(v),
  );
  console.log("Remaining chapters", chaptersRemaining);

  const generateChapter = async (chapterNumber: string): Promise<void> => {
    const writeChaptersPromptId = "6c974a07-51e4-4bab-a370-4266888a378d";
    const r = await fetch(`https://app.wordware.ai/api/released-app/${writeChaptersPromptId}/run`, {
      method: "post",
      body: JSON.stringify({
        inputs: {
          genre: genre,
          plot: outline,
          chapters: chapters,
          writing_style: style,
          chapter_number: chapterNumber,
        },
        version: "^1.0",
      }),
      headers: {
        Authorization: `Bearer ${process.env.WORDWARE_API_KEY}`,
      },
    });

    const stream = NdJsonStream.decode(r.body!);
    let chapterContent = "";
    let chapterTitle = "";

    for await (const chunk of StreamToIterable(stream)) {
      if (chunk.type === "chunk") {
        const value = chunk.value as OutputType;
        if (value.type === "outputs") {
          console.log("Got outputs");

          if (typeof value.values === "object") {
            chapterTitle = value.values?.["title"] as string;
            chapterContent = value.values?.["text"] as string;
          }
        }
      }
    }

    if (chapterContent === "") {
      throw Error(`No content in chapter ${chapterNumber}`);
    }

    console.log("Chapter", chapterNumber, "complete");

    const query = sql`UPDATE ${books}
                               SET content[${chapterNumber}] = jsonb_build_object('title', ${chapterTitle}::text, 'content', ${chapterContent}::text)
                               WHERE ${books.id} = ${bookId}`;

    // const pgDialect = new PgDialect();
    // console.log("Query", pgDialect.sqlToQuery(query));
    await db.execute(query);
  };

  let image = "";
  const generateImage = async (): Promise<void> => {
    if (book.image) {
      console.log("Image already generated");
      return;
    }
    console.log("Generating image");

    const generateImagePrompt = "0713c3bd-1db7-4c7a-ba4c-8277f8a1c7f8";
    const r = await fetch(`https://app.wordware.ai/api/released-app/${generateImagePrompt}/run`, {
      method: "post",
      body: JSON.stringify({
        inputs: {
          title: !title ? " " : title,
          plot: outline,
        },
        version: "^1.0",
      }),
      headers: {
        Authorization: `Bearer ${process.env.WORDWARE_API_KEY}`,
      },
    });

    console.log("Image gen status", r.status);

    const stream = NdJsonStream.decode(r.body!);

    for await (const chunk of StreamToIterable(stream)) {
      if (chunk.type === "chunk") {
        const value = chunk.value as OutputType;
        console.log("[IMAGE] Chunk value type:", value.type);

        if (value.type === "outputs") {
          console.log("[IMAGE] Got outputs. Values:", JSON.stringify(value.values, null, 2));

          if (typeof value.values === "object") {
            // Look for the Image generation tool output
            const values = value.values as ImageGenerationValues;
            const imageGeneration = values["Image generation"];
            if (imageGeneration?.output?.image_url) {
              image = imageGeneration.output.image_url;
              console.log("[IMAGE] Successfully set image value");
            }
          }
        }
      }
    }

    if (!image || image === "" || image === "Service Unavailable" || image.includes("Cannot read properties of null")) {
      console.error("Something went wrong generating image", image);
      throw Error("Failed to generate image");
    } else {
      await db
        .update(books)
        .set({
          image: image,
        })
        .where(eq(books.id, bookId));
    }
  };

  // Generate all remaining chapters
  const promises = [...chaptersRemaining.map((chapterNumber) => generateChapter(chapterNumber)), generateImage()];
  const results = await Promise.allSettled(promises);
  const rejected = results.filter((result) => result.status === "rejected");
  if (rejected.length > 0) {
    // Handle the error(s)
    // For simplicity, throwing the first error, but you can handle it differently
    console.error("Not all chapters generated", rejected);
    throw rejected;
  }

  console.log("All chapters done");

  // Send email
  const ses = new SES({ region: process.env.AWS_REGION });
  const baseUrl = process.env.VERCEL_ENV === "production" ? "author.wordware.ai" : process.env.VERCEL_URL;
  const html = render(
    Template({ title: book.title, link: `https://${baseUrl}/view/${bookId}`, image: book.image ?? image }),
  );

  if (!book.completedAt) {
    await ses.sendEmail({
      Source: "notifications@wordware.ai",
      Destination: {
        ToAddresses: [book.email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `Your AutoGPT book is ready - ${book.title}`,
        },
      },
    });
    console.log("Email sent");

    // Update db
    await db
      .update(books)
      .set({
        completedAt: new Date(),
      })
      .where(eq(books.id, bookId));

    console.log("DB updated");
  } else {
    console.log("Book already completed");
  }

  return new Response(
    JSON.stringify({
      ok: true,
    }),
  );
}
