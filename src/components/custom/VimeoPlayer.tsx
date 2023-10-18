"use client";
import ReactPlayer from "react-player";

export function VimeoPlayer() {
  return (
    <div>
      <ReactPlayer
        width="100%"
        url="https://player.vimeo.com/video/874820580?h=85f0a18e9e&badge=0&autopause=0&quality_selector=1&progress_bar=1&player_id=0&app_id=58479"
        controls
      />
    </div>
  );
}
