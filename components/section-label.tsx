interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p
      className="text-[11px] tracking-[0.12em] text-[#555] uppercase mb-5"
      style={{ fontFamily: "var(--font-space-grotesk)" }}
    >
      {label}
    </p>
  );
}
