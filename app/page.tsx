import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";
import { CreationList } from "@/components/portfolio/creation-list";
import { ProfileIntro } from "@/components/portfolio/profile-intro";
import { RoleList } from "@/components/portfolio/role-list";
import { PortfolioSection } from "@/components/ui/portfolio-section";

export default function HomePage() {
  return (
    <PageShell>
      <SiteHeader />
      <ProfileIntro />
      <PortfolioSection
        id="where-i-build"
        title="Where I build"
        className="[--section-delay:190ms]"
      >
        <RoleList />
      </PortfolioSection>
      <PortfolioSection id="made" title="Made" className="[--section-delay:250ms]">
        <CreationList />
      </PortfolioSection>
    </PageShell>
  );
}
