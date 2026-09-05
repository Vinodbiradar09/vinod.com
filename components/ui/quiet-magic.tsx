const sparkles = [
  { className: "-top-1.5 left-[8%]", delay: "0ms" },
  { className: "-top-2 left-[48%]", delay: "85ms" },
  { className: "-top-1 right-[3%]", delay: "170ms" },
] as const;

export function QuietMagic() {
  return (
    <span className="group/magic relative inline-block cursor-default">
      quiet magic
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.className}
          aria-hidden="true"
          className={`absolute size-1.25 opacity-0 motion-safe:group-hover/magic:animate-magic-spark ${sparkle.className}`}
          style={{ animationDelay: sparkle.delay }}
        >
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 rounded-full bg-ink shadow-[0_0_7px_currentColor]" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 rounded-full bg-ink shadow-[0_0_7px_currentColor]" />
        </span>
      ))}
    </span>
  );
}
