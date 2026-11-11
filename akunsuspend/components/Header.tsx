import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-night/95 text-foam backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-3 w-3 rounded-sm bg-hazard" aria-hidden />
          AkunSuspend
        </Link>
        <nav className="flex items-center gap-5 text-sm text-foam/80">
          <Link href="/artikel" className="hover:text-hazard">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-hazard">
            Tentang
          </Link>
          <Link href="/#cek" className="rounded-full bg-hazard px-3 py-1.5 font-semibold text-night hover:bg-white">
            Cek akun
          </Link>
        </nav>
      </div>
    </header>
  );
}
