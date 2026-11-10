import type { Metadata } from "next";

export const site = {
  name: "Magangworth",
  domain: "magangworth.id",
  url: "https://magangworth.web.app",
  locale: "id_ID",
  title: "Magangworth — magang ini menghabiskan semester atau meninggalkan skill?",
  description:
    "Isi jenis kantor, peran, status bayar, durasi, tugas harian, dan akses pembimbing. Sekali bayar Rp14.900 membuka lampu merah, kuning, atau hijau, skill yang harus diminta di minggu pertama, dan skrip renegosiasi yang sopan.",
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
  const title = input.path === "/" ? site.title : input.title;
  return {
    metadataBase: new URL(site.url),
    title: { absolute: title },
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
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Magangworth — lampu nilai magang" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: ["/og.png"],
    },
  };
}
