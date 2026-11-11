import type { StayInput, StayResult } from "@/lib/types";

export async function enrichSummary(input: StayInput, result: StayResult): Promise<StayResult> {
  if (result.band !== "bertahan") return result;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return result;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              "Kamu merapikan satu paragraf bahasa Indonesia untuk pekerja migran yang situasinya relatif aman. Nada tenang, tidak menyalahkan, tidak menjanjikan hasil hukum, tidak menyuruh diam, tidak menyebut nomor telepon atau uang. Paragraf harus menyebut rencana, kontrak, dan batas untuk minta bantuan jika kondisi berubah. Balas hanya paragraf itu.",
          },
          {
            role: "user",
            content: JSON.stringify({
              country: input.country,
              monthsLeft: input.monthsLeft,
              draft: result.summary,
            }),
          },
        ],
      }),
    });
    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = payload.choices?.[0]?.message?.content?.trim().replace(/^["“]|["”]$/g, "");
    if (!text || text.length < 80 || text.length > 500) return result;
    if (!/(rencana|kontrak)/i.test(text)) return result;
    if (/jangan lapor|sabar saja|tidak perlu bantuan|rp\s?\d|08\d{6,}|pasrah/i.test(text)) return result;
    return { ...result, summary: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
