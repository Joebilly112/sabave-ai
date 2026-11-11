import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-11-11");
  return [
    { url: absoluteUrl("/"), lastModified: now },
    { url: absoluteUrl("/tentang"), lastModified: now },
    { url: absoluteUrl("/artikel"), lastModified: now },
    ...ARTICLES.map((article) => ({
      url: absoluteUrl(`/artikel/${article.slug}`),
      lastModified: new Date(article.date),
    })),
  ];
}
