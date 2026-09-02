import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site-config";

interface SiteHeaderProps {
  animate?: boolean;
}

export function SiteHeader({ animate = false }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-6",
        animate && "motion-safe:animate-reveal",
      )}
    >
      <h1 className="font-medium text-ink">{siteConfig.name}</h1>
      <ThemeToggle />
    </header>
  );
}
