import type { Metadata } from "next";
import { SITE } from "./site";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.url).toString();
}

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "NaikPangkat — daftar berkas kenaikan pangkat",
        },
      ],
    },
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  date: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    inLanguage: "id",
    mainEntityOfPage: absoluteUrl(opts.path),
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  });
}

export function websiteJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "id",
    description: SITE.description,
  });
}
