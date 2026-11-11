export const site = {
  name: "NgekosGak",
  domain: "ngekosgak.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ngekosgak.web.app",
  title: "Ngekos dekat kantor, atau tetap pulang-pergi?",
  description:
    "Bandingkan ongkos jalan, jam yang hilang setahun, dan tidur yang kembali kalau ngekos. Sekali bayar Rp14.900 untuk putusan pulang, ngekos, atau kos hari kerja. Bukan saran keuangan.",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
