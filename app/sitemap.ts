import { getAllWritings } from "@/lib/writings";
import type { MetadataRoute } from "next";

const BASE_URL = "https://vinodbiradar.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const writings = getAllWritings();

  const writingRoutes = writings.map((w) => ({
    url: `${BASE_URL}/writings/${w.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/writings`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...writingRoutes,
  ];
}
