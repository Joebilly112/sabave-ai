import Link from "next/link";
import { Container } from "./ui";

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm font-extrabold text-paper">N</span>
          <span className="text-sm font-extrabold tracking-tight">NaikPangkat</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-ink/70">
          <Link href="/#mulai" className="hover:text-ink">
            Cek berkas
          </Link>
          <Link href="/artikel" className="hidden hover:text-ink sm:inline">
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

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10">
      <Container className="grid gap-8 py-10 sm:grid-cols-2">
        <div>
          <p className="text-sm font-extrabold">NaikPangkat</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-ink/60">
            Daftar berkas kenaikan pangkat untuk satu orang, sekali bayar. Bukan keputusan BKD dan bukan urusan gaji.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/70 sm:justify-end">
          <Link href="/artikel">Artikel</Link>
          <Link href="/tentang">Tentang</Link>
          <Link href="/privasi">Privasi</Link>
          <Link href="/syarat">Syarat</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/kontak">Kontak</Link>
        </div>
      </Container>
    </footer>
  );
}
