import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { ARTICLES, getArticle } from "@/lib/articles";
import { SITE, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticle(params.slug);
  if (!article) return pageMetadata({ title: "Artikel tidak ditemukan", noindex: true });
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/artikel/${article.slug}`,
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    inLanguage: "id",
    description: article.description,
    mainEntityOfPage: `${SITE.url}/artikel/${article.slug}`,
    author: { "@type": "Organization", name: SITE.name },
  };

  return (
    <Container className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.14em] text-mist">
          {article.date} · {article.readingMinutes} menit baca
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-paper">{article.title}</h1>
        <p className="mt-4 text-lg text-mist">{article.description}</p>
        <div className="mt-10 space-y-8">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-paper">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-3 leading-relaxed text-mist">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-12">
          <Link href="/#pilih" className="font-semibold text-lime">
            Susun tiga pelatihan berikutnya
          </Link>
        </p>
      </article>
    </Container>
  );
}
