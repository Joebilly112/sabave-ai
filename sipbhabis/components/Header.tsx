import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-night">
          Sipb<span className="text-stamp">Habis</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-plum">
          <Link href="/#cek">Hitung</Link>
          <Link href="/artikel">Artikel</Link>
          <Link href="/tentang">Tentang</Link>
        </nav>
      </div>
    </header>
  );
}
