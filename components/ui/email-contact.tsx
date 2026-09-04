"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface EmailContactProps {
  email: string;
}

export function EmailContact({ email }: EmailContactProps) {
  const { copied, copy } = useCopyToClipboard();
  const [flightId, setFlightId] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const flightTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (flightTimer.current) clearTimeout(flightTimer.current);
    },
    [],
  );

  async function copyEmail() {
    const didCopy = await copy(email);
    if (!didCopy) return;

    if (flightTimer.current) clearTimeout(flightTimer.current);
    setFlightId((current) => current + 1);
    setIsFlying(true);
    flightTimer.current = setTimeout(() => setIsFlying(false), 440);
  }

  return (
    <span className="group/email relative inline-flex items-center">
      <PortfolioLink href={`mailto:${email}`} external={false} variant="editorial">
        email
      </PortfolioLink>
      .
      {flightId > 0 ? (
        <span
          key={flightId}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-2 z-10 font-mono text-[10px] font-semibold text-[#ff2d9a] motion-safe:animate-email-flight"
        >
          @
        </span>
      ) : null}
      <button
        type="button"
        onClick={copyEmail}
        data-copied={copied && !isFlying}
        className="group/copy relative ml-1 inline-grid size-4 cursor-pointer place-items-center rounded-[2px] text-muted opacity-70 transition-[color,opacity,scale,translate] duration-[160ms] ease-out hover:text-ink active:translate-y-px active:scale-[0.92] focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[copied=true]:text-ink data-[copied=true]:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/email:opacity-100"
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        <CopyIcon className="absolute size-3 transition-[opacity,scale] duration-[160ms] group-data-[copied=true]/copy:scale-75 group-data-[copied=true]/copy:opacity-0" />
        <CheckIcon className="absolute size-3 scale-75 opacity-0 transition-[opacity,scale] duration-[160ms] group-data-[copied=true]/copy:scale-100 group-data-[copied=true]/copy:opacity-100" />
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
