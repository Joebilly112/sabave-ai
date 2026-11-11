import Link from "next/link";
import { Container } from "@/components/ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-[#f3ecdf]/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="h-2.5 w-2.5 rounded-full bg-lamp shadow-[0_0_12px_rgba(227,154,45,0.9)]" />
          RPP Cepet
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold text-mist">
          <Link href="/#mulai" className="hover:text-ink">
            Mulai
          </Link>
          <Link href="/artikel" className="hover:text-ink">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-ink">
            Tentang
          </Link>
        </nav>
      </Container>
    </header>
  );
}
