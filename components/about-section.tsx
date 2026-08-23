export function AboutSection() {
  return (
    <section className="mb-2 space-y-2 text-[15px] leading-[1.75] text-[#a8a49e]">
      <p>
        <strong className="text-[#e8e5df] font-semibold">
          Software Engineer
        </strong>
        . I like software with a little quiet magic simple on the surface, solid
        underneath.
      </p>
      <p>
        I mostly work with TypeScript and Postgres. Lately, Rust to understand
        what JavaScript hides.
      </p>
      <p>
        Open to interesting conversations about building software.{" "}
        <a
          href="#contact"
          className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-70 transition-opacity"
        >
          Say hello
        </a>{" "}
        or find me on{" "}
        <a
          href="https://github.com/toovinod"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-70 transition-opacity"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          href="https://x.com/too_vinod"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-70 transition-opacity"
        >
          X
        </a>
        .
      </p>
    </section>
  );
}
