import { db } from "@/db/db";
import { books } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NdJsonStream, OutputType, StreamToIterable } from "@/lib/stream";
import { BookData } from "@/lib/types";

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

  const { genre, style, chapters, outline } = book.bookData as BookData;

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
        if (value.type === "prompt" && value.state === "complete") {
          console.log("Got outputs");

          if (typeof value.output === "object") {
            chapterTitle = value.output?.["title"] as string;
            chapterContent = value.output?.["text"] as string;
          }
        }
      }
    }

    if (chapterContent === "") {
      throw Error("No content in chapter");
    }

    console.log("Chapter", chapterNumber, "complete");

    const query = sql`UPDATE ${books}
                               SET content[${chapterNumber}] = jsonb_build_object('title', ${chapterTitle}::text, 'content', ${chapterContent}::text)
                               WHERE ${books.id} = ${bookId}`;

    // const pgDialect = new PgDialect();
    // console.log("Query", pgDialect.sqlToQuery(query));
    await db.execute(query);
  };

  // Generate all remaining chapters
  const promises = chaptersRemaining.map((chapterNumber) => generateChapter(chapterNumber));
  await Promise.all(promises);

  console.log("All chapters done");

  // Send email TODO

  // Update db
  await db
    .update(books)
    .set({
      completedAt: new Date(),
    })
    .where(eq(books.id, bookId));

  return new Response(
    JSON.stringify({
      ok: true,
    }),
  );
}
