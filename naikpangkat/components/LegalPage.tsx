import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">NaikPangkat</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-ink/50">Diperbarui {updated}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-7 text-ink/80">{children}</div>
    </article>
  );
}
