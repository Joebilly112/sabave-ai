import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-sand/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-pine">
          <span className="flex h-8 w-8 items-center justify-center gap-0.5 rounded-md bg-pine">
            <span className="h-2 w-2 rounded-full bg-ember" />
            <span className="h-2 w-2 rounded-full bg-amber" />
            <span className="h-2 w-2 rounded-full bg-moss" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Magangworth</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-semibold text-pine">
          <Link href="/artikel" className="hover:text-clay">
            Artikel
          </Link>
          <Link href="/tentang" className="hover:text-clay">
            Tentang
          </Link>
        </nav>
      </div>
    </header>
  );
}
