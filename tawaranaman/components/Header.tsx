import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-sand/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-deep">
          TawaranAman
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-ink">
          <Link href="/#cek" className="hover:text-sea">
            Cek tawaran
          </Link>
          <Link href="/artikel" className="hover:text-sea">
            Artikel
          </Link>
          <Link href="/tentang" className="hidden hover:text-sea sm:inline">
            Tentang
          </Link>
        </nav>
      </div>
    </header>
  );
}
