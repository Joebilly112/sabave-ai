import Link from "next/link";
import { Ticket } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-mist/80 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-soot">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-soot text-dawn">
            <Ticket size={18} aria-hidden />
          </span>
          NgekosGak
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-rail">
          <Link href="/artikel" className="hover:text-soot">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-soot">
            Tentang
          </Link>
        </nav>
      </div>
    </header>
  );
}
