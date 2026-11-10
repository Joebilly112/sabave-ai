export const site = {
  name: "STRHabis",
  domain: "strhabis.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://strhabis.web.app",
  title: "STRHabis — kapan STR-ku habis dan apa yang harus disiapkan?",
  description:
    "Untuk perawat yang panik saat SDM atau rumah sakit minta STR baru. Isi tanggal terbit, tanggal habis, status SIP, tempat praktik, dan kredit SKP yang sudah terkumpul. Sekali bayar Rp19.900 untuk hitungan hari, daftar dokumen, dan rencana minggu. Informasi persiapan saja — aturan resmi ada di Konsil dan Kemenkes.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
