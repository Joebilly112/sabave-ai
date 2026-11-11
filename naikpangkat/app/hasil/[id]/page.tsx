import { HasilView } from "@/components/HasilView";
import { Container } from "@/components/ui";
import { getHasil, storageConfigured, toPublicHasil } from "@/lib/hasil";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta({
  title: "Daftar berkas Anda",
  description: "Hasil daftar berkas kenaikan pangkat.",
  path: "/hasil",
  noindex: true,
});

export default async function HasilPage({ params }: { params: { id: string } }) {
  const configured = storageConfigured();
  const record = configured ? await getHasil(params.id) : null;
  const initial = toPublicHasil(record, configured);
  return (
    <Container className="max-w-4xl py-12">
      <h1 className="mb-6 text-3xl font-extrabold tracking-tight">Daftar berkas Anda</h1>
      <HasilView id={params.id} initial={initial} />
    </Container>
  );
}
