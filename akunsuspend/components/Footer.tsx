import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-night text-foam/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>AkunSuspend · informasi banding mitra, bukan keputusan platform.</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/tentang" className="hover:text-hazard">
            Tentang
          </Link>
          <Link href="/artikel" className="hover:text-hazard">
            Artikel
          </Link>
          <Link href="/privasi" className="hover:text-hazard">
            Privasi
          </Link>
          <Link href="/syarat" className="hover:text-hazard">
            Syarat
          </Link>
          <Link href="/disclaimer" className="hover:text-hazard">
            Disclaimer
          </Link>
          <Link href="/cookie" className="hover:text-hazard">
            Cookie
          </Link>
        </nav>
      </div>
    </footer>
  );
}
