import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function PageShell({ className, ...props }: ComponentPropsWithoutRef<"main">) {
  return (
    <main
      data-blueprint="page"
      className={cn(
        "mx-auto min-h-svh w-full max-w-[36.375rem] px-5 pt-16 pb-12 text-sm leading-5 font-[460] tracking-[-0.09px] sm:px-0 sm:pt-[clamp(4.5rem,14vh,8.25rem)]",
        className,
      )}
      {...props}
    />
  );
}
