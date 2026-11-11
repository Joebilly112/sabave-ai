import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Tidak ditemukan</p>
      <h1 className="mt-3 text-3xl font-semibold text-night">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Tautan hasil hanya hidup kalau ceknya pernah disimpan.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-night px-5 py-3 text-sm font-semibold text-bone">
        Kembali ke beranda
      </Link>
    </section>
  );
}
