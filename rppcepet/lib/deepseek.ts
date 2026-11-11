import type { Outline } from "@/lib/types";

type Polish = { tujuan: string[] };

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

export async function polishOutline(result: Outline): Promise<Outline> {
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
              "Kamu editor bahasa Indonesia untuk guru. Tulis ulang dua tujuan pembelajaran agar lebih konkret dan hangat, tanpa menambah tujuan, tanpa mengubah jenjang, mapel, atau topik. Jangan menyebut gaji, sekolah lain, atau produk lain. Jawab JSON saja: {\"tujuan\":[\"...\",\"...\"]}.",
          },
          {
            role: "user",
            content: JSON.stringify({ identitas: result.identitas, tujuan: result.tujuan }),
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
    if (!parsed || !Array.isArray(parsed.tujuan) || parsed.tujuan.length !== result.tujuan.length) {
      return result;
    }
    const tujuan = parsed.tujuan.map((line) => (typeof line === "string" ? line.trim() : ""));
    if (tujuan.some((line) => line.length < 40 || line.length > 320)) return result;
    return { ...result, tujuan };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
