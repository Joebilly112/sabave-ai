import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan singkat soal banding akun mitra yang kena suspend, tanpa janji akun nyala.",
};

export default function ArtikelPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flare">Catatan</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Artikel</h1>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block rounded-3xl border border-line bg-paper p-5 hover:border-hazard">
              <p className="text-xs text-mist">
                {article.publishedAt} · {article.minutes} menit
              </p>
              <h2 className="mt-2 text-xl font-semibold text-night">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mist">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
