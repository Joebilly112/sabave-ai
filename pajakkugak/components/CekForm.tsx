"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";

export function CekForm() {
  const router = useRouter();
  const [annualGross, setAnnualGross] = useState("");
  const [hasNpwp, setHasNpwp] = useState("belum");
  const [withheld, setWithheld] = useState("tidak_tahu");
  const [omzetBand, setOmzetBand] = useState("bawah_500");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annualGross, hasNpwp, withheld, omzetBand }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa dihitung.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "cek_submit", path: "/cek" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Jaringan terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          label="Omzet bruto dari klien, setahun"
          hint="Jumlah yang masuk sebelum dikurangi biaya. Titik atau koma pemisah ribuan boleh."
        >
          <TextInput
            inputMode="numeric"
            name="annualGross"
            placeholder="186000000"
            value={annualGross}
            onChange={(event) => setAnnualGross(event.target.value)}
            required
          />
        </Field>
        <Field label="NPWP" hint="Yang sudah atau sedang terbit biasanya tetap menyampaikan SPT.">
          <SelectInput name="hasNpwp" value={hasNpwp} onChange={(event) => setHasNpwp(event.target.value)}>
            <option value="punya">Sudah punya</option>
            <option value="proses">Sedang diurus</option>
            <option value="belum">Belum punya</option>
          </SelectInput>
        </Field>
        <Field label="Ada klien yang memotong PPh 23 atau 21?" hint="Kalau tidak yakin, pilih tidak tahu. Jangan menebak tarif.">
          <SelectInput name="withheld" value={withheld} onChange={(event) => setWithheld(event.target.value)}>
            <option value="tidak">Tidak ada</option>
            <option value="pph23">Ada PPh 23</option>
            <option value="pph21">Ada PPh 21</option>
            <option value="keduanya">Keduanya</option>
            <option value="tidak_tahu">Tidak tahu</option>
          </SelectInput>
        </Field>
        <Field
          label="Pita omzet UMKM yang kamu rasa"
          hint="Di bawah Rp500 juta, Rp500 juta–Rp4,8 miliar, atau di atas Rp4,8 miliar. Angka di atas yang dipakai kalau keduanya beda, dengan pita yang lebih hati-hati."
        >
          <SelectInput name="omzetBand" value={omzetBand} onChange={(event) => setOmzetBand(event.target.value)}>
            <option value="bawah_500">Di bawah Rp500 juta</option>
            <option value="500_sampai_48">Rp500 juta sampai Rp4,8 miliar</option>
            <option value="atas_48">Di atas Rp4,8 miliar</option>
          </SelectInput>
        </Field>
        {error ? <p className="text-sm text-stamp">{error}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Menghitung peta…" : "Simpan dan lihat slip"}
        </Button>
        <p className="text-xs leading-5 text-mute">
          Putusan lengkap, jalur formulir, dan checklist terbuka setelah Rp24.900. Jangan mengisi nama klien atau nomor NPWP.
        </p>
      </form>
    </Panel>
  );
}
