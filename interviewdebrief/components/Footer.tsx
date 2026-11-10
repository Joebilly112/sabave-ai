import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-mute md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-semibold text-ink">InterviewDebrief</p>
          <p className="mt-1 max-w-md leading-relaxed">
            Satu pertanyaan: tadi interview-nya hancur, atau cuma terasa hancur? Bukan alat gaji. Bukan latihan sebelum wawancara.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privasi" className="hover:text-ink">Privasi</Link>
          <Link href="/syarat" className="hover:text-ink">Syarat</Link>
          <Link href="/disclaimer" className="hover:text-ink">Disclaimer</Link>
          <Link href="/cookie" className="hover:text-ink">Cookie</Link>
        </div>
      </div>
    </footer>
  );
}
