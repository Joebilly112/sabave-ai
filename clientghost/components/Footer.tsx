import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>ClientGhost · cek risiko klien menghilang sebelum bayar.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/tentang" className="hover:text-night">
            Tentang
          </Link>
          <Link href="/privasi" className="hover:text-night">
            Privasi
          </Link>
          <Link href="/syarat" className="hover:text-night">
            Syarat
          </Link>
          <Link href="/disclaimer" className="hover:text-night">
            Disclaimer
          </Link>
          <Link href="/cookie" className="hover:text-night">
            Cookie
          </Link>
        </nav>
      </div>
    </footer>
  );
}
