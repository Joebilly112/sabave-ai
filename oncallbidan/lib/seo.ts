export const site = {
  name: "OnCallBidan",
  domain: "oncallbidan.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://oncallbidan.web.app",
  title: "OnCallBidan — apakah jaga malam sudah menggerus tidur dan keluarga?",
  description:
    "Untuk bidan yang baru selesai malam persalinan atau siaga 24 jam. Isi jaga 14 hari, persalinan lewat tengah malam, jam tidur, cadangan, dan gejala. Sekali bayar Rp14.900 untuk pita beban, malam yang dilindungi, dan naskah batas. Bukan nasihat medis.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
