import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tentang",
  description: "CVtolak membaca CV yang tidak dibalas dan mengembalikan celah kata kunci, format, ringkasan, serta daftar simpan / potong / tambah.",
  path: "/tentang",
});

export default function TentangPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-tide">CVtolak</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Satu pertanyaan: kenapa lamaran ini senyap?</h1>
      <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink/90">
        <p>
          CVtolak dibuat PT. Think Era Labs untuk orang yang sudah mengirim CV berkali-kali dan tidak menerima balasan.
          Perasaannya spesifik: tidak terlihat. Produk ini hanya menjawab itu.
        </p>
        <p>
          Kamu menempel teks CV, peran yang dilamar, dan lama pengalaman. Setelah pembayaran Rp19.900, halaman hasil
          menunjukkan kata kunci peran yang hilang, tanda format yang sering bikin file dilewati, paragraf ringkasan
          yang ditulis ulang dari bahan yang sudah ada, dan daftar simpan / potong / tambah.
        </p>
        <p>
          Ini bukan janji wawancara, bukan penulis CV sewaan, dan bukan alat untuk membandingkan gaji. Angka di hasil
          adalah keterlihatan halaman terhadap peran itu, bukan nilai dirimu.
        </p>
        <p>
          Pembayaran memakai Midtrans (GoPay, QRIS, ShopeePay). Tanpa kunci pembayaran di server, audit tetap tersimpan
          tetapi detailnya tidak dibuka.
        </p>
      </div>
    </article>
  );
}
