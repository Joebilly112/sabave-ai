import type { DebriefInput, DebriefResult, WeakMoment } from "@/lib/debrief";

function asText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (text.length < 8 || text.length > max) return null;
  return text;
}

function asMoments(value: unknown): WeakMoment[] | null {
  if (!Array.isArray(value) || value.length < 3) return null;
  const moments: WeakMoment[] = [];
  for (const item of value.slice(0, 3)) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    const title = asText(row.title, 90);
    const detail = asText(row.detail, 320);
    const fix = asText(row.fix, 320);
    if (!title || !detail || !fix) return null;
    moments.push({ title, detail, fix });
  }
  return moments;
}

export async function enrichDebrief(input: DebriefInput, result: DebriefResult): Promise<DebriefResult> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return result;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Kamu editor debrief wawancara dalam bahasa Indonesia. Balas JSON saja dengan kunci verdict, signals, weakest, followUp. weakest wajib 3 objek {title, detail, fix}. Jangan ubah skor. Jangan sebut gaji, angka tawaran, atau produk lain. Jangan mengklaim tahu keputusan pewawancara. followUp adalah pesan singkat 48 jam, sopan, tanpa merengek.",
          },
          {
            role: "user",
            content: JSON.stringify({
              input,
              scores: result.scores,
              overall: result.overall,
              draft: {
                verdict: result.verdict,
                signals: result.signals,
                weakest: result.weakest,
                followUp: result.followUp,
              },
            }),
          },
        ],
      }),
    });
    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content ?? "";
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd <= jsonStart) return result;
    const parsed = JSON.parse(content.slice(jsonStart, jsonEnd + 1)) as Record<string, unknown>;
    const verdict = asText(parsed.verdict, 360);
    const followUp = asText(parsed.followUp, 900);
    const weakest = asMoments(parsed.weakest);
    const signals = Array.isArray(parsed.signals)
      ? parsed.signals.map((item) => asText(item, 220)).filter((item): item is string => Boolean(item)).slice(0, 3)
      : [];
    if (!verdict || !followUp || !weakest || signals.length < 3) return result;
    return { ...result, verdict, followUp, weakest, signals };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
