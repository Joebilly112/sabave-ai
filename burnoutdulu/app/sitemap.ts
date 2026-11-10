import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-10");
  return [
    { url: absoluteUrl("/"), lastModified: now },
    { url: absoluteUrl("/tentang"), lastModified: now },
    { url: absoluteUrl("/artikel"), lastModified: now },
    ...articles.map((article) => ({
      url: absoluteUrl(`/artikel/${article.slug}`),
      lastModified: new Date(article.publishedAt),
    })),
  ];
}
