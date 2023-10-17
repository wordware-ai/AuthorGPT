import * as uuid from "uuid";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // TODO: Implement save to db
  console.log("Got request", req);
  const { email, genre, prompt, style, title, outline, chapters } = await req.json();
  console.log("Email", email);
  console.log("Genre", genre);
  console.log("Prompt", prompt);
  console.log("Style", style);
  console.log("Title", title);
  console.log("Outline", outline);
  console.log("Chapters", chapters);
  const id = uuid.v4();
  console.log("id", id);
  return new Response(
    JSON.stringify({
      ok: true,
      id: id,
    }),
  );
}
