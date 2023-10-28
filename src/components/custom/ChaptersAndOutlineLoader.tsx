"use client";
import React, { useEffect, useState } from "react";
import { NdJsonStream, OutputType, StreamToIterable } from "@/lib/stream";
import { Loader2 } from "lucide-react";
import va from "@vercel/analytics";
import { CollectEmailAndPayment } from "@/components/custom/CollectEmailAndPayment";

type Stages = "waiting" | "plots" | "final_plot" | "improved_plot" | "title" | "chapters_and_overviews" | "done";
type Genre = "fantasy" | "romance" | "sci-fi" | "children" | "horror" | "crime";

export const ChaptersAndOutlineLoader: React.FC<{
  genre: string;
  prompt: string;
  style: string;
  code: string | undefined;
}> = ({ genre, prompt, style, code }) => {
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState<Stages>("waiting");
  const [outline, setOutline] = useState("");
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      const r = await fetch(`/api/outline`, {
        method: "post",
        body: JSON.stringify({
          prompt,
          genre,
          style,
        }),
      });

      if (r.status !== 200) {
        setError("Something went wrong, please try again");
        return;
      }

      const stream = NdJsonStream.decode(r.body!);

      let outline = "";
      let title = "";
      let chapters = "";
      let lastGeneration: Stages | undefined = undefined;

      for await (const chunk of StreamToIterable(stream)) {
        if (chunk.type === "chunk") {
          const value = chunk.value as OutputType;
          if (value.type === "generation") {
            lastGeneration = value.label as Stages;
            setStage(lastGeneration);
            console.log("Generation", value.label);
          } else if (value.type === "chunk")
            if (lastGeneration === "improved_plot") {
              outline += value.value;
              setOutline(outline);
            } else if (lastGeneration === "title") {
              title += value.value;
              setTitle(title);
            } else if (lastGeneration === "chapters_and_overviews") {
              chapters += value.value;
              setChapters(chapters);
            }
        }
      }
    };
    if (ready) {
      if (!genre || !prompt || !style) {
        setError("Not all values set, I need a genre, a style and a prompt!");
        return;
      } else if (!running && stage !== "done") {
        setRunning(true);
        const start = new Date();
        va.track("Outline generation started", {
          genre: genre,
        });
        load()
          .then(() => {
            setStage("done");

            va.track("Outline generation done", {
              duration: Math.round((new Date().getTime() - start.getTime()) / 1000),
            });

            setRunning(false);
          })
          .catch((e) => {
            console.error("Something went wrong", e);
            va.track("Error generating", {
              message: e.toString(),
            });
            setError("Something went wrong, try again");
          });
      }
    }
  }, [genre, prompt, style, setOutline, ready, running, setRunning, title, setTitle, chapters, setChapters, stage]);

  useEffect(() => {
    setReady(true);
  }, []);

  const genreToEmoji = (genre: Genre): string => {
    switch (genre) {
      case "fantasy":
        return "🧙‍♂️";
      case "romance":
        return "💖";
      case "sci-fi":
        return "🌌";
      case "children":
        return "🧸";
      case "horror":
        return "👻";
      case "crime":
        return "🚓";
      default:
        return "🔮";
    }
  };

  let message = "Firing up the story machine... 📚";
  switch (stage) {
    case "waiting":
      break;
    case "plots":
      message = "Crafting plots... 🖋️";
      break;
    case "final_plot":
      message = "Adding excitement... ✨";
      break;
    case "improved_plot":
      message = `Generating the plot... ${genreToEmoji(genre as Genre)}`;
      break;
    case "title":
      message = "Picking a title...";
      break;
    case "chapters_and_overviews":
      message = "Generating the story...";
      break;
    case "done":
      message = "";
      break;
  }

  return (
    <>
      <div className="dark:text-white">
        <p className="text-xl font-bold mt-5">Genre</p>
        <p className="text-slate-400 dark:text-slate-300">{genre}</p>
        <p className="text-xl font-bold mt-5">Style</p>
        <p className="text-slate-400 dark:text-slate-300">{style}</p>
        <p className="text-xl font-bold mt-5">Prompt</p>
        <p className="text-slate-400 dark:text-slate-300">{prompt}</p>
      </div>
      {outline && (
        <div>
          <p className="text-xl font-bold mt-5">Outline</p>
          <p className="text-slate-400 dark:text-slate-300 whitespace-break-spaces">{outline}</p>
        </div>
      )}

      {title && (
        <div>
          <p className="text-xl font-bold mt-5">Title</p>
          <p className="text-slate-400 dark:text-slate-300">{title}</p>
        </div>
      )}

      {chapters && (
        <div>
          <p className="text-xl font-bold mt-5">Chapters</p>
          <p className="text-slate-400 dark:text-slate-300 whitespace-break-spaces">{chapters}</p>
        </div>
      )}

      {error && (
        <div className="mt-10">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {message && !error && stage !== "done" && (
        <div className="mt-10">
          <p>
            <Loader2 className="animate-spin inline" />
            <span className="ml-3">{message}</span>
          </p>
        </div>
      )}

      {stage === "done" && !error && (
        <CollectEmailAndPayment
          genre={genre}
          prompt={prompt}
          style={style}
          title={title}
          outline={outline}
          chapters={chapters}
          code={code}
        />
      )}
    </>
  );
};
