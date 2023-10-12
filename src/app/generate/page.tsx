import { WordwareFooter } from "@/components/custom/footer";

export default async function Create() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto xl:gap-0 lg:py-16">
          <div className="mr-auto">
            <h1 className="max-w-2xl mb-4 text-5xl font-extrabold leading-none md:text-6xl xl:text-7xl dark:text-white">
              Generating...
            </h1>
            <p className="max-w-2xl mb-6 font-light text-slate-500 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-400">
              Making magic ✨
            </p>
          </div>
        </div>
      </section>
      <section></section>

      <div className="mt-auto">
        <WordwareFooter />
      </div>
    </main>
  );
}
