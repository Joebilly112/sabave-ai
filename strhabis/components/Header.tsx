import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-paper/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-seal">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-stamp text-[10px] font-bold tracking-wide text-stamp">
            STR
          </span>
          <span className="text-lg font-semibold tracking-tight">STRHabis</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-mute">
          <Link href="/#cek" className="hover:text-seal">
            Cek tanggal
          </Link>
          <Link href="/artikel" className="hover:text-seal">
            Artikel
          </Link>
        </nav>
      </div>
    </header>
  );
}
