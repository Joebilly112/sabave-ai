import Link from "next/link";

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-night">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-night text-xs text-bone">cd</span>
        Capek di Jalan
      </Link>
      <nav className="flex items-center gap-5 text-sm text-ink/80">
        <Link href="/artikel" className="hover:text-night">
          Artikel
        </Link>
        <Link href="/tentang" className="hover:text-night">
          Tentang
        </Link>
        <Link href="/#cek" className="rounded-full bg-night px-4 py-2 font-semibold text-bone">
          Cek beban
        </Link>
      </nav>
    </header>
  );
}
