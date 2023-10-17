import { WordwareFooter } from "@/components/custom/footer";
import { ChaptersAndOutlineLoader } from "@/components/custom/ChaptersAndOutlineLoader";

export default function Create({ searchParams }: { searchParams: { genre: string; prompt: string; style: string } }) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pt-8 mx-auto xl:gap-0 lg:pt-16">
          <div className="mr-auto">
            <h1 className="max-w-2xl mb-4 text-5xl font-extrabold leading-none md:text-6xl xl:text-7xl dark:text-white">
              Generate
            </h1>
            <p className="max-w-2xl font-light text-slate-500 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-400">
              Making magic ✨
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900 mb-10">
        <div className="max-w-screen-xl px-4 mx-auto xl:gap-0 ">
          <ChaptersAndOutlineLoader
            genre={searchParams.genre}
            prompt={searchParams.prompt}
            style={searchParams.style}
          />
        </div>
      </section>

      <div className="mt-auto">
        <WordwareFooter />
      </div>
    </main>
  );
}
