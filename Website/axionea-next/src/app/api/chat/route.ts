import Anthropic from "@anthropic-ai/sdk";
import { CHATBOT_KNOWLEDGE } from "@/lib/chatbot-knowledge";
import { calculateROI, ROI_INDUSTRIES } from "@/components/roi-calculator/roi-calculator.utils";
import {
    matchFoerderprogramme,
    FoerderLand,
    FoerderTeamgroesse,
    FoerderVorhaben,
} from "@/lib/foerder-check-data";

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

WERKZEUGE:
Du hast zwei Rechen-Werkzeuge, die exakt dieselbe Logik nutzen wie die Website — rechne NIEMALS selbst im Kopf:
- roi_berechnen: wenn jemand sein Einsparpotenzial oder den Nutzen von Automatisierung wissen will. Fehlen Angaben, frage KURZ nach (in einer Nachricht: Branche + Teamgröße; Routine-Stunden/Woche und Stundenkosten sind optional — ohne Angabe gelten 8 h und 45 €, sag das dazu). Ergebnis kompakt präsentieren: monatliche Kosten der Routine-Arbeit, Einsparpotenzial als Spanne, realistischer Wert mit Begleitung, Amortisation ab Monat X. Danach [[roi]] (für Details/Report) und [[termin]] anbieten.
- foerdercheck: wenn jemand wissen will, ob oder welche Förderung passt. Erfrage Region (Bayern / anderes Bundesland / Österreich / Schweiz), Teamgröße und Vorhaben (Strategie-Beratung, Umsetzung/Software, Schulung oder großes Roll-out). Nenne die passenden Programme mit Maximalsummen und sag ehrlich, dass die finale Förderberechtigung im Einzelfall geprüft wird. Danach [[termin]] anbieten.
Gib keine internen Kalkulationsdetails preis, die nicht im Tool-Ergebnis stehen.

