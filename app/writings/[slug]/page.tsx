import { getAllWritingIds, getWritingById } from "@/lib/writings";
import { ProseContent } from "@/components/prose-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const ids = getAllWritingIds();
  return ids.map((id) => ({ slug: id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWritingById(slug);
  if (!writing) return {};
  return {
    title: writing.title,
    description: writing.excerpt,
  };
}

export default async function WritingPage({ params }: PageProps) {
  const { slug } = await params;
  const writing = getWritingById(slug);

  if (!writing) {
    notFound();
  }

  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <div className="mb-10">
        <Link
          href="/writings"
          className="text-[13px] text-[#999] no-underline hover:text-[#1a1a1a] transition-colors font-sans"
        >
          ← Writings
        </Link>
      </div>

      <header className="mb-10">
        <h1 className="text-[22px] font-semibold leading-snug tracking-tight text-[#1a1a1a] mb-4">
          {writing.title}
        </h1>
        <div className="flex items-center gap-4 text-[13px] text-[#aaa] font-sans">
          <span>{writing.date}</span>
          <span>·</span>
          <span>{writing.readTime}</span>
        </div>
      </header>

      <hr className="border-none border-t border-[#e8e4de] mb-10" />

      <article>
        <ProseContent content={writing.content} />
      </article>

      <hr className="border-none border-t border-[#e8e4de] mt-12 mb-8" />

      <footer className="flex items-center justify-between text-[13px] text-[#aaa] font-sans">
        <Link
          href="/writings"
          className="no-underline hover:text-[#1a1a1a] transition-colors"
        >
          ← All writings
        </Link>
        <Link
          href="/"
          className="no-underline hover:text-[#1a1a1a] transition-colors"
        >
          Vinod Biradar
        </Link>
      </footer>
    </main>
  );
}
