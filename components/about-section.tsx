import Link from "next/link";

export function AboutSection() {
  return (
    <section className="mb-2 space-y-4 text-[15px] leading-[1.75] text-[#3a3a3a]">
      <p>
        Yep, I&apos;m a{" "}
        <strong className="text-[#1a1a1a] font-semibold">
          Full-stack Developer
        </strong>
        . My main stack is{" "}
        <strong className="text-[#1a1a1a] font-semibold">Next.js</strong> with{" "}
        <strong className="text-[#1a1a1a] font-semibold">TypeScript</strong>,
        and on the backend I reach for{" "}
        <strong className="text-[#1a1a1a] font-semibold">Node.js</strong>,{" "}
        <strong className="text-[#1a1a1a] font-semibold">NestJS</strong>, or{" "}
        <strong className="text-[#1a1a1a] font-semibold">Express</strong>{" "}
        depending on what the project needs.
      </p>
      <p>
        For databases I use{" "}
        <strong className="text-[#1a1a1a] font-semibold">PostgreSQL</strong> on{" "}
        <strong className="text-[#1a1a1a] font-semibold">NeonDB</strong> with{" "}
        <strong className="text-[#1a1a1a] font-semibold">Prisma </strong> as my
        ORM. I&apos;ve worked with{" "}
        <strong className="text-[#1a1a1a] font-semibold">Redis</strong>,{" "}
        <strong className="text-[#1a1a1a] font-semibold">Kafka</strong>, and{" "}
        <strong className="text-[#1a1a1a] font-semibold">RabbitMQ</strong> for
        caching and messaging, and I deploy on{" "}
        <strong className="text-[#1a1a1a] font-semibold">Vercel</strong> and{" "}
        <strong className="text-[#1a1a1a] font-semibold">Render</strong> with{" "}
        <strong className="text-[#1a1a1a] font-semibold">Docker</strong> in the
        mix. I write all of this inside{" "}
        <strong className="text-[#1a1a1a] font-semibold">Zed</strong>.
      </p>
      <p>
        Lately I&apos;ve been picking up{" "}
        <strong className="text-[#1a1a1a] font-semibold">Rust </strong> not for
        any project, just to understand the parts JavaScript hides from you. New
        languages and frameworks don&apos;t intimidate me I genuinely enjoy the
        process of learning them.
      </p>
      <p>
        Open to interesting conversations about building software.{" "}
        <Link
          href="#contact"
          className="text-[#1a1a1a] underline underline-offset-[3px]"
        >
          Say hello
        </Link>{" "}
        or find me on{" "}
        <a
          href="https://github.com/Vinodbiradar09"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a1a1a] underline underline-offset-[3px]"
        >
          GitHub
        </a>{" "}
        or{" "}
        <a
          href="https://x.com/toovinod09"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a1a1a] underline underline-offset-[3px]"
        >
          X
        </a>
        .
      </p>
    </section>
  );
}
