import Link from "next/link";
import { Container } from "@/components/ui";

export function SiteHeader() {
  return (
    <header className="border-b border-line/80 bg-card/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-seal text-xs text-seal">PS</span>
          PPG Siap
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold text-mist">
          <Link href="/artikel" className="hover:text-ink">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-ink">
            Tentang
          </Link>
          <Link href="/#periksa" className="rounded-full bg-ink px-4 py-2 text-card hover:bg-black">
            Periksa slot
          </Link>
        </nav>
      </Container>
    </header>
  );
}
