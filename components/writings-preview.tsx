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
        <p className="text-[15px] text-[#444] italic">
          Nothing published yet — coming soon.
        </p>
      ) : (
        <div className="space-y-1">
          {recentWritings.map((writing) => (
            <WritingRow key={writing.id} writing={writing} />
          ))}
          <div className="pt-3">
            <Link
              href="/writings"
              className="text-[13px] text-[#555] no-underline hover:text-[#e8e5df] transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              View all →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
