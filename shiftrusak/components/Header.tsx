import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-ward text-mist">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          ShiftRusak
        </Link>
        <nav className="flex items-center gap-4 text-sm text-mist/80">
          <Link href="/artikel" className="hover:text-lamp">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-lamp">
            Tentang
          </Link>
        </nav>
      </div>
    </header>
  );
}
