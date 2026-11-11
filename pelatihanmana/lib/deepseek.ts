import type { Recommendation } from "@/lib/types";

type Polish = { why: string[] };

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

export async function polishRecommendation(result: Recommendation): Promise<Recommendation> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key || result.next.length === 0) return result;

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
              "Kamu editor bahasa Indonesia untuk perawat. Tulis ulang alasan tiap pelatihan agar lebih hangat dan spesifik, tanpa mengubah urutan, nama, atau fakta waktu. Jangan menyebut gaji, rumah sakit lain, atau produk lain. Jawab JSON saja: {\"why\":[\"...\",\"...\",\"...\"] } dengan jumlah sama persis.",
          },
          {
            role: "user",
            content: JSON.stringify({
              summary: result.summary,
              items: result.next.map((item) => ({
                name: item.name,
                why: item.why,
                timeCost: item.timeCost,
              })),
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
    if (!parsed || !Array.isArray(parsed.why) || parsed.why.length !== result.next.length) {
      return result;
    }
    const why = parsed.why.map((line) => (typeof line === "string" ? line.trim() : ""));
    if (why.some((line) => line.length < 40 || line.length > 500)) return result;

    return {
      ...result,
      next: result.next.map((item, index) => ({ ...item, why: why[index] ?? item.why })),
    };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
