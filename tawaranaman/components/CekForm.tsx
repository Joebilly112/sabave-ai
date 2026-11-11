"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import type { DocumentId, FeeWhenId, SourceId, VisaId, YesNo, YesNoUnsure } from "@/lib/types";

const sources: { id: SourceId; label: string }[] = [
  { id: "p3mi", label: "Nama P3MI" },
  { id: "lpk", label: "LPK" },
  { id: "perorangan", label: "Orang perorangan" },
  { id: "iklan", label: "Iklan online" },
];

const visas: { id: VisaId; label: string }[] = [
  { id: "kerja", label: "Visa kerja" },
  { id: "wisata", label: "Visa wisata" },
  { id: "umrah", label: "Visa umrah" },
  { id: "tidak-tahu", label: "Belum disebut" },
];

const feeWhens: { id: FeeWhenId; label: string }[] = [
  { id: "tidak-diminta", label: "Tidak diminta biaya" },
  { id: "sebelum-berangkat", label: "Diminta sebelum berangkat" },
  { id: "dipotong-gaji", label: "Akan dipotong dari gaji" },
];

export function CekForm() {
  const router = useRouter();
  const [source, setSource] = useState<SourceId>("iklan");
  const [country, setCountry] = useState("");
  const [visa, setVisa] = useState<VisaId>("tidak-tahu");
  const [feeWhen, setFeeWhen] = useState<FeeWhenId>("sebelum-berangkat");
  const [feeText, setFeeText] = useState("");
  const [loan, setLoan] = useState<YesNo>("tidak");
  const [documents, setDocuments] = useState<DocumentId[]>(["tidak-ada"]);
  const [siskoOwn, setSiskoOwn] = useState<YesNoUnsure>("tidak-tahu");
  const [contractShown, setContractShown] = useState<YesNo>("tidak");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggleDoc(id: DocumentId) {
    setDocuments((current) => {
      if (id === "tidak-ada") return ["tidak-ada"];
      const withoutNone = current.filter((item) => item !== "tidak-ada");
      if (withoutNone.includes(id)) {
        const next = withoutNone.filter((item) => item !== id);
        return next.length ? next : ["tidak-ada"];
      }
      return [...withoutNone, id];
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const feeIdr = feeWhen === "tidak-diminta" ? 0 : Number(feeText.replace(/\D/g, ""));
    if (!country.trim()) {
      setError("Isi negara tujuan.");
      return;
    }
    if (feeWhen !== "tidak-diminta" && (!Number.isInteger(feeIdr) || feeIdr <= 0)) {
      setError("Isi jumlah biaya dalam rupiah, atau pilih tidak diminta biaya.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          country,
          visa,
          feeIdr,
          feeWhen,
          loan,
          documents,
          siskoOwn,
          contractShown,
        }),
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
        body: JSON.stringify({ name: "cek_submit", path: "/hasil" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Koneksi terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form onSubmit={onSubmit} className="grid gap-5">
        <Field label="Siapa yang menawar?" hint="Pilih yang paling dekat. Jangan tulis nama orang atau nomor telepon.">
          <SelectInput value={source} onChange={(event) => setSource(event.target.value as SourceId)}>
            {sources.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Negara tujuan" hint="Nama negara saja, misalnya Malaysia atau Arab Saudi.">
          <TextInput value={country} onChange={(event) => setCountry(event.target.value)} maxLength={40} placeholder="Malaysia" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Visa yang dijanjikan">
            <SelectInput value={visa} onChange={(event) => setVisa(event.target.value as VisaId)}>
              {visas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Kapan biaya diminta?">
            <SelectInput
              value={feeWhen}
              onChange={(event) => {
                const next = event.target.value as FeeWhenId;
                setFeeWhen(next);
                if (next === "tidak-diminta") setFeeText("");
              }}
            >
              {feeWhens.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <Field label="Jumlah biaya (rupiah)" hint="Isi 0 secara otomatis jika tidak diminta biaya.">
          <TextInput
            inputMode="numeric"
            value={feeWhen === "tidak-diminta" ? "0" : feeText}
            disabled={feeWhen === "tidak-diminta"}
            onChange={(event) => setFeeText(event.target.value)}
            placeholder="5000000"
          />
        </Field>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Dokumen yang diminta dititipkan</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {(
              [
                ["tidak-ada", "Tidak ada"],
                ["paspor", "Paspor"],
                ["ijazah-asli", "Ijazah asli"],
              ] as const
            ).map(([id, label]) => {
              const active = documents.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleDoc(id)}
                  className={`rounded-full border px-3 py-2 text-sm ${active ? "border-sea bg-foam text-sea" : "border-line bg-sand text-ink"}`}
                  aria-pressed={active}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Ada pinjaman?">
            <SelectInput value={loan} onChange={(event) => setLoan(event.target.value as YesNo)}>
              <option value="tidak">Tidak</option>
              <option value="ya">Ya</option>
            </SelectInput>
          </Field>
          <Field label="Akun SISKOP2MI sendiri?">
            <SelectInput value={siskoOwn} onChange={(event) => setSiskoOwn(event.target.value as YesNoUnsure)}>
              <option value="ya">Ya, akun saya</option>
              <option value="tidak">Tidak</option>
              <option value="tidak-tahu">Tidak tahu</option>
            </SelectInput>
          </Field>
          <Field label="Kontrak ditunjukkan?">
            <SelectInput value={contractShown} onChange={(event) => setContractShown(event.target.value as YesNo)}>
              <option value="ya">Ya</option>
              <option value="tidak">Tidak</option>
            </SelectInput>
          </Field>
        </div>
        {error ? <p className="text-sm text-coral">{error}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Menyusun laporan…" : "Simpan dan lihat kunci laporan"}
        </Button>
        <p className="text-xs leading-5 text-mute">
          Jangan menulis nama calo, nomor telepon, atau isi chat orang lain. Jika kamu sedang takut atau ditahan, hubungi
          112 atau polisi setempat dulu. Laporan berbayar tidak menggantikan itu.
        </p>
      </form>
    </Panel>
  );
}
