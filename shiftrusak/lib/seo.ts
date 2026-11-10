export const site = {
  name: "ShiftRusak",
  domain: "shiftrusak.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://shiftrusak.web.app",
  title: "ShiftRusak — apakah pola dinas ini merusak tidurku?",
  description:
    "Untuk perawat yang baru saja flip malam ke pagi dan badan terasa jet lag. Isi 14 hari dinas, commute, tidur, kafein, dan gejala. Sekali bayar Rp14.900 untuk skor gangguan ritme, malam yang perlu dilindungi di roster berikutnya, dan naskah ke kepala ruangan. Bukan nasihat medis.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
