import Link from "next/link";
import { Star } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="flex items-center gap-2 text-asphalt">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-asphalt text-star">
          <Star size={16} fill="currentColor" />
        </span>
        <span className="text-sm font-semibold tracking-tight">RatingTurun</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm text-road">
        <Link href="/artikel">Artikel</Link>
        <Link href="/tentang">Tentang</Link>
        <Link href="/#cek" className="rounded-full bg-asphalt px-4 py-2 text-sand">
          Cek pita
        </Link>
      </nav>
    </header>
  );
}
