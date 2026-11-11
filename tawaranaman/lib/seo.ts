export const site = {
  name: "TawaranAman",
  domain: "tawaranaman.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tawaranaman.web.app",
  title: "TawaranAman — tawaran kerja ke luar negeri ini aman, atau jebakan calo?",
  description:
    "Penawaran dari P3MI, LPK, orang perorangan, atau iklan. Isi negara tujuan, visa yang dijanjikan, biaya, pinjaman, dokumen, akun SISKOP2MI, dan kontrak. Sekali bayar Rp9.900 untuk pita aman, waspada, atau bahaya, tanda yang ketahuan, langkah cek resmi, dan naskah menolak dengan sopan. Bukan nasihat hukum.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
