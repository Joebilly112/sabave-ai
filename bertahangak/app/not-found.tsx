import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold text-sea">Halaman tidak ada</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Tautan hasil mungkin salah, atau laporannya belum tersimpan.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-sea px-5 py-3 text-sm font-semibold text-sand">
        Kembali ke beranda
      </Link>
    </div>
  );
}
