const COSRX_PACKAGE = "@cosrx/core";
const COSRX_PUBLISHED_ON = "2026-04-13";
const VERIFIED_FALLBACK_TOTAL = 937;

interface NpmDownloadsResponse {
  downloads?: number;
}

function utcDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function getCosrxTotalDownloads() {
  const packageName = encodeURIComponent(COSRX_PACKAGE);
  const period = `${COSRX_PUBLISHED_ON}:${utcDate(new Date())}`;

  try {
    const response = await fetch(`https://api.npmjs.org/downloads/point/${period}/${packageName}`, {
      next: { revalidate: 86_400 },
    });

    if (!response.ok) return VERIFIED_FALLBACK_TOTAL;

    const data = (await response.json()) as NpmDownloadsResponse;
    return typeof data.downloads === "number" && Number.isFinite(data.downloads)
      ? data.downloads
      : VERIFIED_FALLBACK_TOTAL;
  } catch {
    return VERIFIED_FALLBACK_TOTAL;
  }
}
