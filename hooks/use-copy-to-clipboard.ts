"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCopyToClipboard(resetDelay = 1400) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);

        if (resetTimer.current !== null) {
          window.clearTimeout(resetTimer.current);
        }

        resetTimer.current = window.setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch {
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy };
}
