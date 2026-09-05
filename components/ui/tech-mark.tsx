import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TechMarkProps {
  children: ReactNode;
  icon: string;
  iconClassName?: string;
}

export function TechMark({ children, icon, iconClassName }: TechMarkProps) {
  return (
    <span className="group/tech inline-grid align-baseline">
      <span className="col-start-1 row-start-1 transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.22,0.7,0.2,1)] group-hover/tech:scale-95 group-hover/tech:opacity-0 group-focus-within/tech:scale-95 group-focus-within/tech:opacity-0 motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 grid origin-center scale-[0.72] place-items-center self-center opacity-0 transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.22,0.7,0.2,1)] group-hover/tech:scale-[1.03] group-hover/tech:opacity-100 group-focus-within/tech:scale-[1.03] group-focus-within/tech:opacity-100 motion-safe:group-hover/tech:animate-tech-logo-in motion-safe:group-focus-within/tech:animate-tech-logo-in motion-reduce:scale-100 motion-reduce:transition-none"
      >
        <Image src={icon} alt="" width={24} height={24} className={cn("size-5", iconClassName)} />
      </span>
    </span>
  );
}
