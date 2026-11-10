import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>PajakKuGak · PT. Think Era Labs · Bukan layanan DJP dan bukan nasihat pajak.</p>
        <div className="flex flex-wrap gap-4">
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
