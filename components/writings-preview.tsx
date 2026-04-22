import { getRecentWritings } from "@/lib/writings";
import { SectionLabel } from "./section-label";
import { WritingRow } from "./writing-row";
import Link from "next/link";

export function WritingsPreview() {
  const recentWritings = getRecentWritings(5);

  return (
    <section>
      <SectionLabel label="Writing" />
      {recentWritings.length === 0 ? (
        <p className="text-[15px] text-[#aaa] italic">
          Nothing published yet coming soon.
        </p>
      ) : (
        <div className="space-y-1">
          {recentWritings.map((writing) => (
            <WritingRow key={writing.id} writing={writing} />
          ))}
          <div className="pt-3">
            <Link
              href="/writings"
              className="text-[13px] text-olive-800 no-underline hover:text-[#1a1a1a] transition-colors font-sans"
            >
              View all →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
