import Link from "next/link";
import { articles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Artikel",
  description: "Catatan tentang CV yang tidak dibalas, kata kunci yang hilang, ringkasan enam detik, dan format yang pecah.",
  path: "/artikel",
});

export default function ArtikelPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Catatan</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Lamaran yang senyap, dibaca pelan-pelan</h1>
      <ul className="mt-10 space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="border-t border-line pt-6">
            <p className="text-xs text-mute">
              {article.publishedAt} · {article.readingMinutes} menit
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              <Link href={`/artikel/${article.slug}`} className="hover:text-tide">
                {article.title}
              </Link>
            </h2>
            <p className="mt-2 leading-relaxed text-mute">{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
