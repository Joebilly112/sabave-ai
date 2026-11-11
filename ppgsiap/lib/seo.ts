import type { Metadata } from "next";
import { PRODUCT } from "@/lib/config";

export const SITE = {
  name: PRODUCT.name,
  url: PRODUCT.url,
  domain: PRODUCT.domain,
  description:
    "Cek kesiapan slot PPG tahun ini: skor dari berkas dan masa mengajar, daftar dokumen yang masih bolong, dan rencana 30 hari sebelum portal dibuka. Bukan pengumuman resmi dan bukan jaminan lolos.",
  locale: "id_ID",
} as const;

export function pageMetadata(input: {
  title: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}): Metadata {
  const description = input.description ?? SITE.description;
  const path = input.path ?? "/";
  const url = new URL(path, SITE.url).toString();
  return {
    title: input.title,
    description,
    alternates: { canonical: url },
    robots: input.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: input.title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "PPG Siap" }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
      images: ["/og.png"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "id",
    description: SITE.description,
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  published: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    inLanguage: "id",
    mainEntityOfPage: `${SITE.url}/artikel/${article.slug}`,
    author: { "@type": "Organization", name: SITE.name },
  };
}
