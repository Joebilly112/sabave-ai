export const site = {
  name: "JauhAnak",
  domain: "jauhanak.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jauhanak.web.app",
  title: "JauhAnak — apakah anak masih dekat saat orang tua kerja jauh?",
  description:
    "Untuk orang tua yang bertahun-tahun jauh dari anak. Isi usia, lama terpisah, siapa yang merawat, irama panggilan, isi obrolan, tanda terakhir, dan sisa kontrak. Sekali bayar Rp14.900 untuk pita dekat, renggang, atau perlu perhatian, tiga kebiasaan, rencana panggilan seminggu, dan naskah untuk pengasuh. Bukan diagnosis.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
