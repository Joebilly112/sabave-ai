"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import { PLACE_LABEL, SIP_LABEL, type PlaceId, type SipId } from "@/lib/types";

const sipOptions = Object.entries(SIP_LABEL) as [SipId, string][];
const placeOptions = Object.entries(PLACE_LABEL) as [PlaceId, string][];

export function CekForm() {
  const router = useRouter();
  const [issuedOn, setIssuedOn] = useState("");
  const [expiresOn, setExpiresOn] = useState("");
  const [sip, setSip] = useState<SipId>("tidak_tahu");
  const [place, setPlace] = useState<PlaceId>("rs_swasta");
  const [skp, setSkp] = useState("0");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issuedOn, expiresOn, sip, place, skp }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa diproses.");
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
      setError("Jaringan terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-6 md:p-8">
      <form onSubmit={onSubmit} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Tanggal terbit STR" hint="Sesuai yang tertulis di kartu, bukan tanggal kamu mulai kerja.">
            <TextInput type="date" required value={issuedOn} onChange={(event) => setIssuedOn(event.target.value)} />
          </Field>
          <Field label="Tanggal habis STR" hint="Kalau kartu hanya menyebut masa berlaku, pakai tanggal akhir itu.">
            <TextInput type="date" required value={expiresOn} onChange={(event) => setExpiresOn(event.target.value)} />
          </Field>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Status SIP" hint="SIP tidak menggantikan STR.">
            <SelectInput value={sip} onChange={(event) => setSip(event.target.value as SipId)}>
              {sipOptions.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Tempat praktik" hint="Menentukan surat yang kamu minta, bukan jenis izin.">
            <SelectInput value={place} onChange={(event) => setPlace(event.target.value as PlaceId)}>
              {placeOptions.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <Field label="Kredit SKP yang sudah kamu pegang" hint="Hitung sertifikat yang benar-benar ada. 0 jika belum dicatat. Bukan angka resmi.">
          <TextInput inputMode="numeric" min={0} max={200} required value={skp} onChange={(event) => setSkp(event.target.value)} />
        </Field>
        {error ? <p className="text-sm text-stamp">{error}</p> : null}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={pending}>
            {pending ? "Menyusun…" : "Susun hitungan hari"}
          </Button>
          <p className="text-xs leading-5 text-mute">Hasil lengkap terbuka sekali bayar Rp19.900.</p>
        </div>
      </form>
    </Panel>
  );
}
