import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "NaikPangkat — berkas yang masih kurang",
    template: "%s · NaikPangkat",
  },
  description: SITE.description,
  openGraph: {
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.className} bg-paper text-ink antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
