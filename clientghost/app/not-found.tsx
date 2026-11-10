import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flare">Tidak ketemu</p>
      <h1 className="mt-3 text-4xl font-semibold text-night">Halaman ini tidak ada.</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Brief yang kamu cari mungkin salah tautan, atau belum pernah disimpan.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-night px-5 py-3 text-sm font-semibold text-fog">
        Kembali ke beranda
      </Link>
    </div>
  );
}
