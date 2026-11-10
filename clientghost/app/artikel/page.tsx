import type { Metadata } from "next";
import Link from "next/link";
import { Panel } from "@/components/ui";
import { articles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Artikel",
  description: "Catatan singkat soal DP, kontrak minimum, revisi, chat tengah malam, dan janji exposure.",
  alternates: { canonical: absoluteUrl("/artikel") },
};

export default function ArtikelPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flare">Artikel</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-night">Sebelum kamu membalas “boleh, saya kerjakan”.</h1>
      <div className="mt-8 space-y-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/artikel/${article.slug}`} className="block">
            <Panel className="p-5">
              <p className="text-xs text-mute">
                {article.publishedAt} · {article.minutes} menit
              </p>
              <h2 className="mt-2 text-xl font-semibold text-night">{article.title}</h2>
              <p className="mt-2 text-sm leading-6 text-mute">{article.description}</p>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
