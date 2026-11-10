import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>ShiftRusak untuk perawat. Bukan nasihat medis dan bukan alat gaji.</p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
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
