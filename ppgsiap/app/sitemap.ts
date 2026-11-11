import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tentang", "/artikel"].map((path) => ({
    url: `${SITE.url}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const articles = ARTICLES.map((article) => ({
    url: `${SITE.url}/artikel/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...articles];
}
