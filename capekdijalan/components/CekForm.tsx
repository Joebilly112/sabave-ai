"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Field, controlClass } from "@/components/ui";
import { modeLabel, moodLabel, painLabel, postureLabel, recoveryLabel } from "@/lib/labels";
import { MOODS, MODES, PAINS, POSTURES, RECOVERIES, type Mood, type Mode, type Pain, type Posture, type Recovery } from "@/lib/types";

const sleepOptions = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9];

export function CekForm() {
  const router = useRouter();
  const [minutesOneWay, setMinutes] = useState("75");
  const [mode, setMode] = useState<Mode>("krl");
  const [depart, setDepart] = useState("05:40");
  const [returnAt, setReturnAt] = useState("18:50");
  const [posture, setPosture] = useState<Posture>("berdiri");
  const [transfers, setTransfers] = useState("1");
  const [sleepHours, setSleep] = useState("6");
  const [pain, setPain] = useState<Pain>("tidak");
  const [mood, setMood] = useState<Mood>("habis");
  const [recovery, setRecovery] = useState<Recovery>("setengah");
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
        body: JSON.stringify({
          minutesOneWay: Number(minutesOneWay),
          mode,
          depart,
          returnAt,
          posture,
          transfers: Number(transfers),
          sleepHours: Number(sleepHours),
          pain,
          mood,
          recovery,
        }),
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
        body: JSON.stringify({ name: "cek_submit", path: "/api/cek" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Koneksi terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <form id="cek" onSubmit={onSubmit} className="mx-auto max-w-6xl px-5 py-12">
      <div className="rounded-[28px] border border-mist bg-paper p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-night">Isi perjalanan yang benar-benar kamu jalani</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">
          Pintu rumah sampai pintu kantor, lalu sebaliknya. Jangan isi rute yang ingin kamu coba nanti.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Menit sekali jalan, pintu ke pintu" hint="15 sampai 240 menit">
            <input className={controlClass} inputMode="numeric" min={15} max={240} value={minutesOneWay} onChange={(event) => setMinutes(event.target.value)} required />
          </Field>
          <Field label="Moda utama">
            <select className={controlClass} value={mode} onChange={(event) => setMode(event.target.value as Mode)}>
              {MODES.map((item) => (
                <option key={item} value={item}>
                  {modeLabel[item]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Jam berangkat dari rumah">
            <input className={controlClass} type="time" value={depart} onChange={(event) => setDepart(event.target.value)} required />
          </Field>
          <Field label="Jam sampai rumah saat pulang">
            <input className={controlClass} type="time" value={returnAt} onChange={(event) => setReturnAt(event.target.value)} required />
          </Field>
          <Field label="Berdiri atau duduk">
            <select className={controlClass} value={posture} onChange={(event) => setPosture(event.target.value as Posture)}>
              {POSTURES.map((item) => (
                <option key={item} value={item}>
                  {postureLabel[item]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Berapa kali ganti" hint="Termasuk stasiun atau halte, 0 sampai 5">
            <select className={controlClass} value={transfers} onChange={(event) => setTransfers(event.target.value)}>
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <option key={item} value={item}>
                  {item} kali
                </option>
              ))}
            </select>
          </Field>
          <Field label="Jam tidur semalam yang biasa">
            <select className={controlClass} value={sleepHours} onChange={(event) => setSleep(event.target.value)}>
              {sleepOptions.map((item) => (
                <option key={item} value={item}>
                  {item.toLocaleString("id-ID")} jam
                </option>
              ))}
            </select>
          </Field>
          <Field label="Punggung atau leher">
            <select className={controlClass} value={pain} onChange={(event) => setPain(event.target.value as Pain)}>
              {PAINS.map((item) => (
                <option key={item} value={item}>
                  {painLabel[item]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Suasana saat sampai">
            <select className={controlClass} value={mood} onChange={(event) => setMood(event.target.value as Mood)}>
              {MOODS.map((item) => (
                <option key={item} value={item}>
                  {moodLabel[item]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Akhir pekan">
            <select className={controlClass} value={recovery} onChange={(event) => setRecovery(event.target.value as Recovery)}>
              {RECOVERIES.map((item) => (
                <option key={item} value={item}>
                  {recoveryLabel[item]}
                </option>
              ))}
            </select>
          </Field>
        </div>
        {error ? <p className="mt-4 text-sm text-coral">{error}</p> : null}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={pending}>
            {pending ? "Menghitung…" : "Simpan dan lihat kunci hasil"}
          </Button>
          <p className="text-xs leading-5 text-mute">Skor lengkap terkunci sampai pembayaran. Isian ini tidak menanyakan gaji.</p>
        </div>
      </div>
    </form>
  );
}
