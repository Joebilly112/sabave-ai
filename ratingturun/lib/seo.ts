export const site = {
  name: "RatingTurun",
  domain: "ratingturun.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ratingturun.web.app",
  title: "RatingTurun — rating saya turun, seberapa bahaya buat order?",
  description:
    "Untuk mitra ojek yang melihat bintang merosot pelan setelah beberapa order buruk. Isi platform, rating sekarang, pola batal seminggu ini, keluhan penumpang, dan order 7 hari. Sekali bayar Rp14.900 untuk pita risiko, rencana 20 order berikutnya, dan naskah bicara yang tenang. Bukan jaminan platform.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
