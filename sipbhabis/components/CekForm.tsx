"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";

const initial = {
  strbIssued: "2023-04-18",
  strbExpiry: "2028-04-18",
  sipbCount: "1",
  workplace: "fasilitas",
  skp: "12",
};

export function CekForm() {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function set<K extends keyof typeof initial>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sipbCount: Number(form.sipbCount),
          skp: Number(form.skp),
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa dibaca.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "cek_submit", path: "/" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Koneksi terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form className="grid gap-5 sm:grid-cols-2" onSubmit={onSubmit}>
        <Field label="Tanggal terbit STRB" hint="Sesuai yang tertulis di kartu, bukan perkiraan.">
          <TextInput type="date" value={form.strbIssued} required onChange={(event) => set("strbIssued", event.target.value)} />
        </Field>
        <Field label="Tanggal habis STRB">
          <TextInput type="date" value={form.strbExpiry} required onChange={(event) => set("strbExpiry", event.target.value)} />
        </Field>
        <Field label="Jumlah SIPB yang dipegang" hint="Satu atau dua tempat izin.">
          <SelectInput value={form.sipbCount} onChange={(event) => set("sipbCount", event.target.value)}>
            <option value="1">Satu SIPB</option>
            <option value="2">Dua SIPB</option>
          </SelectInput>
        </Field>
        <Field label="Jenis tempat praktik">
          <SelectInput value={form.workplace} onChange={(event) => set("workplace", event.target.value)}>
            <option value="fasilitas">Fasilitas pelayanan kesehatan</option>
            <option value="mandiri">Praktik mandiri</option>
          </SelectInput>
        </Field>
        <Field label="Kredit kompetensi yang sudah terkumpul" hint="Angka bulat 0–200. Patokan perencanaan di hasil adalah 25, bukan kuota resmi.">
          <TextInput
            inputMode="numeric"
            min={0}
            max={200}
            value={form.skp}
            required
            onChange={(event) => set("skp", event.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Menghitung sisa hari..." : "Susun hitung mundur"}
          </Button>
          {error ? <p className="mt-3 text-sm text-stamp">{error}</p> : null}
          <p className="mt-3 text-xs leading-5 text-mute">
            Hasil terkunci sampai pembayaran. Ini informasi persiapan. Keputusan izin ada pada dinas, konsil, dan aturan
            yang sedang berlaku.
          </p>
        </div>
      </form>
    </Panel>
  );
}
