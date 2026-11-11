import Link from "next/link";
import { Container } from "@/components/ui";

const links = [
  ["/privasi", "Privasi"],
  ["/syarat", "Syarat"],
  ["/disclaimer", "Disclaimer"],
  ["/kontak", "Kontak"],
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line">
      <Container className="flex flex-col gap-4 py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>RPP Cepet · kerangka untuk malam sebelum mengajar.</p>
        <nav className="flex flex-wrap gap-4">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-ink">
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
