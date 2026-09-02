import { EmailContact } from "@/components/ui/email-contact";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { currentRole, profileSummary } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site-config";

export function ProfileIntro() {
  return (
    <div className="mt-9 space-y-5 motion-safe:animate-reveal [animation-delay:50ms]">
      <p>
        I currently work at{" "}
        <PortfolioLink href={currentRole.href}>{currentRole.company}</PortfolioLink> as a{" "}
        {currentRole.role}.
      </p>
      <p>{profileSummary}</p>
      <p>
        You can find me on <PortfolioLink href={siteConfig.social.x}>X</PortfolioLink> and{" "}
        <PortfolioLink href={siteConfig.social.github}>GitHub</PortfolioLink>, or reach me via{" "}
        <EmailContact email={siteConfig.email} />.
      </p>
    </div>
  );
}
