"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from "@/components/ui/icons";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { creations, currentRole } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site-config";
import { toggleTheme } from "@/lib/theme";

const navigationItems = [
  { label: currentRole.company, detail: "Where I build", href: currentRole.href },
  ...creations.map((creation) => ({
    label: creation.name,
    detail: "Made",
    href: creation.href,
  })),
  { label: "GitHub", detail: "Social", href: siteConfig.social.github },
  { label: "X", detail: "Social", href: siteConfig.social.x },
] as const;

const itemClassName =
  "group/item flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-ink outline-none transition-[background-color,color,transform] duration-[160ms] ease-out hover:bg-surface active:translate-y-px focus-visible:bg-surface focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus";

type CommandElement = HTMLAnchorElement | HTMLButtonElement;

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const itemRefs = useRef<Array<CommandElement | null>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  const closePalette = useCallback(() => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, []);

  const openPalette = useCallback(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      setIsOpen(true);
      window.requestAnimationFrame(() => itemRefs.current[0]?.focus());
    }
  }, []);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        if (dialogRef.current?.open) {
          closePalette();
        } else {
          openPalette();
        }
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [closePalette, openPalette]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  function navigateItems(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const items = itemRefs.current.filter((item): item is CommandElement => item !== null);
    const currentIndex = items.indexOf(document.activeElement as CommandElement);
    let nextIndex = currentIndex;

    if (event.key === "Home" || (event.key === "ArrowDown" && currentIndex === -1)) nextIndex = 0;
    if (event.key === "End" || (event.key === "ArrowUp" && currentIndex === -1)) {
      nextIndex = items.length - 1;
    }
    if (event.key === "ArrowDown" && currentIndex !== -1) {
      nextIndex = (currentIndex + 1) % items.length;
    }
    if (event.key === "ArrowUp" && currentIndex !== -1) {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    }

    items[nextIndex]?.focus();
  }

  const copyIndex = navigationItems.length;
  const themeIndex = navigationItems.length + 1;

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="h-6 cursor-pointer rounded-[2px] px-1 text-[10px] leading-5 tracking-normal text-muted opacity-70 transition-[color,opacity,transform] duration-[160ms] hover:text-ink active:translate-y-px focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/header:opacity-100 [@media(hover:hover)]:group-focus-within/header:opacity-100"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="quick-switcher"
        title="Open quick switcher"
      >
        ⌘K
      </button>
      <dialog
        ref={dialogRef}
        id="quick-switcher"
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onKeyDown={navigateItems}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePalette();
        }}
        className="m-auto max-h-[min(32rem,calc(100svh-2.5rem))] w-[calc(100%-2.5rem)] max-w-[25rem] overflow-hidden rounded-xl border border-rule-strong bg-page p-0 text-sm text-ink shadow-[0_24px_80px_rgb(0_0_0/18%)] backdrop:bg-black/45 backdrop:backdrop-blur-[2px] motion-safe:open:animate-palette-in dark:shadow-[0_24px_90px_rgb(0_0_0/70%)]"
        aria-labelledby="quick-switcher-title"
      >
        <div className="border-b border-rule px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <h2 id="quick-switcher-title" className="font-medium">
              Quick switcher
            </h2>
            <button
              type="button"
              onClick={closePalette}
              className="cursor-pointer rounded-[2px] text-[10px] leading-5 text-muted transition-colors duration-[160ms] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              aria-label="Close quick switcher"
            >
              Esc
            </button>
          </div>
        </div>
        <div className="space-y-1 p-2">
          {navigationItems.map((item, index) => (
            <a
              key={item.label}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closePalette}
              className={itemClassName}
            >
              <span>{item.label}</span>
              <span className="flex items-center gap-2 text-xs text-muted">
                {item.detail}
                <ArrowUpRightIcon className="size-3 -translate-x-0.5 translate-y-0.5 opacity-0 transition-[opacity,transform] duration-[160ms] group-hover/item:translate-x-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-visible/item:translate-x-0 group-focus-visible/item:translate-y-0 group-focus-visible/item:opacity-100" />
              </span>
            </a>
          ))}
          <button
            ref={(element) => {
              itemRefs.current[copyIndex] = element;
            }}
            type="button"
            onClick={() => copy(siteConfig.email)}
            className={itemClassName}
          >
            <span>{copied ? "Email copied" : "Copy email"}</span>
            {copied ? (
              <CheckIcon className="size-3 text-muted" />
            ) : (
              <CopyIcon className="size-3 text-muted" />
            )}
          </button>
          <button
            ref={(element) => {
              itemRefs.current[themeIndex] = element;
            }}
            type="button"
            onClick={() => {
              toggleTheme();
              closePalette();
            }}
            className={itemClassName}
          >
            <span>Switch appearance</span>
            <span className="text-xs text-muted">Dark / Light</span>
          </button>
        </div>
        <div className="border-t border-rule px-4 py-2.5 text-[10px] leading-4 text-muted">
          ↑↓ Navigate · Enter Open · Esc Close
        </div>
      </dialog>
    </>
  );
}
