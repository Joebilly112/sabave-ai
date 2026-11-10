import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan musim lapor untuk freelancer: NPWP, omzet Rp500 juta, bukti potong, dan formulir 1770.",
};

export default function ArtikelIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">Artikel</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-pine">Sebelum linimasa Maret makin kencang</h1>
      <div className="mt-8 space-y-6">
        {articles.map((article) => (
          <article key={article.slug} className="border-b border-line pb-6">
            <p className="text-xs text-mute">
              {article.publishedAt} · {article.minutes} menit
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-pine">
              <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
