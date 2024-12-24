import * as uuid from "uuid";
import { db } from "@/db/db";
import { books } from "@/db/schema";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // TODO: Implement save to db
  console.log("Got request", req);
  const { email, bookData, code } = await req.json();
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

  let codeValid = false;
  if (["friend", "creator"].includes(code)) {
    codeValid = true;
    console.log(`Used valid code ${code} so it's free`);
    console.log(process.env.VERCEL_URL);
    const r = await fetch(
      `https://qstash.upstash.io/v2/publish/https://27ad-98-237-185-250.ngrok-free.app/api/generate`,
      {
        method: "post",
        body: JSON.stringify({ bookId: id }),
        headers: { Authorization: `Bearer ${process.env.UPSTASH_TOKEN}` },
      },
    );

    console.log("Got upstash response", r.status);
    console.log(await r.json());
  }
  return new Response(
    JSON.stringify({
      ok: true,
      id: id,
      codeValid: codeValid,
    }),
  );
}
