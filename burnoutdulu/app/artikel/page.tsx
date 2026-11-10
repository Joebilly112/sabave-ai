import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Bacaan tentang jam, revisi, tidur, dan cara menjeda satu klien.",
};

export default function ArtikelPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-dusk">Artikel</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Lima bacaan tentang beban freelancer. Bukan nasihat medis.</p>
      <ul className="mt-8 space-y-6">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block">
              <p className="text-xs text-mute">
                {article.publishedAt} · {article.minutes} menit
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-dusk">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
