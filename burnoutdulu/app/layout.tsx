import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteUrl, site } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · BurnoutDulu",
  },
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: "BurnoutDulu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [absoluteUrl("/og.png")],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <AnalyticsBeacon />
      </body>
    </html>
  );
}
