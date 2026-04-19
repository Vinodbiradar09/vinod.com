import Link from "next/link";

interface NavProps {
  active: "home" | "writings";
}

export function Nav({ active }: NavProps) {
  return (
    <div className="mb-10">
      <Link href="/" className="block no-underline mb-6">
        <h1 className="text-[22px] font-semibold tracking-tight text-[#1a1a1a]">
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
