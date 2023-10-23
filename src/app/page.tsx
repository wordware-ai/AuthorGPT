import Image from "next/image";
import { ArrowRight, GhostIcon, HeartIcon, PawPrint, Rocket, SirenIcon, Swords } from "lucide-react";
import { WordwareFooter } from "@/components/custom/footer";
import Link from "next/link";
import { VimeoPlayer } from "@/components/custom/VimeoPlayer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-6">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
              Stop imagining start{" "}
              <span className="text-4xl md:text-7xl xl:text-8xl from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                writing
              </span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Turn your imagined world into a novel
            </p>
            <Link
              href="/create"
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
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-6 lg:flex">
            <Image src="/books.png" alt="a pile of books" width="1920" height="1080" />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
          <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
            ✨ Some of our creations ✨
          </h2>
          <div className="grid gap-8 text-gray-500 sm:gap-12 md:grid-cols-2 lg:grid-cols-4 dark:text-gray-400">
            <div>
              <div className="flex justify-center items-center mb-4 w-full">
                <Image src="/cover_1.jpeg" alt="cover for Aiko's Mystical Odyssey" width="300" height="300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Aiko&apos;s Mystical Odyssey</h3>
              <p className="text-gray-500 dark:text-gray-400">
                In a quiet Japanese village, young Aiko discovers an old book in her ancestral home. As she reads its
                cryptic stories, they start coming to life around her.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-full">
                <Image
                  src="/cover_2.jpeg"
                  alt="cover for Tailor-Made Trials: A Stitch in Time"
                  width="300"
                  height="300"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Tailor-Made Trials: A Stitch in Time</h3>
              <p className="text-gray-500 dark:text-gray-400">
                A charismatic and talented fashion designer, Alex, lands a position in one of the biggest fashion houses
                in New York only to find out his new boss is his ex.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-full">
                <Image src="/cover_3.png" alt="cover for Whispers from the Shrouded Forest" width="300" height="300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Whispers from the Shrouded Forest</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Nathanial, a reclusive architect, seeks solace in a centuries-old cabin, veiled within the confines of
                an enigmatic, dense forest.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-full">
                <Image
                  src="/cover_4.png"
                  alt="cover for Bella's Odyssey to the Starry Skies"
                  width="300"
                  height="300"
                />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Bella&apos;s Odyssey to the Starry Skies</h3>
              <p className="text-gray-500 dark:text-gray-400">
                A children&apos;s story about Bella and her bear friend who explore the stars together.
              </p>
            </div>
          </div>
          <div className="grid mt-20">
            <Link
              href="/create"
              className=" mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Start my book
            </Link>
          </div>
        </div>
      </section>

      <section
        className="
      bg-gray-50 dark:bg-gray-800"
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Create your own world</h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">Choose the genre that suits you best</p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <Swords className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Fantasy</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Are you a fan of J.R.R. Tolkien, magic and sorcery, and mystical creatures? Simply describe the setting
                and the characters and turn your imagined worlds into a novel.
              </p>
              <Link href="/create?genre=fantasy">
                <ArrowRight className="text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-500 ml-auto mr-3 mt-2" />
              </Link>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <Rocket className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Sci-Fi</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Can’t stop thinking “what-if” and “what-could-be”? From interstellar odysseys to dystopian futures, from
                cyberpunk to space colonization. Take your readers on your journey through the wonders and perils of
                technology, the mysteries of the universe, and the boundless potential of human ingenuity.
              </p>
              <Link href="/create?genre=sci-fi">
                <ArrowRight className="text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-500 ml-auto mr-3 mt-2" />
              </Link>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <HeartIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Romance</h3>
              <p className="text-gray-500 dark:text-gray-400">
                You’ve had countless romantic adventures and always dreamt of creating a novel based on your life? Or
                maybe based on your parents’ or friend’s stories? Create a romantic novel, and spice it up with a bit of
                drama, humor, intrigue, and suspense.
              </p>
              <Link href="/create?genre=romance">
                <ArrowRight className="text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-500 ml-auto mr-3 mt-2" />
              </Link>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <GhostIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Horror</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Heart-pounding journey through haunted realms, confronting malevolent spirits, monstrous creatures, and
                unspeakable evils - invite your readers to revel in the spine-chilling novel. Just like H. P. Lovecraft.
              </p>
              <Link href="/create?genre=horror">
                <ArrowRight className="text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-500 ml-auto mr-3 mt-2" />
              </Link>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <SirenIcon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Crime</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Often find yourself overly observational? Create a crime novel in Arthur Conan Doyl’s style - weave
                mysteries and keep the readers on the edge.
              </p>
              <Link href="/create?genre=crime">
                <ArrowRight className="text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-500 ml-auto mr-3 mt-2" />
              </Link>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <PawPrint className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Children</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Embark on adventures, meet fantastical characters, and explore magical worlds in a novel tailored just
                to your kid (or your inner kid). Create it yourself or let your kid do it and even be the main character
                there!
              </p>
              <Link href="/create?genre=children">
                <ArrowRight className="text-gray-500 dark:text-gray-400 hover:text-gray-600 hover:dark:text-gray-500 ml-auto mr-3 mt-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">Tell me more</h2>
            <VimeoPlayer />
            <div className="mt-10">
              <Link
                href="/create"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Begin
              </Link>
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
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-white">Let&apos;s imagine.</h2>
            <p className="mb-8 font-light text-gray-300 md:text-lg">What&apos;s your story?</p>
            <Link
              href="/create"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Make me an author
            </Link>
          </div>
        </div>
      </section>
      <WordwareFooter />
    </main>
  );
}
