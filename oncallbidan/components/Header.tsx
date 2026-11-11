import Link from "next/link";
import { Moon } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-linen/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-night">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-night text-lamp">
            <Moon className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight">OnCallBidan</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-mist">
          <Link href="/#cek" className="hover:text-night">
            Cek jaga
          </Link>
          <Link href="/artikel" className="hover:text-night">
            Artikel
          </Link>
        </nav>
      </div>
    </header>
  );
}
