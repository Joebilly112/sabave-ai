export const site = {
  name: "ClientGhost",
  domain: "clientghost.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://clientghost.web.app",
  title: "ClientGhost — apakah klien ini akan menghilang sebelum bayar?",
  description:
    "Cek risiko klien freelance menghilang sebelum transfer. Sekali bayar Rp19.900 untuk skor hantu, checklist kontrak minimum, dan pesan minta DP sebelum kickoff.",
};

export function absoluteUrl(path: string): string {
  const base = site.url.replace(/\/$/, "");
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
