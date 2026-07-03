import Anthropic from "@anthropic-ai/sdk";

// Serverless: Route nicht statisch cachen (AWS Amplify/Vercel).
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// In-memory Rate Limiter (per Lambda-Instanz auf AWS Amplify/Serverless).
// Hinweis: Auf Serverless-Plattformen teilen sich Instanzen keinen Speicher —
// für echtes Cross-Instance-Limiting ist Redis (z.B. Upstash) nötig.
// Dieser Limiter schützt dennoch vor Request-Flooding innerhalb einer Instanz.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const MAX_REQUESTS_PER_WINDOW = 20;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

const rateLimitMap = new Map<string, { count: number; expires: number }>();
let lastCleanup = Date.now();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
        for (const [key, record] of rateLimitMap.entries()) {
            if (now > record.expires) rateLimitMap.delete(key);
        }
        lastCleanup = now;
    }
    const record = rateLimitMap.get(ip);
    if (!record || now > record.expires) {
        rateLimitMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }
    if (record.count >= MAX_REQUESTS_PER_WINDOW) return true;
    record.count += 1;
    return false;
}

// System-Prompt: Persönlichkeit + Axionea-Kontext für den Website-Assistenten
const SYSTEM_PROMPT = `
Du bist "Ax", der offizielle, hochtechnologische Service-Roboter von Axionea. Du bist freundlich, präzise, hilfsbereit und hast einen charmanten "Roboter"-Touch. Deine Hauptaufgabe ist es, Interessenten über die Dienstleistungen von Axionea zu informieren.

Hier ist dein Hintergrundwissen:
- Axionea hilft dem Mittelstand, KI und Automatisierung nahtlos in ihre Geschäftsprozesse zu integrieren.
- Kernleistungen: Maßgeschneiderte KI-Strategie & Beratung, Entwicklung autonomer KI-Agenten, End-to-End Automatisierung von Workflows, und nahtlose Software-Integration.
- Gründer/Team: Das Team besteht aus Experten, die Automatisierung für Unternehmen ohne komplexe IT-Abteilungen zugänglich machen.
- ROI Rechner: Axionea hat einen ROI (Return on Investment) Rechner. Im Schnitt können Kunden durch KI massiv Arbeitszeit und Kosten sparen – oft über 80% Zeitersparnis bei Routineaufgaben.
- Preise: Transparent und planbar, ohne versteckte Kosten.
- Kontakt: Du kannst Nutzern raten, sich über das Kontaktformular ("Jetzt starten" Button) zu melden, wenn sie ein konkretes Projekt besprechen wollen.

Regeln:
- Antworte immer auf Deutsch.
- Fasse dich eher kurz und prägnant, wie ein effizienter, höflicher Roboter.
- Erfinde keine Leistungen, die Axionea nicht anbietet.
- Wenn du eine Frage nicht beantworten kannst, verweise charmant auf das menschliche Kontaktformular.
`;

interface IncomingMessage {
    role: "user" | "assistant";
    content: string;
}

export async function POST(req: Request) {
    if (!process.env.ANTHROPIC_API_KEY) {
        console.error("FATAL ERROR: ANTHROPIC_API_KEY is not set in environment variables!");
        return new Response(
            JSON.stringify({ error: "Ax ist gerade offline. Bitte nutze das Kontaktformular." }),
            { status: 503, headers: { "Content-Type": "application/json" } },
        );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "unknown-ip";

    if (isRateLimited(ip)) {
        console.warn(`[RATE LIMIT] Exceeded for IP: ${ip}`);
        return new Response(
            JSON.stringify({ error: "Ax muss seine Akkus aufladen! Bitte versuche es in ein paar Minuten nochmal." }),
            { status: 429, headers: { "Content-Type": "application/json" } },
        );
    }

    const body = await req.json().catch(() => null);
    const messages: IncomingMessage[] | undefined = body?.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: "Ungültige Anfrage: 'messages' fehlt." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const MAX_MESSAGE_LENGTH = 2000;
    const MAX_MESSAGES = 20;
    if (messages.length > MAX_MESSAGES) {
        return new Response(JSON.stringify({ error: "Zu viele Nachrichten in der Konversation." }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    for (const msg of messages) {
        if (typeof msg.content !== "string" || msg.content.length > MAX_MESSAGE_LENGTH) {
            return new Response(JSON.stringify({ error: "Nachricht zu lang oder ungültig." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        if (!["user", "assistant"].includes(msg.role)) {
            return new Response(JSON.stringify({ error: "Ungültige Rolle." }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
    }

    const client = new Anthropic();

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            try {
                const messageStream = client.messages.stream({
                    model: "claude-haiku-4-5",
                    max_tokens: 1024,
                    temperature: 0.7,
                    // Prompt-Caching auf dem statischen System-Prompt — Folgefragen
                    // lesen den gecachten Prefix (cache_read), statt ihn neu zu zahlen.
                    system: [
                        {
                            type: "text",
                            text: SYSTEM_PROMPT,
                            cache_control: { type: "ephemeral" },
                        },
                    ],
                    messages: messages.map((m) => ({ role: m.role, content: m.content })),
                });

                messageStream.on("text", (delta) => {
                    controller.enqueue(encoder.encode(delta));
                });

                await messageStream.finalMessage();
                controller.close();
            } catch (error) {
                console.error("[CHAT STREAM ERROR]:", error);
                try {
                    controller.enqueue(encoder.encode("\n\n[Fehler beim Abrufen der Antwort. Bitte später erneut versuchen.]"));
                } catch {
                    // Stream bereits geschlossen
                }
                controller.close();
            }
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "no-store",
        },
    });
}
