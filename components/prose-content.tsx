"use client";

import { useEffect, useRef } from "react";

interface ProseContentProps {
  content: string;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMarkdown(text: string): string {
  const blocks: string[] = [];
  const codeBlocks: string[] = [];

  const withPlaceholders = text.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang: string, code: string) => {
      const langAttr = lang ? ` data-lang="${lang}"` : "";
      codeBlocks.push(
        `<pre${langAttr}><code>${escapeHtml(code.trim())}</code></pre>`,
      );
      return `%%CODE_BLOCK_${codeBlocks.length - 1}%%`;
    },
  );

  const paragraphs = withPlaceholders.split(/\n{2,}/);

  for (const raw of paragraphs) {
    const block = raw.trim();
    if (!block) continue;

    if (/^%%CODE_BLOCK_\d+%%$/.test(block)) {
      const idx = parseInt(block.match(/\d+/)![0], 10);
      blocks.push(codeBlocks[idx]);
      continue;
    }

    if (block.startsWith("### ")) {
      blocks.push(`<h3>${inlineMarkdown(block.slice(4))}</h3>`);
      continue;
    }
    if (block.startsWith("## ")) {
      blocks.push(`<h2>${inlineMarkdown(block.slice(3))}</h2>`);
      continue;
    }
    if (block.startsWith("# ")) {
      blocks.push(`<h1>${inlineMarkdown(block.slice(2))}</h1>`);
      continue;
    }

    const lines = block.split("\n");
    const isUnorderedList = lines.every(
      (l) => /^- /.test(l.trim()) || l.trim() === "",
    );
    const isOrderedList = lines.every(
      (l) => /^\d+\. /.test(l.trim()) || l.trim() === "",
    );

    if (isUnorderedList && lines.some((l) => /^- /.test(l.trim()))) {
      const items = lines
        .filter((l) => /^- /.test(l.trim()))
        .map((l) => `<li>${inlineMarkdown(l.replace(/^- /, ""))}</li>`)
        .join("");
      blocks.push(`<ul>${items}</ul>`);
      continue;
    }

    if (isOrderedList && lines.some((l) => /^\d+\. /.test(l.trim()))) {
      const items = lines
        .filter((l) => /^\d+\. /.test(l.trim()))
        .map((l) => `<li>${inlineMarkdown(l.replace(/^\d+\. /, ""))}</li>`)
        .join("");
      blocks.push(`<ol>${items}</ol>`);
      continue;
    }

    const joined = lines.join(" ").trim();
    blocks.push(`<p>${inlineMarkdown(joined)}</p>`);
  }

  return blocks.join("\n");
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function ProseContent({ content }: ProseContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "copy";
      btn.addEventListener("click", () => {
        const code = pre.querySelector("code")?.textContent ?? "";
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = "copied!";
          setTimeout(() => (btn.textContent = "copy"), 2000);
        });
      });
      pre.appendChild(btn);
    });
  }, []);

  return (
    <>
      <style>{`
        .prose-content p {
          font-size: 15px;
          line-height: 1.85;
          color: #a8a49e;
          margin-bottom: 1.3rem;
        }
        .prose-content h1 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #e8e5df;
          margin-top: 2.75rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.015em;
        }
        .prose-content h2 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-size: 19px;
          font-weight: 600;
          color: #e8e5df;
          margin-top: 2.75rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.015em;
        }
        .prose-content h3 {
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #e8e5df;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          letter-spacing: -0.015em;
        }
        .prose-content ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1.3rem;
        }
        .prose-content ol {
          padding-left: 1.25rem;
          margin-bottom: 1.3rem;
          counter-reset: list-counter;
          list-style: none;
        }
        .prose-content ol li {
          counter-increment: list-counter;
          position: relative;
          padding-left: 1.5rem;
        }
        .prose-content ol li::before {
          content: counter(list-counter) ".";
          position: absolute;
          left: 0;
          color: #444;
          font-size: 13px;
          font-family: var(--font-geist-mono), monospace;
        }
        .prose-content ul li {
          font-size: 15px;
          line-height: 1.8;
          color: #a8a49e;
          padding-left: 1.25rem;
          position: relative;
          margin-bottom: 0.3rem;
        }
        .prose-content ul li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: #333;
          font-size: 12px;
          top: 1px;
        }
        .prose-content ol li {
          font-size: 15px;
          line-height: 1.8;
          color: #a8a49e;
          margin-bottom: 0.3rem;
        }
        .prose-content code {
          font-family: var(--font-geist-mono), 'Fira Code', monospace;
          font-size: 13px;
          background: #1e1e1e;
          padding: 2px 5px;
          border-radius: 3px;
          color: #c8c4bc;
        }
        .prose-content pre {
          position: relative;
          background: #141414;
          border: 1px solid #242424;
          border-radius: 6px;
          padding: 1.25rem 1.5rem 1.25rem 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.75rem;
        }
        .prose-content pre[data-lang]::before {
          content: attr(data-lang);
          display: block;
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }
        .prose-content pre code {
          background: none;
          padding: 0;
          font-size: 13px;
          color: #c8c4bc;
          line-height: 1.75;
        }
        .prose-content strong {
          font-weight: 600;
          color: #e8e5df;
        }
        .prose-content em {
          font-style: italic;
        }
        .copy-btn {
          position: absolute;
          top: 10px;
          right: 12px;
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          color: #444;
          background: none;
          border: none;
          cursor: pointer;
          letter-spacing: 0.06em;
          padding: 2px 4px;
          text-transform: uppercase;
          transition: color 0.15s;
        }
        .copy-btn:hover {
          color: #aaa;
        }
      `}</style>
      <div
        ref={ref}
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    </>
  );
}
