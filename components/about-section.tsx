import Link from "next/link";

export function AboutSection() {
  return (
    <section className="mb-2 space-y-4 text-[15px] leading-[1.75] text-[#a8a49e]">
      <p>
        Yep, I&apos;m a{" "}
        <strong className="text-[#e8e5df] font-semibold">
          Full-stack Developer
        </strong>
        . My main stack is{" "}
        <strong className="text-[#e8e5df] font-semibold">Next.js</strong> with{" "}
        <strong className="text-[#e8e5df] font-semibold">TypeScript</strong>,
        and on the backend I reach for{" "}
        <strong className="text-[#e8e5df] font-semibold">Node.js</strong>,{" "}
        <strong className="text-[#e8e5df] font-semibold">NestJS</strong>, or{" "}
        <strong className="text-[#e8e5df] font-semibold">Express</strong>{" "}
        depending on what the project needs.
      </p>
      <p>
        For databases I use{" "}
        <strong className="text-[#e8e5df] font-semibold">PostgreSQL</strong> on{" "}
        <strong className="text-[#e8e5df] font-semibold">NeonDB</strong> with{" "}
        <strong className="text-[#e8e5df] font-semibold">
          Prisma , Drizzle
        </strong>{" "}
        as my ORM. I&apos;ve worked with{" "}
        <strong className="text-[#e8e5df] font-semibold">Redis</strong>,{" "}
        <strong className="text-[#e8e5df] font-semibold">Kafka</strong>, and{" "}
        <strong className="text-[#e8e5df] font-semibold">RabbitMQ</strong> for
        caching and messaging, and I deploy on{" "}
        <strong className="text-[#e8e5df] font-semibold">Vercel</strong> and{" "}
        <strong className="text-[#e8e5df] font-semibold">Render</strong> with{" "}
        <strong className="text-[#e8e5df] font-semibold">Docker</strong> in the
        mix. I write all of this inside{" "}
        <strong className="text-[#e8e5df] font-semibold">Zed</strong>.
      </p>
      <p>
        Lately I&apos;ve been picking up{" "}
        <strong className="text-[#e8e5df] font-semibold">Rust </strong> not for
        any project, just to understand the parts JavaScript hides from you. New
        languages and frameworks don&apos;t intimidate me; I genuinely enjoy the
        process of learning them.
      </p>
      <p>
        Open to interesting conversations about building software.{" "}
        <Link
          href="#contact"
          className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-70 transition-opacity"
        >
          Say hello
        </Link>{" "}
        or find me on{" "}
        <a
          href="https://github.com/Vinodbiradar09"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e8e5df] underline underline-offset-[3px] hover:opacity-70 transition-opacity"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          href="https://x.com/toovinod09"
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
