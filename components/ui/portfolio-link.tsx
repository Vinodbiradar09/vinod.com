import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpRightIcon } from "./icons";

const variants = {
  inline:
    "relative inline-block rounded-[2px] text-inherit underline decoration-link-line underline-offset-[3px] transition-[text-decoration-color,transform] duration-[160ms] ease-out hover:decoration-ink focus-visible:decoration-ink",
  muted:
    "inline-flex items-center gap-0.5 rounded-[2px] text-xs leading-5 text-muted no-underline transition-colors duration-150 hover:text-ink",
  plain: "rounded-[2px] text-ink no-underline",
  title: "group/title inline-flex items-center rounded-[2px] text-ink no-underline",
} as const;

interface PortfolioLinkProps extends ComponentPropsWithoutRef<"a"> {
  external?: boolean;
  showIcon?: boolean;
  revealIcon?: boolean;
  variant?: keyof typeof variants;
}

export function PortfolioLink({
  children,
  className,
  external = true,
  showIcon = false,
  revealIcon = false,
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
      {showIcon ? (
        <ArrowUpRightIcon
          className={cn(
            "size-3 shrink-0 transition-transform duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
            revealIcon
              ? "ml-1 -translate-x-0.5 translate-y-0.5 opacity-0 transition-[opacity,transform] group-hover/title:translate-x-0 group-hover/title:translate-y-0 group-hover/title:opacity-100 group-focus-visible/title:translate-x-0 group-focus-visible/title:translate-y-0 group-focus-visible/title:opacity-100"
              : "group-hover/link:translate-x-px group-hover/link:-translate-y-px group-focus-visible/link:translate-x-px group-focus-visible/link:-translate-y-px",
          )}
        />
      ) : null}
    </a>
  );
}
