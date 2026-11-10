import type { Metadata } from "next";

export const site = {
  name: "CVtolak",
  domain: "cvtolak.id",
  url: "https://cvtolak.web.app",
  locale: "id_ID",
  title: "CVtolak — kenapa lamaranmu tidak dibalas?",
  description:
    "Tempel CV, peran yang dilamar, dan lama pengalaman. Sekali bayar membuka celah kata kunci ATS, tanda format yang bikin file dilewati, paragraf ringkasan yang ditulis ulang, dan daftar simpan / potong / tambah.",
} as const;

export function absoluteUrl(path: string): string {
  if (path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata(input: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  const title = input.path === "/" ? site.title : `${input.title} · CVtolak`;
  return {
    metadataBase: new URL(site.url),
    title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description: input.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: ["/og.png"],
    },
  };
}
