"use client";

import { useEffect, useRef, useState } from "react";

const OPEN_ANIMATION_MS = 720;
const CAN_AUDIO_START_SECONDS = 0.1;
const FAVICON_ECHO_MS = 1650;

export function HellCan() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isOpening = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const faviconTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const faviconLink = useRef<HTMLLinkElement | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (faviconTimer.current) clearTimeout(faviconTimer.current);
      faviconLink.current?.remove();
    },
    [],
  );

  function echoFavicon() {
    if (!faviconLink.current) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = "/icon-can-open.svg";
      link.dataset.hellFavicon = "true";
      document.head.appendChild(link);
      faviconLink.current = link;
    }

    if (faviconTimer.current) clearTimeout(faviconTimer.current);
    faviconTimer.current = setTimeout(() => {
      if (faviconLink.current) faviconLink.current.href = "/icon.png";
    }, FAVICON_ECHO_MS);
  }

  function animateOpen() {
    setIsOpen(true);
    echoFavicon();
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setIsOpen(false);
      isOpening.current = false;
    }, OPEN_ANIMATION_MS);
  }

  function openCan() {
    if (isOpening.current) return;

    isOpening.current = true;
    const audio = audioRef.current;
    if (!audio) {
      animateOpen();
      return;
    }

    audio.currentTime = CAN_AUDIO_START_SECONDS;
    audio.volume = 0.42;
    void audio.play().catch(() => animateOpen());
  }

  return (
    <>
      <button
        type="button"
        aria-label="Hell"
        data-open={isOpen}
        onClick={openCan}
        className="group/hell relative inline-block cursor-pointer rounded-[2px] text-inherit transition-colors duration-200 data-[open=true]:text-[#ff3b30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        Hell
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-1 left-1/2 h-[3px] w-2 -translate-x-1/2 rounded-full border border-current opacity-0 transition-[opacity,transform] duration-200 group-hover/hell:-translate-y-px group-hover/hell:opacity-70 group-focus-visible/hell:-translate-y-px group-focus-visible/hell:opacity-70 motion-safe:group-data-[open=true]/hell:animate-hell-tab-pop"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-1 left-[28%] size-1 rounded-full bg-[#ff3b30] opacity-0 motion-safe:group-data-[open=true]/hell:animate-hell-fizz"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-1 left-[52%] size-0.5 rounded-full bg-[#ff3b30] opacity-0 motion-safe:group-data-[open=true]/hell:animate-hell-fizz [animation-delay:70ms]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-0.5 left-[70%] size-[3px] rounded-full bg-[#ff3b30] opacity-0 motion-safe:group-data-[open=true]/hell:animate-hell-fizz [animation-delay:130ms]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[8%] left-[24%] h-[3px] w-0.5 rounded-[50%_50%_60%_60%] bg-[var(--hell-condensation)] opacity-0 shadow-[0_0_2px_var(--hell-condensation-glow)] motion-safe:group-data-[open=true]/hell:animate-hell-drop-a"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[32%] left-[72%] size-0.5 rounded-full bg-[var(--hell-condensation)] opacity-0 shadow-[0_0_2px_var(--hell-condensation-glow)] motion-safe:group-data-[open=true]/hell:animate-hell-drop-b"
        />
      </button>
      <audio ref={audioRef} preload="auto" onPlaying={animateOpen}>
        <source src="/audio/can-open.mp3" type="audio/mpeg" />
        <track kind="captions" src="/audio/can-open.en.vtt" srcLang="en" label="English" default />
      </audio>
    </>
  );
}
