import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: "Batasan Pelatihan Mana.",
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        Urutan pelatihan adalah bantuan memutuskan berdasarkan jawabanmu, bukan saran klinis, bukan akreditasi, dan bukan posisi resmi organisasi profesi atau rumah sakit.
      </p>
      <p>
        Biaya waktu adalah perkiraan kasar agar kamu bisa membandingkan beban cuti. Harga kursus di kotamu bisa berbeda. Nama pelatihan generik, bukan merek penyelenggara tertentu.
      </p>
      <p>Jangan memakai hasil ini untuk menunda pertolongan medis atau untuk mengambil tindakan di luar kewenangan klinismu.</p>
    </LegalPage>
  );
}
