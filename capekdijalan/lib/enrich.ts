import { bandLabel } from "@/lib/labels";
import type { StrainInput, StrainResult } from "@/lib/types";

export async function enrichSummary(input: StrainInput, result: StrainResult): Promise<StrainResult> {
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
              "Kamu merapikan satu paragraf bahasa Indonesia tentang beban perjalanan komuter. Nada tenang. Jangan mendiagnosis, jangan menyebut obat, jangan menyuruh resign, jangan membahas gaji, jangan menyebut produk lain, jangan mengubah angka. Paragraf wajib memuat kata pita (ringan, berat, atau bahaya) yang diberikan dan angka jam setahun. Balas hanya paragraf itu.",
          },
          {
            role: "user",
            content: JSON.stringify({
              band: bandLabel[result.band].toLowerCase(),
              hoursYear: result.hoursYear,
              minutesOneWay: input.minutesOneWay,
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
    if (!text || text.length < 140 || text.length > 750) return result;
    const bandOk = text.toLowerCase().includes(bandLabel[result.band].toLowerCase());
    const hoursOk = text.includes(String(result.hoursYear));
    if (!bandOk || !hoursOk) return result;
    if (/diagnos|obat|depresi|resign|gaji|dijamin sembuh|pasti sakit/i.test(text)) return result;
    return { ...result, summary: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
