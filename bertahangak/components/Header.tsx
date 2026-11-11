import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-sea">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-sea text-sm font-semibold text-sand">Bg</span>
          <span className="text-lg font-semibold tracking-tight">BertahanGak</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-tide">
          <Link href="/artikel" className="hover:text-sea">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-sea">
            Tentang
          </Link>
          <a href="/#bantuan" className="rounded-full bg-sea px-3 py-2 text-sand">
            Bantuan resmi
          </a>
        </nav>
      </div>
    </header>
  );
}
