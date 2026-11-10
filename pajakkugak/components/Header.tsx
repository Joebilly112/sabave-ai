import Link from "next/link";

export function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="flex items-center gap-2 text-pine">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-pine text-xs font-bold text-paper">PK</span>
        <span className="text-lg font-semibold tracking-tight">PajakKuGak</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm font-medium text-mute">
        <Link href="/artikel" className="hover:text-pine">
          Artikel
        </Link>
        <Link href="/tentang" className="hover:text-pine">
          Tentang
        </Link>
        <Link href="/#cek" className="rounded-full bg-stamp px-3 py-1.5 text-paper hover:opacity-90">
          Cek musim lapor
        </Link>
      </nav>
    </header>
  );
}
