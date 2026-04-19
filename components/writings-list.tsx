import { getAllWritings } from "@/lib/writings";
import { SectionLabel } from "./section-label";
import { WritingRow } from "./writing-row";

export function WritingsList() {
  const allWritings = getAllWritings();

  return (
    <section>
      <SectionLabel label="All Writing" />
      {allWritings.length === 0 ? (
        <p className="text-[15px] text-[#aaa] italic">
          Nothing published yet coming soon.
        </p>
      ) : (
        <div className="space-y-1">
          {allWritings.map((writing) => (
            <WritingRow key={writing.id} writing={writing} />
          ))}
        </div>
      )}
    </section>
  );
}
