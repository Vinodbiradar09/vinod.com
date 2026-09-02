import Image from "next/image";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { type Role, roles } from "@/lib/portfolio-data";

function RoleItem({ role }: { role: Role }) {
  return (
    <PortfolioLink
      href={role.href}
      aria-label={`Visit ${role.company}`}
      className="group/role grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 py-3.5 opacity-0 motion-safe:animate-row-in motion-reduce:opacity-100 [animation-delay:230ms]"
      variant="plain"
    >
      <span className="grid size-11 place-items-center overflow-hidden rounded-xl border border-rule bg-surface transition-[border-color,box-shadow,scale,translate] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/role:-translate-y-px group-hover/role:scale-[1.015] group-hover/role:border-rule-strong group-hover/role:shadow-[0_6px_18px_rgb(0_0_0/7%)] group-focus-visible/role:-translate-y-px group-focus-visible/role:scale-[1.015] group-focus-visible/role:border-rule-strong group-focus-visible/role:shadow-[0_6px_18px_rgb(0_0_0/7%)] dark:group-hover/role:shadow-[0_0_0_1px_rgb(255_255_255/3%)] dark:group-focus-visible/role:shadow-[0_0_0_1px_rgb(255_255_255/3%)]">
        <Image
          src={role.logo}
          alt=""
          width={44}
          height={44}
          sizes="44px"
          loading="eager"
          className="size-full object-cover"
        />
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-ink">{role.company}</span>
        <span className="block text-[13px] leading-[18px] text-muted">{role.role}</span>
      </span>
    </PortfolioLink>
  );
}

export function RoleList() {
  return roles.map((role) => <RoleItem key={role.company} role={role} />);
}
