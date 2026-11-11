import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-linen">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-mist md:flex-row md:items-center md:justify-between">
        <p>OnCallBidan menyusun jeda jaga. Keputusan klinis tetap di kamu dan faskes, bukan di pita ini.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/tentang">Tentang</Link>
          <Link href="/artikel">Artikel</Link>
          <Link href="/privasi">Privasi</Link>
          <Link href="/syarat">Syarat</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/cookie">Cookie</Link>
        </nav>
      </div>
    </footer>
  );
}
