import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Wichtig für Serverless Environments (AWS Amplify, Vercel), damit die Route nicht statisch gecacht wird
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Very strict in-memory rate limiter
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 50;

// Store IPs and request counts
const rateLimitMap = new Map<string, { count: number; expires: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip);

    // If no record exists, create one
    if (!limitRecord) {
        rateLimitMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    // If the window has expired, reset the record
    if (now > limitRecord.expires) {
        rateLimitMap.set(ip, { count: 1, expires: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    // If within window, check count
    if (limitRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    // Increment count
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

        console.log(`[CHAT REQUEST] IP: ${ip} | Messages count: ${messages.length}`);
        console.log(`[LATEST MESSAGE]: `, messages[messages.length - 1]);

        // 4. Stream Response
        const result = streamText({
            model: google('gemini-2.5-flash'), // or gemini-1.5-[flash/pro] depending on SDK version
            system: SYSTEM_PROMPT,
            messages,
            // You can tune settings here for stability:
            temperature: 0.7,
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
    } catch (error: any) {
        console.error("--- CHAT API FATAL ERROR ---");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        if (error.cause) console.error("Error Cause:", error.cause);
        if (error.stack) console.error("Error Stack:", error.stack);

        // Return a clean error to the frontend
        return new Response(
            JSON.stringify({
                error: 'Fehler beim Abrufen der Antwort. Bitte versuche es später erneut.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
