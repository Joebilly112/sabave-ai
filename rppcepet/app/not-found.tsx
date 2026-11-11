import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-extrabold">Halaman ini tidak ada.</h1>
      <p className="mt-4 max-w-lg text-mist">Kerangka yang kamu cari mungkin sudah tidak tersimpan, atau tautannya salah.</p>
      <div className="mt-8">
        <Button href="/">Kembali ke beranda</Button>
      </div>
    </Container>
  );
}
