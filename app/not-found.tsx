import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { SiteHeader } from "@/components/layout/site-header";

export default function NotFound() {
  return (
    <PageShell>
      <SiteHeader />
      <div className="mt-[68px] space-y-1 text-muted">
        <p>This page no longer exists.</p>
        <p>
          <Link
            href="/"
            className="rounded-[2px] text-ink underline decoration-link-line underline-offset-[3px] transition-colors duration-150 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Return home
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
