export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();

  console.log("Object", body.data.object);

  const bookId = body.data.object["client_reference_id"];
  const email = body.data.object["customer_email"];
  const paymentStatus = body.data.object["payment_status"];

  // TODO: Check it's the right product id

  console.log("Id", bookId);
  console.log("Email", email);
  console.log("Payment status", paymentStatus);

  if (bookId) {
    // Trigger book generation with Upstash queue
    const r = await fetch(`https://qstash.upstash.io/v2/publish/https://${process.env.VERCEL_URL}/api/generate`, {
      method: "post",
      body: JSON.stringify({ bookId }),
      headers: { Authorization: `Bearer ${process.env.UPSTASH_TOKEN}` },
    });

    console.log("Got upstash response", r.status);
    console.log(await r.json());
  } else {
    console.log("No book id, probaby not a AuthorGPT purchase");
  }

  return new Response(
    JSON.stringify({
      ok: true,
    }),
  );
}
