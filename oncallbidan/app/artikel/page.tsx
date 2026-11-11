import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan singkat tentang jaga malam bidan, cadangan, dan batas ke pasien.",
};

export default function ArtikelIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-night">Artikel</h1>
      <p className="mt-3 text-sm leading-6 text-mist">Lima catatan sebelum malam berikutnya menumpuk di atas yang belum pulih.</p>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="rounded-[28px] border border-line bg-card p-5">
            <Link href={`/artikel/${article.slug}`} className="text-lg font-semibold text-night">
              {article.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-mist">{article.description}</p>
            <p className="mt-2 text-xs text-clay">{article.minutes} menit baca</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
