import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>Magangworth · PT. Think Era Labs · magangworth.id</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/privasi" className="hover:text-pine">
            Privasi
          </Link>
          <Link href="/syarat" className="hover:text-pine">
            Syarat
          </Link>
          <Link href="/disclaimer" className="hover:text-pine">
            Disclaimer
          </Link>
          <Link href="/cookie" className="hover:text-pine">
            Cookie
          </Link>
        </nav>
      </div>
    </footer>
  );
}
