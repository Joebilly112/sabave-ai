export const site = {
  name: "SipbHabis",
  domain: "sipbhabis.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sipbhabis.web.app",
  title: "SipbHabis — kapan SIPB dan STRB saya habis?",
  description:
    "Untuk bidan yang ditanya berkas oleh dinas, HRD, atau pasien, sementara tanggal SIPB dan STRB masih samar. Isi tanggal terbit dan habis STRB, jumlah SIPB, jenis tempat praktik, dan kredit yang sudah terkumpul. Sekali bayar Rp19.900 untuk hitung mundur, daftar berkas perpanjangan, dan rencana minggu demi minggu. Informasi persiapan, bukan keputusan izin.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
