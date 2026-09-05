import { InteractiveName } from "@/components/ui/interactive-name";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header data-blueprint="header">
      <div className="overflow-hidden">
        <div data-rerun-item="rise" className="motion-safe:animate-rise-in">
          <InteractiveName name={siteConfig.name} />
        </div>
      </div>
    </header>
  );
}
