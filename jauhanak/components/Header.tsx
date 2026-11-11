import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-night">
          JauhAnak
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-ink">
          <Link href="/#cek" className="hover:text-dusk">
            Cek kedekatan
          </Link>
          <Link href="/artikel" className="hover:text-dusk">
            Artikel
          </Link>
          <Link href="/tentang" className="hidden hover:text-dusk sm:inline">
            Tentang
          </Link>
        </nav>
      </div>
    </header>
  );
}
