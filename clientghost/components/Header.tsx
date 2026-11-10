import Link from "next/link";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <Link href="/" className="text-sm font-semibold tracking-tight text-night">
        ClientGhost
      </Link>
      <nav className="flex items-center gap-5 text-sm text-mute">
        <Link href="/#cek" className="hover:text-night">
          Cek brief
        </Link>
        <Link href="/artikel" className="hover:text-night">
          Artikel
        </Link>
        <Link href="/tentang" className="hover:text-night">
          Tentang
        </Link>
      </nav>
    </header>
  );
}
