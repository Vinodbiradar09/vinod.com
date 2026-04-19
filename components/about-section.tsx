import Link from "next/link";

export function AboutSection() {
  return (
    <section className="mb-2 space-y-4 text-[15px] leading-[1.75] text-[#3a3a3a]">
      <p>
        Full-stack developer working across the JavaScript ecosystem, mainly
        with <em>TypeScript</em>, <em>Next.js</em>, and <em>Node.js</em>. I
        enjoy building products and I&apos;m exploring Rust for lower-level
        understanding.
      </p>
      <p>
        I work with PostgreSQL, Redis, Docker, and deploy on Vercel and Render.
        Always thinking about system design, async concurrency, and how data
        flows through an application.
      </p>
      <p>
        Open to interesting conversations about building software.{" "}
        <Link href="#contact" className="text-[#1a1a1a]">
          Say hello
        </Link>{" "}
        or find me on{" "}
        <a
          href="https://github.com/Vinodbiradar09"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a1a1a]"
        >
          GitHub
        </a>
        .
      </p>
    </section>
  );
}
