import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Syarat",
  description: "Syarat pakai audit CV sekali bayar CVtolak.",
  path: "/syarat",
  noindex: true,
});

export default function SyaratPage() {
  return (
    <LegalPage title="Syarat penggunaan" updated="10 November 2026">
      <p>
        Dengan mengirim CV ke CVtolak kamu setuju bahwa layanan ini memberi bacaan sekali bayar sebesar Rp19.900, bukan
        kontrak kerja, bukan jaminan dipanggil, dan bukan pengganti rekruter manusia.
      </p>
      <p>
        Kamu menyatakan teks yang ditempel adalah milikmu atau kamu berhak memakainya. Jangan mengirim data orang lain
        tanpa izin mereka. Hasil boleh kamu pakai untuk memperbaiki CV sendiri. Menjual ulang halaman hasil sebagai jasa
        audit tidak diizinkan.
      </p>
      <p>
        Pembayaran yang sudah berhasil membuka hasil untuk tautan itu. Karena hasil disusun langsung dari teks yang kamu
        kirim, pengembalian dana tidak otomatis setelah halaman terbuka. Gangguan pembayaran yang tidak menghasilkan
        status lunas tidak membuka hasil.
      </p>
      <p>Layanan dapat dihentikan sewaktu-waktu untuk pemeliharaan. Hukum yang berlaku adalah hukum Indonesia.</p>
    </LegalPage>
  );
}
