export const site = {
  name: "Capek di Jalan",
  domain: "capekdijalan.id",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://capekdijalan.web.app",
  title: "Perjalanan ke kantor ini bikin kamu kelelahan?",
  description:
    "Skor beban perjalanan sekali jalan: ringan, berat, atau bahaya. Sekali bayar Rp12.900 untuk jam setahun di jalan, tiga beban terbesar, dan rencana 14 hari. Informasi kesejahteraan, bukan diagnosis dan bukan alat gaji.",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
