import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-mist/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-mute sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-semibold text-night">Capek di Jalan</p>
          <p className="mt-2 max-w-md leading-6">
            Informasi beban perjalanan untuk komuter. Bukan diagnosis, bukan surat sakit, dan bukan alat untuk menilai gaji.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/tentang">Tentang</Link>
          <Link href="/artikel">Artikel</Link>
          <Link href="/privasi">Privasi</Link>
          <Link href="/syarat">Syarat</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/cookie">Cookie</Link>
        </div>
      </div>
    </footer>
  );
}
