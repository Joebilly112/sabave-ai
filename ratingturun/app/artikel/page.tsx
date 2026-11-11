import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan singkat tentang bintang yang merosot, batal seminggu, dan kalimat ke penumpang.",
};

export default function ArtikelIndexPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-asphalt">Artikel</h1>
      <p className="mt-3 text-sm leading-6 text-mute">Lima catatan sebelum membaca pita risiko.</p>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="rounded-[28px] border border-line bg-paper p-5">
            <Link href={`/artikel/${article.slug}`} className="text-lg font-semibold text-asphalt">
              {article.title}
            </Link>
            <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
            <p className="mt-2 text-xs text-road">{article.minutes} menit baca</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
