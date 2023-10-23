import { WordwareFooter } from "@/components/custom/footer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { books } from "@/db/schema";
import { NotFoundError } from "@/components/custom/NotFoundError";
import Link from "next/link";

interface BookContent {
  [key: string]: { title: string; content: string };
}

async function DisplayBook({ id }: { id: string }) {
  const book = await db.query.books.findFirst({ where: eq(books.id, id) });

  if (!book) {
    return <NotFoundError />;
  }

  const content = book.content as BookContent;

  return (
    <>
      <h1 className="mb-8 text-5xl font-extrabold leading-none md:text-6xl xl:text-7xl dark:text-white">
        {book?.title}
      </h1>
      {Object.entries(content)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([chapterNumber, { title, content }]) => (
          <div key={chapterNumber}>
            <h2 className="mb-4 text-2xl font-extrabold leading-none md:text-3xl xl:text-3xl dark:text-white">
              Chapter {chapterNumber}: {title}
            </h2>
            <p className="whitespace-break-spaces mb-8">{content}</p>
          </div>
        ))}
      <script async src="https://platform.twitter.com/widgets.js" />
      <a
        className="twitter-share-button"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${book.title} - a ${book.genre} novel made with the help of AI`,
        )}`}
        data-size="large"
        target="_blank"
      >
        Tweet
      </a>
      <div className="my-5">
        <Link className="hover:underline font-semibold" href="/create">
          Create your own
        </Link>
      </div>
    </>
  );
}

export default async function View({ params }: { params: { id: string } }) {
  const ContentLoader = () => (
    <div className="w-full">
      <Skeleton className="h-12 mb-2 w-full max-w-screen-md" />
      <Skeleton className="h-12 mb-8 w-36" />
      <Skeleton className="h-8 w-48 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
      <div className="space-y-2 mt-8">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
      <div className="space-y-2 mt-8">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
      <div className="space-y-2 mt-8">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
      <div className="space-y-2 mt-8">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
      <div className="space-y-2 mt-8">
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[100%]" />
        <Skeleton className="h-4 w-[50%]" />
      </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col w-full bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full px-4 pt-8 mx-auto xl:gap-0 lg:pt-16">
        <Suspense fallback={<ContentLoader />}>
          <DisplayBook id={params.id} />
        </Suspense>
      </div>
      <div className="mt-auto">
        <WordwareFooter />
      </div>
    </main>
  );
}
