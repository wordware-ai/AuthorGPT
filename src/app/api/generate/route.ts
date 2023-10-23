import { db } from "@/db/db";
import { books } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NdJsonStream, OutputType, StreamToIterable } from "@/lib/stream";
import { BookData } from "@/lib/types";
import { SES } from "@aws-sdk/client-ses";
import { render } from "@jsx-email/render";
import { Template } from "@/emails/BookReady";

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

  const { genre, style, chapters, outline, title } = book.bookData as BookData;

  const content = book.content ?? {};
  const generatedChapters = new Set(Object.keys(content));
  const chaptersRemaining = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].filter(
    (v) => !generatedChapters.has(v),
  );
  console.log("Remaining chapters", chaptersRemaining);

  const generateChapter = async (chapterNumber: string): Promise<void> => {
    const writeChaptersPromptId = "5a07f3da-d827-4b4d-86ea-e5d6d8258493";
    const r = await fetch(`https://app.wordware.ai/api/prompt/${writeChaptersPromptId}/run`, {
      method: "post",
      body: JSON.stringify({
        inputs: {
          genre: genre,
          plot: outline,
          chapters: chapters,
          writing_style: style,
          chapter_number: chapterNumber,
        },
      }),
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

  const generateImage = async (): Promise<void> => {
    if (book.image) {
      console.log("Image already generated");
      return;
    }
    console.log("Generating image");

    const generateImagePrompt = "247d1687-578e-4399-97fe-37934c61820e";
    const r = await fetch(`https://app.wordware.ai/api/prompt/${generateImagePrompt}/run`, {
      method: "post",
      body: JSON.stringify({
        inputs: {
          title: title,
          plot: outline,
        },
      }),
    });

    const stream = NdJsonStream.decode(r.body!);
    let image = "";

    for await (const chunk of StreamToIterable(stream)) {
      if (chunk.type === "chunk") {
        const value = chunk.value as OutputType;
        if (value.type === "outputs") {
          if (typeof value.values === "object") {
            // @ts-ignore
            console.log("Got outputs", value.values["7acc887a-b299-4355-8486-068fe746cf63"].generate_image);
            // @ts-ignore
            image = value.values["7acc887a-b299-4355-8486-068fe746cf63"].generate_image.output as string;
          }
        }
      }
    }

    if (!image || image === "" || image === "Service Unavailable") {
      console.error("Something went wrong generating image");
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
    throw rejected;
  }

  console.log("All chapters done");

  // Send email
  const ses = new SES({ region: process.env.AWS_REGION });
  const html = render(Template({ title: book.title, link: `${process.env.VERCEL_URL}/view/${bookId}` }));

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
