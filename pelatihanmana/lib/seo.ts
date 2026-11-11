import type { Metadata } from "next";
import { PRODUCT } from "@/lib/config";

export const SITE = {
  name: PRODUCT.name,
  url: PRODUCT.url,
  domain: PRODUCT.domain,
  description:
    "Pilih tiga pelatihan kompetensi perawat yang berikutnya — dengan alasan, biaya waktu, dan yang sebaiknya ditunda. Bukan katalog yang lagi ramai.",
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
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pelatihan Mana" }],
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
