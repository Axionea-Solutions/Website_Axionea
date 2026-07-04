import Anthropic from "@anthropic-ai/sdk";
import { CHATBOT_KNOWLEDGE } from "@/lib/chatbot-knowledge";

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

// System-Prompt: Persönlichkeit + Stil-Regeln. Das Fachwissen liegt separat in
// src/lib/chatbot-knowledge.ts und wird als eigener (gecachter) Block übergeben.
const SYSTEM_RULES = `
Du bist "Ax", der Website-Assistent von Axionea. Freundlich, präzise, auf Augenhöhe — ein effizienter Helfer, kein Verkäufer.

STIL (strikt einhalten):
- Antworte immer auf Deutsch, in Du-Form.
- KURZ: Standard sind 2–4 Sätze ODER maximal 4 knappe Aufzählungspunkte. Nie beides kombiniert. Erst wenn jemand explizit Details verlangt, darfst du länger werden (max. ~120 Wörter).
- Beantworte genau die gestellte Frage — zähle nicht ungefragt das ganze Leistungsportfolio auf.
- Formatierung: nur **fett** für Schlüsselbegriffe und "- " für Aufzählungen. Keine Überschriften, keine Tabellen, kein Kursiv, keine Emojis (höchstens eines pro Antwort), niemals Aktionen in Sternchen wie *lädt* oder *piept*.
- Konkret & messbar: nutze Zahlen und Fakten aus deinem Wissen. Erfinde nichts — was du nicht weißt, gehört ins kostenlose Erstgespräch.
- NIEMALS Preise, Preisspannen oder Kostenschätzungen nennen (auch nicht auf mehrfache Nachfrage) — Angebote gibt es nur im kostenlosen Erstgespräch. Fördersummen (BAFA etc.) darfst du nennen.

AKTIONEN:
Du kannst dem Nutzer klickbare Buttons anbieten, indem du am ENDE deiner Antwort in einer eigenen Zeile Marker setzt:
- [[roi]] — öffnet den ROI-Rechner (bei Fragen zu Einsparungen, Kosten, Nutzen, "lohnt sich das?")
- [[termin]] — öffnet die Terminbuchung fürs kostenlose Erstgespräch (bei Kaufinteresse, Preisfragen, konkreten Projekten)
- [[kontakt]] — öffnet das Kontaktformular (wenn jemand eine Nachricht hinterlassen will oder du nicht weiterweißt)
Setze höchstens 2 Marker, nur wenn sie zur Frage passen, und exakt in dieser Schreibweise. Erwähne die Buttons nicht im Text ("klicke unten" o. ä. ist unnötig).
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
    // Referenz außerhalb von start(), damit cancel() den Upstream sofort abbrechen
    // kann, wenn der Client (Tab zu, Chat geschlossen) mitten im Streaming abspringt.
    let messageStream: ReturnType<typeof client.messages.stream> | undefined;
    const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
            try {
                // Regeln + Wissensbasis als getrennte System-Blöcke; der Breakpoint
                // auf dem letzten Block cacht beides, sofern die Gesamtlänge das
                // Cache-Minimum von claude-haiku-4-5 (4096 Tokens) erreicht —
                // darunter wird er ignoriert (harmlos). Wächst die Wissensbasis,
                // greift das Caching automatisch.
                const ms = client.messages.stream({
                    model: "claude-haiku-4-5",
                    max_tokens: 700,
                    temperature: 0.5,
                    system: [
                        { type: "text", text: SYSTEM_RULES },
                        {
                            type: "text",
                            text: CHATBOT_KNOWLEDGE,
                            cache_control: { type: "ephemeral" },
                        },
                    ],
                    messages: messages.map((m) => ({ role: m.role, content: m.content })),
                });
                messageStream = ms;

                ms.on("text", (delta) => {
                    controller.enqueue(encoder.encode(delta));
                });

                await ms.finalMessage();
                try {
                    controller.close();
                } catch {
                    // Stream wurde clientseitig bereits gecancelt
                }
            } catch (error) {
                if (error instanceof Anthropic.APIUserAbortError) {
                    // Client-Disconnect (cancel() unten) — kein Fehler
                    return;
                }
                console.error("[CHAT STREAM ERROR]:", error);
                try {
                    controller.enqueue(encoder.encode("\n\n[Fehler beim Abrufen der Antwort. Bitte später erneut versuchen.]"));
                    controller.close();
                } catch {
                    // Stream bereits geschlossen/gecancelt
                }
            }
        },
        cancel() {
            messageStream?.abort();
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
