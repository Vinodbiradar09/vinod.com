"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";
import { PortfolioLink } from "@/components/ui/portfolio-link";

interface EmailContactProps {
  email: string;
}

export function EmailContact({ email }: EmailContactProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }

      resetTimer.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  return (
    <span className="group/email inline-flex items-center">
      <PortfolioLink href={`mailto:${email}`} external={false}>
        email
      </PortfolioLink>
      <button
        type="button"
        onClick={copyEmail}
        data-copied={copied}
        className="group/copy relative ml-1 inline-grid size-4 cursor-pointer place-items-center rounded-[2px] text-muted opacity-70 transition-[color,opacity,transform] duration-[160ms] ease-out hover:text-ink active:translate-y-px focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[copied=true]:text-ink data-[copied=true]:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/email:opacity-100"
        aria-label={copied ? "Email address copied" : "Copy email address"}
      >
        <CopyIcon className="absolute size-3 transition-[opacity,transform] duration-[160ms] group-data-[copied=true]/copy:scale-75 group-data-[copied=true]/copy:opacity-0" />
        <CheckIcon className="absolute size-3 scale-75 opacity-0 transition-[opacity,transform] duration-[160ms] group-data-[copied=true]/copy:scale-100 group-data-[copied=true]/copy:opacity-100" />
        <span className="pointer-events-none absolute bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2 translate-y-0.5 rounded bg-ink px-1.5 py-0.5 text-[10px] leading-4 whitespace-nowrap text-page opacity-0 shadow-sm transition-[opacity,transform] duration-[160ms] group-hover/copy:translate-y-0 group-hover/copy:opacity-100 group-focus-visible/copy:translate-y-0 group-focus-visible/copy:opacity-100">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
