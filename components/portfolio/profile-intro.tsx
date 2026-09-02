import { EmailContact } from "@/components/ui/email-contact";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { QuietMagic } from "@/components/ui/quiet-magic";
import { currentRole } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site-config";

function IntroLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div>
      <p className="motion-safe:animate-rise-in" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </p>
    </div>
  );
}

export function ProfileIntro() {
  return (
    <div className="mt-9 space-y-5">
      <IntroLine delay={50}>
        I currently work at{" "}
        <PortfolioLink href={currentRole.href} variant="editorial">
          {currentRole.company}
        </PortfolioLink>{" "}
        as a {currentRole.role}.
      </IntroLine>
      <IntroLine delay={100}>
        I like software with a little <QuietMagic />, simple on the surface, solid underneath. I
        mostly work with TypeScript and Postgres.
      </IntroLine>
      <IntroLine delay={150}>
        You can find me on{" "}
        <PortfolioLink href={siteConfig.social.x} variant="editorial">
          X
        </PortfolioLink>{" "}
        and{" "}
        <PortfolioLink href={siteConfig.social.github} variant="editorial">
          GitHub
        </PortfolioLink>
        , or reach me via <EmailContact email={siteConfig.email} />.
      </IntroLine>
    </div>
  );
}
