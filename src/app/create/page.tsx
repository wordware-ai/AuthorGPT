import { WordwareFooter } from "@/components/custom/footer";
import { BookSettings } from "@/components/custom/book-settings";

export default function Create() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto xl:gap-0 lg:py-16">
          <div className="mr-auto">
            <h1 className="max-w-2xl mb-4 text-5xl font-extrabold leading-none md:text-6xl xl:text-7xl dark:text-white">
              Create your novel
            </h1>
            <p className="max-w-2xl mb-6 font-light text-slate-500 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-400">
              Unleash your masterpiece
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-screen-xl mx-auto px-4">
          <BookSettings />
        </div>
      </section>

      <div className="mt-auto pt-12">
        <WordwareFooter />
      </div>
    </main>
  );
}
