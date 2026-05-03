"use client";

import { useState } from "react";
import { SectionLabel } from "./section-label";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("vinodjb07@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact">
      <SectionLabel label="Contact" />
      <div className="space-y-2 text-[15px] text-[#a8a49e]">
        <p className="flex items-center gap-3">
          <a
            href="mailto:vinodjb07@gmail.com"
            className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-60 transition-opacity"
          >
            vinodjb07@gmail.com
          </a>
          <button
            onClick={copyEmail}
            className="text-[11px] font-mono text-[#444] hover:text-[#888] transition-colors cursor-pointer tracking-wide uppercase"
            aria-label="Copy email address"
          >
            {copied ? "copied" : "copy"}
          </button>
        </p>
        <p>
          <a
            href="https://github.com/Vinodbiradar09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-60 transition-opacity"
          >
            github.com/Vinodbiradar09
          </a>
        </p>
        <p>
          <a
            href="https://x.com/toovinod09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-60 transition-opacity"
          >
            x.com/toovinod09
          </a>
        </p>
      </div>
    </section>
  );
}
