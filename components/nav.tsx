import Link from "next/link";
import { Press_Start_2P } from "next/font/google";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

interface NavProps {
  active: "home" | "writings" | "people";
}

export function Nav({ active }: NavProps) {
  return (
    <div className={`mb-10 ${pixel.variable}`}>
      <Link href="/" className="block no-underline mb-6">
        <h1
          style={{ fontFamily: "var(--font-pixel)" }}
          className="text-[16px] leading-tight text-[#e8e5df] hover:text-[#888] transition-colors duration-300"
        >
          Vinod Biradar
        </h1>
      </Link>
      <nav
        className="flex gap-5 text-[15px]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <Link
          href="/"
          className={`no-underline transition-colors ${
            active === "home"
              ? "text-[#e8e5df] font-medium"
              : "text-[#555] hover:text-[#e8e5df]"
          }`}
        >
          Home
        </Link>
        <Link
          href="/writings"
          className={`no-underline transition-colors ${
            active === "writings"
              ? "text-[#e8e5df] font-medium"
              : "text-[#555] hover:text-[#e8e5df]"
          }`}
        >
          Writings
        </Link>
        <Link
          href="/people"
          className={`no-underline transition-colors ${
            active === "people"
              ? "text-[#e8e5df] font-medium"
              : "text-[#555] hover:text-[#e8e5df]"
          }`}
        >
          People
        </Link>
      </nav>
    </div>
  );
}
