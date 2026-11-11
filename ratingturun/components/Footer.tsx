import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl px-5 pb-10">
      <div className="flex flex-col gap-4 border-t border-line pt-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>RatingTurun · bacaan risiko bintang untuk mitra ojek. Bukan jaminan platform.</p>
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
