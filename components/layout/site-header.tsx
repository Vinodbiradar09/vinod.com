import { ThemeToggle } from "@/components/theme-toggle";
import { InteractiveName } from "@/components/ui/interactive-name";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="flex items-start justify-between gap-6">
      <div className="overflow-hidden">
        <div className="motion-safe:animate-rise-in">
          <InteractiveName name={siteConfig.name} />
        </div>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
