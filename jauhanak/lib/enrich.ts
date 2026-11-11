import type { ClosenessInput, ClosenessResult } from "@/lib/types";

export async function enrichScript(input: ClosenessInput, result: ClosenessResult): Promise<ClosenessResult> {
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
              "Kamu merapikan satu pesan singkat bahasa Indonesia dari orang tua yang kerja jauh kepada pengasuh anak. Nada hangat, tidak menuduh lalai, tidak mendiagnosis anak, tidak menyebut nomor telepon, uang, atau nama orang. Pesan harus meminta satu waktu video yang tetap dan bertanya apa yang sedang anak sukai. Balas hanya isi pesan.",
          },
          {
            role: "user",
            content: JSON.stringify({
              childAge: input.childAge,
              caregiver: input.caregiver,
              draft: result.caregiverScript,
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
    if (!text || text.length < 80 || text.length > 700) return result;
    if (!/(waktu|video|panggilan|minggu)/i.test(text)) return result;
    if (/rp\s?\d|08\d{8,}|depresi|trauma|lalai|tidak sayang|salah asuh/i.test(text)) return result;
    return { ...result, caregiverScript: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
