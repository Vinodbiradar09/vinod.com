import { BunRerun } from "@/components/ui/bun-rerun";
import { EmailContact } from "@/components/ui/email-contact";
import { HellCan } from "@/components/ui/hell-can";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { QuietMagic } from "@/components/ui/quiet-magic";
import { currentRole } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site-config";

export function ProfileIntro() {
  return (
    <div data-blueprint="intro" className="mt-9 space-y-5">
      <p
        data-rerun-item="rise"
        data-rerun-delay="1"
        className="text-pretty motion-safe:animate-rise-in"
        style={{ animationDelay: "50ms" }}
      >
        <span className="sm:whitespace-nowrap">
          Here to drink a can of <HellCan /> and write TypeScript. <BunRerun /> runs it, and
          Postgres remembers it.
        </span>
        <br />
        Currently working at{" "}
        <PortfolioLink href={currentRole.href} variant="editorial">
          {currentRole.company}
        </PortfolioLink>{" "}
        as a {currentRole.role}.
        <br />
        <br />
        tbh, software should feel like <QuietMagic />, simple on the surface, solid underneath.
      </p>
      <p
        data-rerun-item="rise"
        data-rerun-delay="2"
        className="text-pretty motion-safe:animate-rise-in"
        style={{ animationDelay: "100ms" }}
      >
        You can find me on{" "}
        <PortfolioLink href={siteConfig.social.x} variant="editorial">
          X
        </PortfolioLink>{" "}
        and{" "}
        <PortfolioLink href={siteConfig.social.github} variant="editorial">
          GitHub
        </PortfolioLink>
        , or reach me via <EmailContact email={siteConfig.email} />
      </p>
    </div>
  );
}
