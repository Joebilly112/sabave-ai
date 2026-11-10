import Link from "next/link";
import { Flame } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-cream/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-dusk">
          <Flame className="h-5 w-5 text-ember" aria-hidden />
          <span className="text-sm font-semibold tracking-tight">BurnoutDulu</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-mute">
          <Link href="/artikel" className="hover:text-dusk">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-dusk">
            Tentang
          </Link>
          <Link href="/#cek" className="rounded-full bg-dusk px-3 py-1.5 text-xs font-semibold text-cream">
            Cek pita
          </Link>
        </nav>
      </div>
    </header>
  );
}
