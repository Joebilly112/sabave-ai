import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-paper/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-grove">
          PraktikSiap
        </Link>
        <nav className="flex items-center gap-4 text-sm text-moss">
          <Link href="/#cek">Cek map</Link>
          <Link href="/artikel">Artikel</Link>
          <Link href="/tentang">Tentang</Link>
        </nav>
      </div>
    </header>
  );
}
