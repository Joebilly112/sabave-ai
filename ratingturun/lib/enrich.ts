import type { CekInput, CekResult, ScriptCard } from "@/lib/types";

function parseScripts(text: string, current: ScriptCard[]): ScriptCard[] | null {
  const chunks = text
    .split(/\n---\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  if (chunks.length !== current.length) return null;
  const next: ScriptCard[] = [];
  for (let index = 0; index < current.length; index += 1) {
    const source = current[index];
    const body = chunks[index];
    if (!source || !body) return null;
    const line = body.replace(/^["“]|["”]$/g, "").replace(/\s+/g, " ").trim();
    if (line.length < 40 || line.length > 320) return null;
    if (/rp\s?\d|gaji|dijamin|pasti naik|pasti pulih|suspend|diblokir|akun mati/i.test(line)) return null;
    next.push({ situation: source.situation, text: line });
  }
  return next;
}

export async function enrichScripts(input: CekInput, result: CekResult): Promise<CekResult> {
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
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Kamu merapikan naskah singkat bahasa Indonesia untuk mitra ojek saat bicara ke penumpang. Nada tenang, tidak memohon bintang, tidak menjanjikan rating naik, tidak membahas uang atau gaji, tidak menyebut pemblokiran akun. Balas tepat satu naskah per bagian, dipisah baris --- saja, urutan sama, tanpa judul.",
          },
          {
            role: "user",
            content: JSON.stringify({
              platform: input.platform,
              rating: input.rating,
              complaints: input.complaints,
              drafts: result.scripts.map((script) => script.text),
            }),
          },
        ],
      }),
    });
    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = payload.choices?.[0]?.message?.content?.trim();
    if (!text) return result;
    const scripts = parseScripts(text, result.scripts);
    if (!scripts) return result;
    return { ...result, scripts };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
