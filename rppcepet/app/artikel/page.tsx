import Link from "next/link";
import { Container } from "@/components/ui";
import { ARTICLES } from "@/lib/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Artikel RPP Cepet",
  description: "Catatan singkat untuk guru yang menyusun rencana pelajaran di malam hari.",
  path: "/artikel",
});

export default function ArtikelPage() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-extrabold tracking-tight">Artikel</h1>
      <p className="mt-3 max-w-2xl text-mist">Lima catatan tentang menyusun satu pertemuan tanpa begadang.</p>
      <ul className="mt-10 grid gap-4">
        {ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="block rounded-3xl border border-line bg-sheet px-5 py-5 hover:border-pine/40">
              <p className="text-xs font-semibold uppercase tracking-wider text-pine">
                {article.published} · {article.minutes} menit baca
              </p>
              <h2 className="mt-2 text-xl font-extrabold">{article.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
