export const site = {
  name: "BurnoutDulu",
  domain: "burnoutdulu.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://burnoutdulu.web.app",
  title: "BurnoutDulu — aku freelancer-in diri sendiri sampai burnout?",
  description:
    "Weekend hilang, revisi selalu diiyakan, uang masuk tapi rasanya kosong. Isi jam, jumlah klien, tidur, hari libur, dan gejala tubuh. Sekali bayar Rp14.900 untuk pita hijau, amber, atau merah, rencana potong beban 14 hari, dan naskah jeda satu klien.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
