export const site = {
  name: "AkunSuspend",
  domain: "akunsuspend.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://akunsuspend.web.app",
  title: "AkunSuspend — akun kena suspend, banding apa dulu?",
  description:
    "Akun mitra terkunci dan pemasukan hari ini berhenti. Isi platform, jenis suspend, alasan di layar, sisa hari banding, dan jumlah peringatan. Sekali bayar Rp19.900 untuk pita keparahan, daftar bukti, timeline 24–48 jam, dan daftar yang jangan dilakukan. Informasi saja — keputusan akhir ada di platform.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
