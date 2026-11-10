export const site = {
  name: "PajakKuGak",
  domain: "pajakkugak.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pajakkugak.web.app",
  title: "PajakKuGak — freelancer wajib lapor tahun ini, atau belum?",
  description:
    "Musim lapor bikin panik? Isi omzet klien, status NPWP, dan bukti potong. Sekali bayar Rp24.900 untuk putusan wajib, mungkin, atau belum, jalur formulir, dan checklist dokumen. Bukan nasihat pajak.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
