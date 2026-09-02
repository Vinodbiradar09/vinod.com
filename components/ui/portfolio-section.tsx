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
      <h2 id={headingId} className="border-b border-rule pb-2 text-muted">
        {title}
      </h2>
      {children}
    </section>
  );
}
