import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-extrabold text-ink">Halaman tidak ada</h1>
      <p className="mt-3 max-w-lg text-mist">Kode hasil tidak ditemukan, atau lembarnya belum tersimpan.</p>
      <div className="mt-6">
        <Button href="/">Kembali ke beranda</Button>
      </div>
    </Container>
  );
}
