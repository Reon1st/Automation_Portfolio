import React, { useLayoutEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export type VideoSource = { type: "file"; src: string } | { type: "youtube" | "vimeo"; id: string };

const extensionMimeTypes: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  ogg: "video/ogg",
};

export const parseVideoSource = (url: string): VideoSource => {
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (youtubeMatch) return { type: "youtube", id: youtubeMatch[1] };

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return { type: "vimeo", id: vimeoMatch[1] };

  return { type: "file", src: url };
};

interface VideoPlayerProps {
  source: VideoSource;
  title: string;
}

// Plyr rewrites the DOM around whatever element it's given (wraps it, injects
// its own controls). If React rendered that element via JSX, React later tries
// to remove it using a parent/child relationship Plyr already changed, which
// throws an uncaught "removeChild" error and crashes the whole app. So React
// only ever owns this one empty, never-touched container div — the actual
// video/iframe element is created and torn down entirely by our own code,
// outside React's reconciliation, so there's nothing for React to fight over.
const VideoPlayer: React.FC<VideoPlayerProps> = ({ source, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let target: HTMLElement;

    if (source.type === "file") {
      const video = document.createElement("video");
      video.playsInline = true;
      video.controls = true;
      const extension = source.src.split(".").pop()?.toLowerCase() ?? "";
      const sourceEl = document.createElement("source");
      sourceEl.src = source.src;
      const mime = extensionMimeTypes[extension];
      if (mime) sourceEl.type = mime;
      video.appendChild(sourceEl);
      target = video;
    } else {
      const wrapper = document.createElement("div");
      wrapper.className = "plyr__video-embed";
      const iframe = document.createElement("iframe");
      iframe.title = title;
      iframe.allow = "autoplay; fullscreen";
      iframe.allowFullscreen = true;
      iframe.src =
        source.type === "youtube"
          ? `https://www.youtube.com/embed/${source.id}?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1&controls=0&cc_load_policy=0&disablekb=1`
          : `https://player.vimeo.com/video/${source.id}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`;
      wrapper.appendChild(iframe);
      target = wrapper;
    }

    container.appendChild(target);

    const player = new Plyr(target, {
      controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "settings", "fullscreen"],
      settings: ["captions", "quality", "speed"],
      youtube: { rel: 0, modestbranding: 1 },
    });

    return () => {
      player.destroy();
      container.innerHTML = "";
    };
  }, [source, title]);

  return <div ref={containerRef} />;
};

export default VideoPlayer;
