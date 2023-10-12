"use client";
import React from "react";
import { GhostIcon, HeartIcon, LucideIcon, RocketIcon, SirenIcon, SwordsIcon } from "lucide-react";
import { clsx } from "clsx";
import { Textarea } from "@/components/ui/textarea";
import { useQueryState } from "@/hooks/useQueryState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BookSettings: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useQueryState("genre");
  const [style, setStyle] = useQueryState("style");
  const [prompt, setPrompt] = useQueryState("prompt");

  const genres: [string, LucideIcon][] = [
    ["fantasy", SwordsIcon],
    ["sci-fi", RocketIcon],
    ["romance", HeartIcon],
    ["horror", GhostIcon],
    ["crime", SirenIcon],
    // ["advanced", CogIcon],
  ];

  return (
    <>
      <div>
        <p className="text-xl font-bold">Genre</p>
        <div>
          <p className="text-slate-400 dark:text-slate-300">Select the genre</p>
          <div className="space-y-8 grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 md:gap-12 gap-8 space-y-0 p-4 select-none">
            {genres.map(([genre, Icon]) => (
              <div
                key={genre}
                className={clsx(
                  "rounded-lg aspect-square flex justify-center flex-col items-center shadow-lg hover:bg-muted",
                  {
                    "bg-muted border-2": genre === selectedGenre,
                    border: genre != selectedGenre,
                  },
                )}
                onClick={() => setSelectedGenre(genre)}
              >
                <div className="flex justify-center items-center mb-4 w-20 h-20 rounded-full bg-blue-100 lg:h-22 lg:w-22 dark:bg-blue-900">
                  <Icon className="w-10 h-10 text-blue-600 lg:w-12 lg:h-12 dark:text-blue-300" />
                </div>
                <h3 className="mb-2 font-semibold uppercase dark:text-white">{genre}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-xl font-bold">Style</p>
        <div>
          <p className="text-slate-400 dark:text-slate-300">What style should this be written in?</p>
          <Textarea
            placeholder="e.g. J.K. Rowling..."
            className="my-4"
            rows={5}
            value={style ?? ""}
            onChange={(e) => setStyle(e.target.value)}
          />
          {/* TODO: Get example and define some styles to chose from */}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-xl font-bold">Prompt</p>
        <div>
          <p className="text-slate-400 dark:text-slate-300">What should the story be about?</p>
          <Textarea
            placeholder="e.g. Bob and Pete are two normal guys that..."
            className="my-4"
            rows={10}
            value={prompt ?? ""}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {/* TODO: get placeholder example */}
        </div>
      </div>

      <div className="my-12">
        <Link href={{ pathname: "/generate", query: {} }}>
          <Button>Let&apos;s go!</Button>
        </Link>
      </div>

      {/*<div>*/}
      {/*  <div>Outline</div>*/}
      {/*  <div>*/}
      {/*    <div>*/}
      {/*      <p>Here we generate and show the outline, allow it to be regenerated once (and store the first option)</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <div>Generate</div>*/}
      {/*  <div>*/}
      {/*    <div>*/}
      {/*      <p>*/}
      {/*        Here we generate the whole book, payments are handled by Stripe, if they decide not to pay they can put*/}
      {/*        their email in to save progress and we'll send the first chapter*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};
