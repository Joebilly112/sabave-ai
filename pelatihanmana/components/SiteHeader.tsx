import Link from "next/link";
import { Container } from "@/components/ui";

export function SiteHeader() {
  return (
    <header className="border-b border-white/5">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-extrabold tracking-tight text-paper">
          Pelatihan Mana
        </Link>
        <nav className="flex items-center gap-5 text-sm text-mist">
          <Link href="/artikel" className="hover:text-paper">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-paper">
            Tentang
          </Link>
          <Link
            href="/#pilih"
            className="rounded-full bg-lime px-3 py-1.5 text-xs font-bold text-ink hover:bg-[#e4ff7a]"
          >
            Susun giliran
          </Link>
        </nav>
      </Container>
    </header>
  );
}
