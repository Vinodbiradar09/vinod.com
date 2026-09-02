export function QuietMagic() {
  return (
    <span className="group/magic relative inline-block cursor-default">
      quiet magic
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-ink opacity-0 group-hover/magic:animate-magic-line"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-[13%] size-px rounded-full bg-ink opacity-0 shadow-[0_0_5px_currentColor] group-hover/magic:animate-magic-spark"
      />
      <span
        aria-hidden="true"
        className="absolute -top-0.5 left-[52%] size-px rounded-full bg-ink opacity-0 shadow-[0_0_5px_currentColor] group-hover/magic:animate-magic-spark [animation-delay:70ms]"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 right-[8%] size-px rounded-full bg-ink opacity-0 shadow-[0_0_5px_currentColor] group-hover/magic:animate-magic-spark [animation-delay:140ms]"
      />
    </span>
  );
}
