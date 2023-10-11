import Image from "next/image";
import { CogIcon, GhostIcon, HeartIcon, Rocket, SirenIcon, Swords } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-6">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Write a whole book in{" "}
              <span className="from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                minutes
              </span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Any style, any storyline. What are you waiting for?
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
            <Image src="/books.png" alt="a pile of books" width="1920" height="1080" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
            Some of our creations
          </h2>
          <div className="grid gap-8 text-gray-500 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 dark:text-gray-400">
            <div>
              <div className="flex justify-center items-center mb-4 w-full h-36 bg-amber-100"></div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Title 1</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing
                goals every month with our marketing plan.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-full h-36 bg-amber-100"></div>

              <h3 className="mb-2 text-xl font-bold dark:text-white">Title 2</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing
                goals every month with our marketing plan.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-full h-36 bg-amber-100"></div>

              <h3 className="mb-2 text-xl font-bold dark:text-white">Title 3</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing
                goals every month with our marketing plan.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-full h-36 bg-amber-100"></div>

              <h3 className="mb-2 text-xl font-bold dark:text-white">Title 4</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing
                goals every month with our marketing plan.
              </p>
            </div>
          </div>
          <div className="grid mt-20">
            <a
              href="#"
              className=" mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Start my book
            </a>
          </div>
        </div>
      </section>

      <section
        className="
      bg-gray-50 dark:bg-gray-800"
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">You are the artist</h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              Choose how you want you book to be written and make it personal...
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <Swords className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Fantasy</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plan it, create it, launch it. Collaborate seamlessly with all the organization and hit your marketing
                goals every month with our marketing plan.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <Rocket className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Sci-Fi</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Protect your organization, devices and stay compliant with our structured workflows and custom
                permissions made for you.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <HeartIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Romance</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates to
                help you get started.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <GhostIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Horror</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Audit-proof software built for critical financial operations like month-end close and quarterly
                budgeting.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <SirenIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Crime</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Craft beautiful, delightful experiences for both marketing and product with real cross-company
                collaboration.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <CogIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Advanced</h3>
              <p className="text-gray-500 dark:text-gray-400">Something about complete customisation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Some heading</h2>
            <p className="mb-4">Some paragraph.</p>
            <p>Some other paragraph. Make people want to create</p>
            <div className="mt-10">
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Begin
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              className="w-full rounded-lg aspect-[3/4] object-cover"
              src="/typewriter.avif"
              alt="a blank page"
              width="300"
              height="400"
            />
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg aspect-[3/4] object-cover"
              src="/paper.avif"
              alt="typewriter"
              width="300"
              height="400"
            />
          </div>
        </div>
      </section>
      <section className="bg-[url('/keys.avif')] w-full bg-center h-fit bg-cover">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-white">Let&apos;s write.</h2>
            <p className="mb-6 font-light text-gray-300 md:text-lg">What&apos;s your story?</p>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Make me an author
            </a>
          </div>
        </div>
      </section>
      <footer className="p-4 bg-white w-full">
        <div className="mx-auto w-fit">
          <p className="font-semibold uppercase text-center">Powered by</p>
          <div className="max-w-md">
            <a href="https://wordware.ai" target="_blank">
              <Image src="/logo_black.svg" alt="Wordware logo" width="1000" height="400" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
