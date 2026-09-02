import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PortfolioSectionProps {
  children: ReactNode;
  className?: string;
  id: string;
  title: string;
}

export function PortfolioSection({ children, className, id, title }: PortfolioSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section className={cn("mt-14 sm:mt-[68px]", className)} aria-labelledby={headingId}>
      <div className="overflow-hidden">
        <h2
          id={headingId}
          className="pb-2 text-muted motion-safe:animate-rise-in [animation-delay:var(--section-delay)]"
        >
          {title}
        </h2>
      </div>
      <span aria-hidden="true" className="block h-px bg-rule" />
      {children}
    </section>
  );
}