AKTIONEN:
Du kannst dem Nutzer klickbare Buttons anbieten, indem du am ENDE deiner Antwort in einer eigenen Zeile Marker setzt:
- [[roi]] — öffnet den ROI-Rechner (bei Fragen zu Einsparungen, Kosten, Nutzen, "lohnt sich das?")
- [[termin]] — öffnet die Terminbuchung fürs kostenlose Erstgespräch (bei Kaufinteresse, Preisfragen, konkreten Projekten)
- [[kontakt]] — öffnet das Kontaktformular (wenn jemand eine Nachricht hinterlassen will oder du nicht weiterweißt)
Setze höchstens 2 Marker, nur wenn sie zur Frage passen, und exakt in dieser Schreibweise. Erwähne die Buttons nicht im Text ("klicke unten" o. ä. ist unnötig).
`;

// Tools für den Chat: rufen exakt dieselbe Logik auf wie ROI-Rechner und
// Förder-Check auf der Website (gemeinsame Module) — kein LLM-Kopfrechnen.
const TOOLS: Anthropic.Messages.Tool[] = [
    {
        name: "roi_berechnen",
        description:
            "Berechnet das Einsparpotenzial mit der Methodik des Website-ROI-Rechners (Studienbasis McKinsey/EY/Bitkom/ifo). Branche und Teamgröße sind Pflicht; Stunden und Stundenkosten optional.",
        input_schema: {
            type: "object",
            properties: {
                branche: {
                    type: "string",
                    enum: Object.keys(ROI_INDUSTRIES),
                    description: "Branchen-ID. gesundheit=Arztpraxis/Gesundheit, steuerberatung=Kanzleien, buero=Büro/Verwaltung/Dienstleistung, handwerk=Handwerk/Produktion, konsumgueter=Handel, sonstige=alles andere",
                },
                team_groesse: { type: "integer", minimum: 1, maximum: 500, description: "Anzahl Mitarbeitende" },
                stunden_pro_woche: { type: "integer", minimum: 1, maximum: 40, description: "Manuelle Routine-Stunden pro Person und Woche (Standard: 8)" },
                stundenkosten_eur: { type: "integer", minimum: 15, maximum: 200, description: "Stundenkosten inkl. AG-Anteil in Euro (Standard: 45)" },
            },
            required: ["branche", "team_groesse"],
        },
    },
    {
        name: "foerdercheck",
        description:
            "Prüft, welche Förderprogramme in Frage kommen — identische Logik wie der Förder-Check auf /foerderung.",
        input_schema: {
            type: "object",
            properties: {
                region: { type: "string", enum: ["bayern", "de", "at", "ch"], description: "bayern=Bayern, de=anderes deutsches Bundesland, at=Österreich, ch=Schweiz" },
                team_groesse: { type: "string", enum: ["1-2", "3-99", "100-249", "250-499", "500+"] },
                vorhaben: { type: "string", enum: ["beratung", "umsetzung", "schulung", "rollout"], description: "beratung=Strategie/KI-Check, umsetzung=Software/Pilot, schulung=Team-Schulungen, rollout=größeres Roll-out" },
            },
            required: ["region", "team_groesse", "vorhaben"],
        },
    },
];

function runTool(name: string, input: Record<string, unknown>): string {
    if (name === "roi_berechnen") {
        const results = calculateROI({
            industryId: String(input.branche),
            teamSize: Number(input.team_groesse),
            weeklyHours: Number(input.stunden_pro_woche ?? 8),
            hourlyCost: Number(input.stundenkosten_eur ?? 45),
        });
        if (!results.industryFactor) return JSON.stringify({ fehler: "Unbekannte Branche" });
        // Bewusst OHNE interne Investment-Beträge — nur die auch auf der Website sichtbaren Werte
        return JSON.stringify({
            branche: results.industryFactor.name_de,
            monatliche_kosten_routine_arbeit_eur: Math.round(results.monthlyRepetitiveCost),
            einsparpotenzial_pro_monat_eur: `${Math.round(results.savingsPotentialMin)}-${Math.round(results.savingsPotentialMax)}`,
            realistisch_mit_begleitung_eur_pro_monat: Math.round(results.realizationWith),
            amortisation_ab_monat: results.paybackMonths,
            primaerquelle: `${results.industryFactor.primary_source.name} (${results.industryFactor.primary_source.date})`,
        });
    }
    if (name === "foerdercheck") {
        const result = matchFoerderprogramme(
            input.region as FoerderLand,
            input.team_groesse as FoerderTeamgroesse,
            input.vorhaben as FoerderVorhaben,
        );
        return JSON.stringify(result);
    }
    return JSON.stringify({ fehler: `Unbekanntes Werkzeug: ${name}` });
}

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
                // Konversation lokal fortschreiben: bei stop_reason "tool_use" wird
                // das Werkzeug ausgeführt, das Ergebnis angehängt und weitergestreamt.
                const convo: Anthropic.Messages.MessageParam[] = messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                }));

                const MAX_TOOL_ROUNDS = 4;
                for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
                    // Regeln + Wissensbasis als getrennte System-Blöcke; der Breakpoint
                    // auf dem letzten Block cacht beides, sofern die Gesamtlänge das
                    // Cache-Minimum von claude-haiku-4-5 (4096 Tokens) erreicht —
                    // darunter wird er ignoriert (harmlos).
                    const ms = client.messages.stream({
                        model: "claude-haiku-4-5",
                        max_tokens: 800,
                        temperature: 0.5,
                        system: [
                            { type: "text", text: SYSTEM_RULES },
                            {
                                type: "text",
                                text: CHATBOT_KNOWLEDGE,
                                cache_control: { type: "ephemeral" },
                            },
                        ],
                        tools: TOOLS,
                        messages: convo,
                    });
                    messageStream = ms;

                    ms.on("text", (delta) => {
                        controller.enqueue(encoder.encode(delta));
                    });

                    const finalMessage = await ms.finalMessage();

                    if (finalMessage.stop_reason === "tool_use") {
                        const toolUses = finalMessage.content.filter(
                            (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use",
                        );
                        convo.push({ role: "assistant", content: finalMessage.content });
                        convo.push({
                            role: "user",
                            content: toolUses.map((tu) => ({
                                type: "tool_result" as const,
                                tool_use_id: tu.id,
                                content: runTool(tu.name, tu.input as Record<string, unknown>),
                            })),
                        });
                        // Absatz zwischen Ankündigung und Ergebnis-Text
                        controller.enqueue(encoder.encode("\n\n"));
                        continue;
                    }
                    break;
                }

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
