import Link from "next/link";
import { Stamp } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper">
          <Stamp size={16} />
        </span>
        CVtolak
      </Link>
      <nav className="flex items-center gap-5 text-sm font-medium text-mute">
        <Link href="/artikel" className="hover:text-ink">
          Artikel
        </Link>
        <Link href="/tentang" className="hover:text-ink">
          Tentang
        </Link>
        <Link href="/#audit" className="rounded-full bg-ink px-4 py-2 text-paper hover:bg-signal">
          Audit CV
        </Link>
      </nav>
    </header>
  );
}
