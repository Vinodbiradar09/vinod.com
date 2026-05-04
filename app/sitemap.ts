import { getAllWritings } from "@/lib/writings";
import type { MetadataRoute } from "next";

const BASE_URL = "https://vin0d.com";

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
    // Add your other pages:
    {
      url: `${BASE_URL}/people`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...writingRoutes,
  ];
}
