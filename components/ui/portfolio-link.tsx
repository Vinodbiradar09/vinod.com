import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  inline:
    "relative inline-block rounded-[2px] text-inherit underline decoration-link-line underline-offset-[3px] transition-[text-decoration-color,scale,translate] duration-[160ms] ease-out hover:decoration-ink active:scale-[0.985] focus-visible:decoration-ink",
  editorial:
    "relative inline-block rounded-[2px] text-inherit underline decoration-link-line underline-offset-[3px] font-[460] [font-style:oblique_10deg] transition-[font-style,font-weight,letter-spacing,scale,translate,text-decoration-color] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px hover:font-[560] hover:tracking-[-0.02px] hover:decoration-ink hover:[font-style:oblique_0deg] active:scale-[0.985] focus-visible:-translate-y-px focus-visible:font-[560] focus-visible:tracking-[-0.02px] focus-visible:decoration-ink focus-visible:[font-style:oblique_0deg]",
  muted:
    "inline-flex items-center gap-0.5 rounded-[2px] text-xs leading-5 text-muted no-underline transition-[color,scale,translate] duration-150 hover:text-ink",
  plain:
    "rounded-[2px] text-ink no-underline transition-[scale,translate] duration-[180ms] ease-out active:scale-[0.985]",
  title:
    "group/title inline-flex items-center rounded-[2px] text-ink no-underline transition-[scale,translate] duration-[180ms] ease-out",
} as const;

interface PortfolioLinkProps extends ComponentPropsWithoutRef<"a"> {
  external?: boolean;
  variant?: keyof typeof variants;
}

export function PortfolioLink({
  children,
  className,
  external = true,
  variant = "inline",
  ...props
}: PortfolioLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        "group/link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:translate-y-px",
        variants[variant],
        className,
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
