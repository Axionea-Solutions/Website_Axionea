import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Wichtig für Serverless Environments (AWS Amplify, Vercel), damit die Route nicht statisch gecacht wird
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// In-memory rate limiter (per Lambda-Instanz auf AWS Amplify/Serverless).
// Hinweis: Auf Serverless-Plattformen teilen sich Instanzen keinen Speicher —
// für echtes Cross-Instance-Limiting ist Redis (z.B. Upstash) nötig.
// Dieser Limiter schützt dennoch vor Request-Flooding innerhalb einer Instanz
// und bereinigt automatisch abgelaufene Einträge.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const MAX_REQUESTS_PER_WINDOW = 20;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // Cleanup alle 5 Minuten

const rateLimitMap = new Map<string, { count: number; expires: number }>();

// Bereinigt abgelaufene Einträge aus der Map, um Memory Leaks zu verhindern
function cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, record] of rateLimitMap.entries()) {
        if (now > record.expires) {
            rateLimitMap.delete(key);
        }
    }
}

// Cleanup-Timer starten (läuft im gleichen serverless-Kontext)
let lastCleanup = Date.now();

function isRateLimited(ip: string): boolean {
    const now = Date.now();

    // Periodisches Cleanup um Memory Leak zu verhindern
    if (now - lastCleanup > CLEANUP_INTERVAL_MS) {
        cleanupExpiredEntries();
        lastCleanup = now;
    }

    const limitRecord = rateLimitMap.get(ip);

    // Kein Eintrag → neuen anlegen
    if (!limitRecord) {
        rateLimitMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    // Fenster abgelaufen → zurücksetzen
    if (now > limitRecord.expires) {
        rateLimitMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    // Limit überschritten
    if (limitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    // Zähler erhöhen
    limitRecord.count += 1;
    return false;
}

// System prompt giving the bot personality and Axionea context
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

export async function POST(req: Request) {
    try {
        console.log("--- CHAT API INCOMING REQUEST ---");

        // 1. API Key Check
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error("FATAL ERROR: GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables!");
            return new Response(JSON.stringify({ error: "API Configuration Error: API key is missing." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Extract IP for rate limiting
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'unknown-ip');

        if (isRateLimited(ip)) {
            console.warn(`[RATE LIMIT] Exceeded for IP: ${ip}`);
            return new Response(
                'Rate limit exceeded. Ax muss seine Akkus aufladen! Bitte versuche es in ein paar Minuten nochmal.',
                { status: 429 }
            );
        }

        // 3. Parse and Validate Payload
        const body = await req.json();
        const messages = body.messages;

        if (!messages || !Array.isArray(messages)) {
            console.error("INVALID PAYLOAD: 'messages' array is missing or invalid.", body);
            return new Response(JSON.stringify({ error: "Invalid request: 'messages' is required." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const MAX_MESSAGE_LENGTH = 2000;
        const MAX_MESSAGES = 20;
        if (messages.length > MAX_MESSAGES) {
            return new Response(JSON.stringify({ error: "Too many messages in conversation." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        for (const msg of messages) {
            if (typeof msg.content !== 'string' || msg.content.length > MAX_MESSAGE_LENGTH) {
                return new Response(JSON.stringify({ error: "Invalid message format or content too long." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
            if (!['user', 'assistant'].includes(msg.role)) {
                return new Response(JSON.stringify({ error: "Invalid message role." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
            }
        }

        console.log(`[CHAT REQUEST] IP: ${ip} | Messages count: ${messages.length}`);

        // 4. Stream Response
        // gemini-2.5-flash ist ein Thinking-Modell. Mit thinkingBudget: 0 deaktivieren wir
        // das Thinking, damit (a) temperature funktioniert, (b) Antworten schneller kommen
        // und (c) keine internen Thinking-Tokens im Stream auftauchen.
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: SYSTEM_PROMPT,
            messages,
            temperature: 0.7,
            providerOptions: {
                google: {
                    thinkingConfig: {
                        thinkingBudget: 0,  // Thinking deaktivieren für Chat-Use-Case
                    },
                },
            },
            onError({ error }) {
                console.error('[STREAM ERROR]:', error);
            },
        });

        // Error handling during stream configuration
        if (!result) {
            throw new Error("streamText returned null or undefined");
        }

        return result.toTextStreamResponse({
            headers: {
                // Ensure proper streaming headers
                'X-Content-Type-Options': 'nosniff',
            }
        });
    } catch (error: unknown) {
        const e = error instanceof Error ? error : new Error(String(error));
        console.error("--- CHAT API FATAL ERROR ---");
        console.error("Error Name:", e.name);
        console.error("Error Message:", e.message);
        if (e.cause) console.error("Error Cause:", e.cause);
        if (e.stack) console.error("Error Stack:", e.stack);

        // Return a clean error to the frontend
        return new Response(
            JSON.stringify({
                error: 'Fehler beim Abrufen der Antwort. Bitte versuche es später erneut.',
                details: process.env.NODE_ENV === 'development' ? e.message : undefined
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
