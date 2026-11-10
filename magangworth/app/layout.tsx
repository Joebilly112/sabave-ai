import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AnalyticsBeacon } from "@/components/AnalyticsBeacon";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { absolute: site.title },
  description: site.description,
  applicationName: site.name,
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} font-sans text-ink antialiased`}>
        <AnalyticsBeacon />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
