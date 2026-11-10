import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Tidak ada</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Halaman ini tidak ketemu</h1>
      <p className="mt-3 text-mute">Audit yang tersimpan tetap ada di tautan hasilnya. Mulai lagi dari beranda kalau tautannya salah.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">
        Kembali
      </Link>
    </div>
  );
}
