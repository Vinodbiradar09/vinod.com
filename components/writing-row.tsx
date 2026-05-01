import type { Writing } from "@/lib/writings";
import Link from "next/link";

interface WritingRowProps {
  writing: Writing;
}

export function WritingRow({ writing }: WritingRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 group py-0.5">
      <Link
        href={`/writings/${writing.id}`}
        className="text-[15px] text-[#c8c4bc] no-underline group-hover:text-[#e8e5df] group-hover:underline underline-offset-[3px] transition-colors leading-snug"
      >
        {writing.title}
      </Link>
      <span
        className="text-[12px] text-[#444] tabular-nums shrink-0"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {writing.date}
      </span>
    </div>
  );
}
