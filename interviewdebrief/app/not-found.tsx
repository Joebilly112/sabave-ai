import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Halaman ini tidak ada.</h1>
      <p className="mt-3 text-sm text-mute">Debrief yang kamu cari mungkin tautannya salah, atau belum pernah dibuat.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">
        Kembali ke beranda
      </Link>
    </section>
  );
}
