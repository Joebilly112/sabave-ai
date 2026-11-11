import type { Readiness } from "@/lib/types";

type Polish = { ringkas?: unknown };

function extractJson(raw: string): unknown {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1)) as unknown;
  } catch {
    return null;
  }
}

export async function polishReadiness(result: Readiness): Promise<Readiness> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return result;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

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
              "Kamu editor bahasa Indonesia untuk guru yang gelisah soal PPG. Tulis ulang kalimat ringkas agar lebih hangat dan konkret. Jangan mengubah angka skor, jangan menjanjikan lolos, jangan menambah syarat resmi, jangan menyebut gaji atau produk lain. Jawab JSON saja: {\"ringkas\":\"...\"}.",
          },
          {
            role: "user",
            content: JSON.stringify({
              skor: result.score,
              pita: result.bandLabel,
              ringkas: result.ringkas,
              berkasKosong: result.missing.map((item) => item.label),
            }),
          },
        ],
      }),
    });

    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return result;
    const parsed = extractJson(content) as Polish | null;
    if (!parsed || typeof parsed.ringkas !== "string") return result;
    const ringkas = parsed.ringkas.trim();
    if (ringkas.length < 80 || ringkas.length > 420) return result;
    if (!ringkas.includes(String(result.score))) return result;
    return { ...result, ringkas };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
