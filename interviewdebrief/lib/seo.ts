import type { Metadata } from "next";

export const site = {
  name: "InterviewDebrief",
  domain: "interviewdebrief.id",
  url: "https://interviewdebrief.web.app",
  locale: "id_ID",
  title: "InterviewDebrief — tadi hancur, atau cuma terasa hancur?",
  description:
    "Debrief sekali bayar setelah interview. Skor struktur, kejelasan, contoh, dan pertanyaan balik, plus tiga momen paling lemah dan draf follow-up 48 jam.",
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
  const title = input.path === "/" ? site.title : `${input.title} · InterviewDebrief`;
  return {
    metadataBase: new URL(site.url),
    title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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
