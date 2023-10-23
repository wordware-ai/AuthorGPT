import { ImageResponse } from "next/server";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { books } from "@/db/schema";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "View the AutoGPT creation";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const book = await db.query.books.findFirst({ where: eq(books.id, params.id) });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "black",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {book?.image ? <img width="100%" src={book.image} /> : <p>{book?.title}</p>}
      </div>
    ),
    {
      ...size,
    },
  );
}
