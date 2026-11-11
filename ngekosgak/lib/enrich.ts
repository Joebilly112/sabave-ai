import type { CommuteInput, CommuteResult } from "@/lib/types";

export async function enrichSummary(input: CommuteInput, result: CommuteResult): Promise<CommuteResult> {
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
              "Kamu merapikan satu paragraf bahasa Indonesia untuk komuter yang membandingkan ngekos dan pulang-pergi. Nada tenang. Jangan menjanjikan hidup lebih baik, jangan menyuruh pindah, jangan menyebut produk lain, jangan mengubah angka. Paragraf harus tetap memuat nama daerah rumah, nama daerah kantor, dan salah satu dari: pulang-pergi, hibrid, atau ngekos. Balas hanya paragraf itu.",
          },
          {
            role: "user",
            content: JSON.stringify({
              homeArea: input.homeArea,
              officeArea: input.officeArea,
              choice: result.choice,
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
    if (!text || text.length < 120 || text.length > 700) return result;
    const homeOk = text.toLowerCase().includes(input.homeArea.toLowerCase());
    const officeOk = text.toLowerCase().includes(input.officeArea.toLowerCase());
    const choiceOk = /pulang-pergi|hibrid|ngekos/i.test(text);
    if (!homeOk || !officeOk || !choiceOk) return result;
    if (/dijamin|pasti untung|wajib pindah|gaji tidak cukup|produk lain/i.test(text)) return result;
    return { ...result, summary: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
