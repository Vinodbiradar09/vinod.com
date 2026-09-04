"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface PortfolioSectionProps {
  children: ReactNode;
  className?: string;
  id: string;
  title: string;
}

export function PortfolioSection({ children, className, id, title }: PortfolioSectionProps) {
  const headingId = `${id}-heading`;
  const sectionRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsRevealed(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-blueprint={id}
      className={cn("mt-14 sm:mt-[68px]", className)}
      aria-labelledby={headingId}
    >
      <div
        data-rerun-item="section"
        data-rerun-delay={id === "where-i-build" ? "3" : "4"}
        className="relative overflow-hidden"
      >
        <h2 id={headingId} className="pb-2 text-muted">
          {title}
        </h2>
        <span aria-hidden="true" className="block h-px bg-rule" />
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-page transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hidden",
            isRevealed ? "-translate-y-full" : "translate-y-0",
          )}
        />
      </div>
      {children}
    </section>
  );
}
