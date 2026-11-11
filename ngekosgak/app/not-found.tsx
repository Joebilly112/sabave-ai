import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember">Tidak ketemu</p>
      <h1 className="mt-3 text-3xl font-semibold text-soot">Halaman atau putusan ini tidak ada.</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Tautan hasil hanya berlaku untuk isian yang baru saja disusun.</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-rail underline">
        Kembali ke beranda
      </Link>
    </div>
  );
}
