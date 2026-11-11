import Link from "next/link";
import { TrackView } from "@/components/TrackView";
import { Container } from "@/components/ui";
import { ARTICLES } from "@/lib/articles";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Artikel",
  description: "Catatan singkat soal berkas kenaikan pangkat, SKP, PPPK, dan kalender April serta Oktober.",
  path: "/artikel",
});

export default function ArtikelIndexPage() {
  return (
    <>
      <TrackView path="/artikel" />
      <Container className="max-w-3xl py-14">
        <h1 className="text-4xl font-extrabold tracking-tight">Artikel</h1>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Bacaan pendamping. Bukan edaran, dan bukan pengganti daftar berkas yang disusun dari data Anda.
        </p>
        <ul className="mt-8 space-y-4">
          {ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link href={`/artikel/${article.slug}`} className="block rounded-3xl bg-white px-5 py-4 hover:bg-white/80">
                <p className="text-lg font-extrabold">{article.title}</p>
                <p className="mt-1 text-sm leading-6 text-ink/65">{article.description}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink/40">
                  {article.minutes} menit
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
