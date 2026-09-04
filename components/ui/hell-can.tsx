"use client";

import {
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const OPEN_ANIMATION_MS = 720;
const CAN_AUDIO_START_SECONDS = 0.1;
const FAVICON_ECHO_MS = 1650;
const HELL_SEQUENCE = "hell";
const HELL_SEQUENCE_TIMEOUT_MS = 1200;
const SHAKE_DISTANCE = 36;
const SHAKE_TURNS = 3;

interface ShakeGesture {
  active: boolean;
  directionTravel: number;
  dragged: boolean;
  lastDirection: number;
  lastX: number;
  pointerId: number;
  startX: number;
  travel: number;
  turns: number;
}

export function HellCan() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isShaken, setIsShaken] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isOpening = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const faviconTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const faviconLink = useRef<HTMLLinkElement | null>(null);
  const typedKeys = useRef("");
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClick = useRef(false);
  const shakeGesture = useRef<ShakeGesture>({
    active: false,
    directionTravel: 0,
    dragged: false,
    lastDirection: 0,
    lastX: 0,
    pointerId: -1,
    startX: 0,
    travel: 0,
    turns: 0,
  });

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (faviconTimer.current) clearTimeout(faviconTimer.current);
      if (typingTimer.current) clearTimeout(typingTimer.current);
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
      faviconLink.current?.remove();
    },
    [],
  );

  const echoFavicon = useCallback(() => {
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
  }, []);

  const animateOpen = useCallback(() => {
    setIsOpen(true);
    echoFavicon();
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setIsOpen(false);
      isOpening.current = false;
    }, OPEN_ANIMATION_MS);
  }, [echoFavicon]);

  const openCan = useCallback(() => {
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
  }, [animateOpen]);

  useEffect(() => {
    function listenForHell(event: KeyboardEvent) {
      const target = event.target;
      const isEditing =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea, select"));

      if (
        isEditing ||
        event.isComposing ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.key.length !== 1
      ) {
        return;
      }

      if (typingTimer.current) clearTimeout(typingTimer.current);
      typedKeys.current = `${typedKeys.current}${event.key.toLowerCase()}`.slice(
        -HELL_SEQUENCE.length,
      );

      if (typedKeys.current === HELL_SEQUENCE) {
        typedKeys.current = "";
        openCan();
        return;
      }

      typingTimer.current = setTimeout(() => {
        typedKeys.current = "";
      }, HELL_SEQUENCE_TIMEOUT_MS);
    }

    window.addEventListener("keydown", listenForHell);
    return () => window.removeEventListener("keydown", listenForHell);
  }, [openCan]);

  function startShake(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    shakeGesture.current = {
      active: true,
      directionTravel: 0,
      dragged: false,
      lastDirection: 0,
      lastX: event.clientX,
      pointerId: event.pointerId,
      startX: event.clientX,
      travel: 0,
      turns: 0,
    };
    setIsDragging(true);
    setIsShaken(false);
  }

  function shake(event: PointerEvent<HTMLButtonElement>) {
    const gesture = shakeGesture.current;
    if (!gesture.active || gesture.pointerId !== event.pointerId) return;

    const movement = event.clientX - gesture.lastX;
    const totalMovement = event.clientX - gesture.startX;
    gesture.travel += Math.abs(movement);
    gesture.dragged ||= Math.abs(totalMovement) > 3;

    if (Math.abs(movement) >= 1.5) {
      const direction = Math.sign(movement);
      if (direction === gesture.lastDirection) {
        gesture.directionTravel += Math.abs(movement);
      } else {
        if (gesture.lastDirection !== 0 && gesture.directionTravel >= 4) gesture.turns += 1;
        gesture.directionTravel = Math.abs(movement);
      }
      gesture.lastDirection = direction;
      gesture.lastX = event.clientX;
    }

    setDragOffset(Math.max(-9, Math.min(9, totalMovement * 0.38)));
  }

  function finishShake(event: PointerEvent<HTMLButtonElement>) {
    const gesture = shakeGesture.current;
    if (!gesture.active || gesture.pointerId !== event.pointerId) return;

    gesture.active = false;
    suppressClick.current = gesture.dragged;
    setIsDragging(false);
    setDragOffset(0);

    if (gesture.turns >= SHAKE_TURNS && gesture.travel >= SHAKE_DISTANCE) {
      if (shakeTimer.current) clearTimeout(shakeTimer.current);
      setIsShaken(true);
      shakeTimer.current = setTimeout(() => setIsShaken(false), 520);
    }

    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  }

  function clickCan(event: MouseEvent<HTMLButtonElement>) {
    if (suppressClick.current) {
      event.preventDefault();
      return;
    }
    openCan();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open Hell can"
        data-open={isOpen}
        data-dragging={isDragging}
        data-shaken={isShaken}
        onClick={clickCan}
        onPointerDown={startShake}
        onPointerMove={shake}
        onPointerUp={finishShake}
        onPointerCancel={finishShake}
        style={{ translate: `${dragOffset}px 0` }}
        className="group/hell relative inline-block touch-pan-y cursor-grab rounded-[2px] text-inherit transition-[color,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none data-[dragging=true]:cursor-grabbing data-[dragging=true]:duration-0 data-[open=true]:text-[#ff3b30] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-safe:data-[shaken=true]:animate-hell-shake-settle"
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
