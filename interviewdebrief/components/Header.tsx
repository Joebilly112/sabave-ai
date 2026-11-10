import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-xs text-paper">ID</span>
          InterviewDebrief
        </Link>
        <nav className="flex items-center gap-5 text-sm text-mute">
          <Link href="/artikel" className="hover:text-ink">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-ink">
            Tentang
          </Link>
          <Link href="/#mulai" className="rounded-full bg-ink px-3 py-1.5 font-semibold text-paper hover:bg-moss">
            Debrief
          </Link>
        </nav>
      </div>
    </header>
  );
}
