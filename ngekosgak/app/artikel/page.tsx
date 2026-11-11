import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan untuk komuter yang menimbang ngekos dekat kantor dan tetap pulang-pergi.",
};

export default function ArtikelIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">Artikel</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-soot">Sebelum membandingkan harga kamar</h1>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block rounded-2xl border border-mist bg-white p-5 hover:border-dawn">
              <p className="text-xs text-mute">
                {article.publishedAt} · {article.minutes} menit
              </p>
              <h2 className="mt-1 text-xl font-semibold text-soot">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
