"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, TextArea, TextInput } from "@/components/ui";

const SAMPLE_CV = `Raka Putra
raka.putra@email.com · 081234567890

Tujuan karir
Saya individu yang berkomitmen dan mencari kesempatan untuk berkembang.

Pengalaman
Staf operasional, Toko Kawan · Jakarta
2023 — sekarang
Membantu membuat laporan Excel mingguan untuk 4 cabang.
Saya juga mengatur jadwal shift dan menjawab pertanyaan pelanggan.

Pendidikan
S1 Manajemen, Universitas Contoh, 2022

Keahlian
Microsoft Office, komunikasi, kerja tim
Hobi: traveling
Pas foto terlampir.`;

export function ScanForm() {
  const router = useRouter();
  const [cvText, setCvText] = useState("");
  const [role, setRole] = useState("");
  const [years, setYears] = useState("1");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, role, years: Number(years) }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Audit gagal diproses. Coba lagi sebentar.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "scan_submit", path: "/" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Jaringan terputus sebelum audit tersimpan.");
      setPending(false);
    }
  }

  return (
    <form id="audit" onSubmit={onSubmit} className="mx-auto max-w-3xl rounded-[28px] border border-line bg-card p-5 shadow-card sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Tempel CV yang tidak dibalas</h2>
        <p className="mt-2 text-sm leading-relaxed text-mute">
          Satu peran saja. Hasilnya celah kata kunci, tanda format, ringkasan baru, dan daftar simpan / potong / tambah.
        </p>
      </div>
      <div className="space-y-5">
        <Field label="Isi CV" hint="Salin dari PDF atau dokumen. Heading dan bullet boleh tetap.">
          <TextArea
            name="cvText"
            required
            value={cvText}
            onChange={(event) => setCvText(event.target.value)}
            placeholder="Nama, kontak, pengalaman, pendidikan, keahlian…"
            maxLength={8000}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-[1.4fr_0.6fr]">
          <Field label="Peran yang dilamar" hint="Contoh: Analis Data, Frontend Engineer, Staf Keuangan.">
            <TextInput
              name="role"
              required
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Analis Data"
              maxLength={80}
            />
          </Field>
          <Field label="Tahun pengalaman" hint="Isi 0 kalau baru lulus.">
            <TextInput
              name="years"
              type="number"
              min={0}
              max={40}
              required
              value={years}
              onChange={(event) => setYears(event.target.value)}
            />
          </Field>
        </div>
        {error ? <p className="text-sm font-medium text-signal">{error}</p> : null}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Membaca halaman…" : "Buat audit · Rp19.900"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setCvText(SAMPLE_CV);
              setRole("Analis Data");
              setYears("1");
            }}
          >
            Isi contoh
          </Button>
        </div>
      </div>
    </form>
  );
}
