import * as uuid from "uuid";
import { db } from "@/db/db";
import { books } from "@/db/schema";
import { undefined } from "zod";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // TODO: Implement save to db
  console.log("Got request", req);
  const { email, bookData } = await req.json();
  const { genre, prompt, style, title, outline, chapters } = bookData;
  console.log("Email", email);
  console.log("Genre", genre);
  console.log("Prompt", prompt);
  console.log("Style", style);
  console.log("Title", title);
  console.log("Outline", outline);
  console.log("Chapters", chapters);
  const id = uuid.v4();
  console.log("id", id);

  await db.insert(books).values({
    id: id,
    email: email,
    createdAt: new Date(),
    genre: genre,
    prompt: prompt,
    style: style,
    title: title,
    bookData: bookData,
  });

  console.log("Inserted");

  return new Response(
    JSON.stringify({
      ok: true,
      id: id,
    }),
  );
}
