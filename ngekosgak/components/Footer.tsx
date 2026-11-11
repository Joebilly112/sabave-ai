import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} PT. Think Era Labs · NgekosGak</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privasi" className="hover:text-soot">
            Privasi
          </Link>
          <Link href="/syarat" className="hover:text-soot">
            Syarat
          </Link>
          <Link href="/disclaimer" className="hover:text-soot">
            Disclaimer
          </Link>
          <Link href="/cookie" className="hover:text-soot">
            Cookie
          </Link>
        </nav>
      </div>
    </footer>
  );
}
