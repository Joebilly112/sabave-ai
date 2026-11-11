import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan tentang jam di jalan, berdiri, tidur, dan permintaan ke kantor yang bukan tentang gaji.",
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArtikelPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">Artikel</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Membaca beban perjalanan pelan-pelan</h1>
      <p className="mt-4 text-sm leading-6 text-mute">Lima catatan. Semuanya informasi kesejahteraan, bukan pemeriksaan kesehatan.</p>
      <ul className="mt-8 space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block rounded-3xl border border-mist bg-paper px-5 py-4 hover:border-indigo/40">
              <p className="text-xs text-mute">
                {formatDate(article.publishedAt)} · {article.minutes} menit
              </p>
              <h2 className="mt-1 text-xl font-semibold text-night">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/80">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
