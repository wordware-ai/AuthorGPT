import * as uuid from "uuid";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  // TODO: Implement save to db
  console.log("Got request", req);
  console.log("Body", await req.json());
  const id = uuid.v4();
  return new Response(
    JSON.stringify({
      ok: true,
      id: id,
    }),
  );
}
