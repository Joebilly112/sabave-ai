"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput } from "@/components/ui";

const initial = {
  years: "4",
  workplace: "puskesmas",
  strb: "aktif",
  sipb: "aktif_lain",
  place: "sewa",
  gear: "sebagian",
  waste: "belum",
  ibi: "proses",
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
        body: JSON.stringify({ ...form, years: Number(form.years) }),
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
        <Field label="Lama praktik sebagai bidan" hint="Tahun penuh, 0 sampai 45.">
          <SelectInput value={form.years} onChange={(event) => set("years", event.target.value)}>
            {Array.from({ length: 46 }, (_, year) => (
              <option key={year} value={year}>
                {year} tahun
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Tempat kerja sekarang">
          <SelectInput value={form.workplace} onChange={(event) => set("workplace", event.target.value)}>
            <option value="puskesmas">Puskesmas</option>
            <option value="rs">Rumah sakit</option>
            <option value="klinik">Klinik</option>
            <option value="belum">Belum ada</option>
          </SelectInput>
        </Field>
        <Field label="Status STRB">
          <SelectInput value={form.strb} onChange={(event) => set("strb", event.target.value)}>
            <option value="aktif">Masih aktif</option>
            <option value="proses">Sedang diperpanjang</option>
            <option value="belum">Belum ada atau tidak aktif</option>
          </SelectInput>
        </Field>
        <Field label="Status SIPB" hint="Izin di tempat lama tidak otomatis pindah.">
          <SelectInput value={form.sipb} onChange={(event) => set("sipb", event.target.value)}>
            <option value="aktif_lain">Aktif di tempat lain</option>
            <option value="belum">Belum punya</option>
            <option value="habis">Sudah habis</option>
          </SelectInput>
        </Field>
        <Field label="Tempat praktik yang dituju">
          <SelectInput value={form.place} onChange={(event) => set("place", event.target.value)}>
            <option value="milik">Milik sendiri</option>
            <option value="sewa">Sewa, alamat sudah ada</option>
            <option value="belum">Belum ada tempat</option>
          </SelectInput>
        </Field>
        <Field label="Daftar alat">
          <SelectInput value={form.gear} onChange={(event) => set("gear", event.target.value)}>
            <option value="lengkap">Sudah lengkap di ruangan</option>
            <option value="sebagian">Sebagian ada</option>
            <option value="belum">Belum disusun</option>
          </SelectInput>
        </Field>
        <Field label="Rencana limbah medis">
          <SelectInput value={form.waste} onChange={(event) => set("waste", event.target.value)}>
            <option value="ada">Sudah ada alurnya</option>
            <option value="belum">Belum</option>
          </SelectInput>
        </Field>
        <Field label="Rekomendasi IBI">
          <SelectInput value={form.ibi} onChange={(event) => set("ibi", event.target.value)}>
            <option value="ada">Sudah terbit</option>
            <option value="proses">Sedang diurus</option>
            <option value="belum">Belum diminta</option>
          </SelectInput>
        </Field>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? "Menyusun papan..." : "Lihat lampu kesiapan"}
          </Button>
          {error ? <p className="mt-3 text-sm text-clay">{error}</p> : null}
          <p className="mt-3 text-xs leading-5 text-mute">
            Hasil terkunci sampai pembayaran. Ini persiapan map, bukan pemeriksaan sarana dan bukan penerbitan izin.
          </p>
        </div>
      </form>
    </Panel>
  );
}
