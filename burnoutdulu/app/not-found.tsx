import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-20">
      <h1 className="text-3xl font-semibold text-dusk">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Pita yang kamu cari mungkin salah tautan, atau belum pernah disimpan.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-ember">
        Kembali ke beranda
      </Link>
    </section>
  );
}
