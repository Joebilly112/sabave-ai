"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { COMPANY_OPTIONS, PAY_OPTIONS, SUPERVISOR_OPTIONS } from "@/lib/labels";
import { formatIdr, UNLOCK_PRICE_IDR } from "@/lib/price";
import { Button, Field, Select, TextArea, TextInput } from "@/components/ui";

export function NilaiForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const body = {
      companyType: form.get("companyType"),
      role: form.get("role"),
      pay: form.get("pay"),
      durationWeeks: Number(form.get("durationWeeks")),
      tasks: form.get("tasks"),
      supervisor: form.get("supervisor"),
    };

    try {
      const response = await fetch("/api/nilai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Hasil belum bisa dibuat.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "nilai_submit", path: "/" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Koneksi terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl rounded-2xl border border-line bg-white/80 p-5 shadow-desk sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-pine">Ceritakan magangnya</h2>
          <p className="mt-1 text-sm text-mute">Enam isian. Lampu dihitung di server, bukan di brosur lowongan.</p>
        </div>
        <p className="text-sm font-semibold text-clay">Unlock {formatIdr(UNLOCK_PRICE_IDR)}</p>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Jenis kantor">
          <Select name="companyType" required defaultValue="startup">
            {COMPANY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Peran" hint="Contoh: asisten riset, desainer magang, staf konten.">
          <TextInput name="role" required minLength={3} maxLength={80} placeholder="Asisten riset lapangan" />
        </Field>
        <Field label="Status bayar" hint="Konteks waktu, bukan perbandingan gaji.">
          <Select name="pay" required defaultValue="unpaid">
            {PAY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Durasi (minggu)">
          <TextInput name="durationWeeks" type="number" required min={1} max={52} defaultValue={12} />
        </Field>
        <Field label="Akses pembimbing" hint="Seberapa sering ada orang yang meninjau kerjaanmu.">
          <Select name="supervisor" required defaultValue="occasional">
            {SUPERVISOR_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Tugas harian" hint="Tulis yang benar-benar akan kamu lakukan, termasuk fotokopi kalau itu bagiannya.">
            <TextArea
              name="tasks"
              required
              minLength={24}
              maxLength={1500}
              placeholder="Pagi fotokopi berkas, siang input absensi, sesekali ikut kunjungan lapangan tanpa catatan yang harus dikumpulkan."
            />
          </Field>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm font-medium text-ember">{error}</p> : null}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" variant="clay" disabled={pending}>
          {pending ? "Menghitung lampu…" : "Lihat pratinjau hasil"}
        </Button>
        <p className="text-xs leading-5 text-mute">Lampu, daftar minggu pertama, dan skripnya terkunci sampai pembayaran selesai.</p>
      </div>
    </form>
  );
}
