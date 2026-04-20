import Link from "next/link";
import { Press_Start_2P } from "next/font/google";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

interface NavProps {
  active: "home" | "writings";
}

export function Nav({ active }: NavProps) {
  return (
    <div className={`mb-10 ${pixel.variable}`}>
      <Link href="/" className="block no-underline mb-6 group">
        <h1 className="font-(--font-pixel) text-[18px] leading-tight text-[#1a1a1a] hover:text-[#666] transition-colors duration-300">
          Vinod Biradar
        </h1>
      </Link>
      <nav className="flex gap-5 text-[15px]">
        <Link
          href="/"
          className={`no-underline transition-colors ${
            active === "home"
              ? "text-[#1a1a1a] font-medium"
              : "text-[#999] hover:text-[#1a1a1a]"
          }`}
        >
          Home
        </Link>
        <Link
          href="/writings"
          className={`no-underline transition-colors ${
            active === "writings"
              ? "text-[#1a1a1a] font-medium"
              : "text-[#999] hover:text-[#1a1a1a]"
          }`}
        >
          Writings
        </Link>
      </nav>
    </div>
  );
}
