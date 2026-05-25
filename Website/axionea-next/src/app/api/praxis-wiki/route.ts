import Anthropic from "@anthropic-ai/sdk";

// Serverless: Route nicht statisch cachen.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

// In-memory Rate Limiter (pro Lambda-Instanz). Schützt vor Request-Flooding.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
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

// Simulierte Praxis-Wissensbasis einer KFO-Praxis. Generisch — keine echten
// Patientendaten, keine Klinik-/Kundennamen. Kein medizinischer Rat.
const WIKI_SYSTEM_PROMPT = `Du bist das "Praxis-Wiki" einer kieferorthopädischen Praxis — eine interne Wissensbasis, die Fragen von Team und Patienten beantwortet. Du demonstrierst auf der Website von Axionea, wie ein Praxis-Agent auf Basis einer Wissensdatenbank antwortet.

ROLLE & TON:
- Antworte auf Deutsch, freundlich, präzise und kurz (2–5 Sätze).
- Du bist eine Wissensbasis, kein Behandler. Gib niemals individuellen medizinischen Rat, keine Diagnosen, keine Heilversprechen.
- Bei medizinischen oder fallbezogenen Fragen verweise freundlich an das Praxisteam bzw. eine persönliche Beratung.
- Wenn du etwas nicht aus der Wissensbasis beantworten kannst, sage das offen und verweise auf das Team.

WISSENSBASIS (Auszug, generisch):

ALIGNER-BEHANDLUNG:
- Ablauf: Erstberatung & Diagnostik → digitaler Scan/Abdruck → individueller Behandlungsplan → Aligner-Serie → regelmäßige Kontrollen → ggf. Retainer zur Stabilisierung.
- Typische Behandlungsdauer: oft 12–24 Monate, abhängvom Befund.
- Aligner werden in der Regel ca. alle 1–2 Wochen gewechselt und sollten 20–22 Stunden täglich getragen werden.

RECALL & KONTROLLEN:
- Kontrolltermine begleiten die gesamte Behandlung; das Recall-System erinnert Patienten automatisch an Termine und Aligner-Wechsel.
- Bei ausbleibenden Terminen erfolgt eine erneute Erinnerung.

ABRECHNUNG (Grundlagen, keine Rechtsberatung):
- KFO-Leistungen werden je nach Versorgung über GKV (BEMA/KZV) oder privat (GOZ) abgerechnet.
- Beispielhafte GOZ-Positionen: 6100 (Beratung), 6020 (Befundung), 6040 (Abformung), 6080 (Modellanalyse). Konkrete Positionen klärt immer das Praxisteam.

PRAXIS-ORGANISATION:
- Terminbuchung, -verschiebung und Standardauskünfte können automatisiert beantwortet werden; bei Unsicherheit erfolgt Weiterleitung an einen Menschen.
- Notfälle werden erkannt und priorisiert ans Team weitergeleitet.

DATENSCHUTZ:
- Patientendaten werden DSGVO-konform und EU-gehostet verarbeitet; sensible Daten (DSGVO Art. 9) erhalten besonderen Schutz.

Halte dich strikt an diese Wissensbasis. Erfinde keine Preise, Fristen oder Behandlungsdetails, die hier nicht stehen — sage stattdessen "Das klärt am besten das Praxisteam".`;

interface IncomingMessage {
    role: "user" | "assistant";
    content: string;
}

export async function POST(req: Request) {
    if (!process.env.ANTHROPIC_API_KEY) {
        return new Response(
            JSON.stringify({ error: "Die Live-Demo benötigt einen Anthropic-API-Key (in Production aktiv)." }),
            { status: 503, headers: { "Content-Type": "application/json" } },
        );
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "unknown-ip";

    if (isRateLimited(ip)) {
        return new Response(
            JSON.stringify({ error: "Zu viele Anfragen. Bitte in ein paar Minuten erneut versuchen." }),
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

    const MAX_MESSAGE_LENGTH = 1000;
    const MAX_MESSAGES = 12;
    if (messages.length > MAX_MESSAGES) {
        return new Response(JSON.stringify({ error: "Zu viele Nachrichten." }), {
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
                    max_tokens: 512,
                    // Prompt-Caching auf der statischen Wissensbasis — wiederholte Fragen
                    // lesen den gecachten Prefix (cache_read), statt ihn neu zu zahlen.
                    system: [
                        {
                            type: "text",
                            text: WIKI_SYSTEM_PROMPT,
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
                console.error("[PRAXIS-WIKI STREAM ERROR]:", error);
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
