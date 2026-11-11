export const site = {
  name: "BertahanGak",
  domain: "bertahangak.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bertahangak.web.app",
  title: "Masih kuat bertahan, atau sudah waktunya minta bantuan?",
  description:
    "Cek situasi kerja di luar negeri: bertahan dengan rencana, cari bantuan sekarang, atau darurat. Kontak resmi KP2MI dan perwakilan RI tetap gratis. Bukan nasihat hukum.",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
