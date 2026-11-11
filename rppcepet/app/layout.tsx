import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE, pageMetadata, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata({
    title: "RPP Cepet — kerangka pelajaran sebelum tidur",
    description: SITE.description,
    path: "/",
  }),
  metadataBase: new URL(SITE.url),
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.className} ${jakarta.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <AnalyticsBeacon />
      </body>
    </html>
  );
}
