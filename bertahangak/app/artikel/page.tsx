import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan singkat soal paspor, gaji, libur, utang agensi, dan kapan menghubungi bantuan resmi.",
};

export default function ArtikelIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">Bacaan</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-sea">Sebelum kamu memutuskan diam</h1>
      <p className="mt-4 text-sm leading-7 text-mute">Lima catatan pendek. Semuanya mengarah ke bantuan resmi, bukan ke janji hukum.</p>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block rounded-3xl border border-line bg-white px-5 py-4 hover:bg-foam">
              <p className="text-lg font-semibold text-sea">{article.title}</p>
              <p className="mt-1 text-sm leading-6 text-mute">{article.description}</p>
              <p className="mt-2 text-xs text-tide">{article.minutes} menit baca</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
