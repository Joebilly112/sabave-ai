import Link from "next/link";
import { articles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artikel Magangworth",
  description: "Catatan tentang magang yang habis di operasional, artefak yang layak diminta, dan cara bicara ke pembimbing.",
  path: "/artikel",
});

export default function ArtikelIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-pine">Artikel</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Lima catatan sebelum kamu mengunci satu semester.</p>
      <ul className="mt-8 space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="border-b border-line pb-6">
            <Link href={`/artikel/${article.slug}`} className="text-xl font-semibold text-pine hover:text-clay">
              {article.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-ink/80">{article.description}</p>
            <p className="mt-2 text-xs text-mute">
              {article.publishedAt} · {article.readingMinutes} menit
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
