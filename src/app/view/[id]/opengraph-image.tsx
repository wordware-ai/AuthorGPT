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
  // Font
  // const interSemiBold = fetch(new URL("./Inter-SemiBold.ttf", import.meta.url)).then((res) => res.arrayBuffer());

  const book = await db.query.books.findFirst({ where: eq(books.id, params.id) });

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {book?.title}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: await interSemiBold,
      //     style: "normal",
      //     weight: 400,
      //   },
      // ],
    },
  );
}
