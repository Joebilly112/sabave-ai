export const site = {
  name: "PraktikSiap",
  domain: "praktiksiap.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://praktiksiap.web.app",
  title: "PraktikSiap — siapkah saya buka praktik mandiri bidan?",
  description:
    "Untuk bidan yang ingin praktik sendiri tapi takut berkas atau alat ditolak dinas. Isi lama kerja, STRB, SIPB, tempat, alat, limbah, dan rekomendasi IBI. Sekali bayar Rp19.900 untuk lampu hijau kuning merah, daftar yang masih kurang, dan rencana 30 hari. Bukan keputusan izin.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
