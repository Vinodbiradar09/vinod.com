interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <p className="text-[11px] tracking-[0.12em] text-olive-800 uppercase mb-5 font-sans">
      {label}
    </p>
  );
}
