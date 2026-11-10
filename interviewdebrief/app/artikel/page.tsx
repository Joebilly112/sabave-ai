import Link from "next/link";
import { articles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artikel",
  description: "Catatan singkat tentang spiral setelah interview, pertanyaan balik, dan follow-up 48 jam.",
  path: "/artikel",
});

export default function ArticleIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Artikel</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Sesudah wawancaranya selesai.</h1>
      <div className="mt-8 divide-y divide-line">
        {articles.map((article) => (
          <article key={article.slug} className="py-6">
            <p className="text-xs text-mute">
              {article.publishedAt} · {article.readingMinutes} menit
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              <Link href={`/artikel/${article.slug}`} className="hover:text-moss">
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-mute">{article.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
