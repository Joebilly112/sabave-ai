import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <h1 className="text-3xl font-semibold text-pine">Halaman ini tidak ada</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Tautan mungkin sudah berganti. Kembali ke beranda untuk menilai magang.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-semibold text-clay">
        Ke beranda
      </Link>
    </div>
  );
}
