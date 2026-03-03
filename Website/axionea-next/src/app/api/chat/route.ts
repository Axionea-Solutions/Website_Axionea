import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

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
        // Extract IP for rate limiting
        // In Next.js App Router, extracting IP can be done via headers config depending on deployment
        // Very rudimentary fallback for IP
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (realIp || 'unknown-ip');

        if (isRateLimited(ip)) {
            return new Response(
                'Rate limit exceeded. Ax muss seine Akkus aufladen! Bitte versuche es in ein paar Minuten nochmal.',
                { status: 429 }
            );
        }

        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.5-flash'), // or gemini-1.5-[flash/pro] depending on SDK version
            system: SYSTEM_PROMPT,
            messages,
            // optional params: temperature: 0.7, maxTokens:...
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return new Response('Fehler beim Abrufen der Antwort: ' + (error.message || 'Unbekannter API Fehler'), { status: 500 });
    }
}
