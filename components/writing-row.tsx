import type { Writing } from "@/lib/writings";
import Link from "next/link";

interface WritingRowProps {
  writing: Writing;
}

export function WritingRow({ writing }: WritingRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 group py-0.75">
      <Link
        href={`/writings/${writing.id}`}
        className="text-[15px] text-[#1a1a1a] no-underline group-hover:underline underline-offset-[3px] transition-opacity leading-snug"
      >
        {writing.title}
      </Link>
      <span className="text-[12px] text-mist-700 tabular-nums shrink-0 font-sans">
        {writing.date}
      </span>
    </div>
  );
}
