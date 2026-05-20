---
name: building-chatbots
description: >
  Integrates AI chatbots into Next.js or Python projects using Google Gemini
  or Claude APIs. Use when building a chat widget, AI assistant, support bot,
  or any conversational UI. Trigger when the user says "chatbot bauen",
  "AI-Assistent integrieren", "Chat-Widget", "Gemini API", "Claude API",
  or describes a conversational interface feature.
---

# Building Chatbots

## When to use this skill
- Neuen Chatbot in eine Website integrieren
- Bestehendes Chat-Widget erweitern oder debuggen
- AI-Assistent für Kundenwebsite aufsetzen
- Streaming-Antworten via Gemini oder Claude implementieren

## Pre-Build Checklist

```
[ ] API-Key vorhanden? (Google AI Studio oder Anthropic Console)
[ ] Modell gewählt? (siehe Tabelle unten)
[ ] System-Prompt Inhalt definiert? (→ writing-system-prompts Skill)
[ ] Wissensbasis nötig? (PDFs, Dokumente → managing-rag-pipeline Skill)
[ ] Rate Limiting nötig?
```

---

## Modell-Auswahl

| Modell | Kosten | Qualität | Ideal für |
|--------|--------|----------|-----------|
| `gemini-2.0-flash-lite` | sehr günstig | gut | Website FAQ-Bot, Lead-Qualifizierung |
| `gemini-2.0-flash` | günstig | sehr gut | Standard-Empfehlung |
| `gemini-2.5-flash` (Thinking off) | mittel | exzellent | Komplexe Beratungsbots |
| `claude-haiku-4-5` | günstig | sehr gut | Wenn Anthropic bevorzugt |

**Default-Empfehlung: `gemini-2.0-flash-lite`** für Website-Chatbots.

---

## Workflow

- [ ] API-Route erstellen (`app/api/chat/route.ts`)
- [ ] System-Prompt definieren (→ `writing-system-prompts` Skill)
- [ ] Streaming implementieren
- [ ] Rate Limiting einbauen
- [ ] Frontend-Komponente bauen (ChatBot.tsx)
- [ ] Umgebungsvariable in Amplify/Vercel setzen (→ `deploying-to-amplify` Skill)
- [ ] Mobile-Schließbar machen (Backdrop-Overlay!)

---

## API Route Template (Next.js)

```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Rate Limiting
const rateLimitMap = new Map<string, { count: number; expires: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 Min
const MAX_REQUESTS = 20;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now > record.expires) {
        rateLimitMap.set(ip, { count: 1, expires: now + WINDOW_MS });
        return false;
    }
    if (record.count >= MAX_REQUESTS) return true;
    record.count++;
    return false;
}

const SYSTEM_PROMPT = `[Hier System-Prompt einfügen — siehe writing-system-prompts Skill]`;

export async function POST(req: Request) {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        return Response.json({ error: 'API key missing' }, { status: 500 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    if (isRateLimited(ip)) {
        return new Response('Rate limit exceeded.', { status: 429 });
    }

    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-2.0-flash-lite'),
        system: SYSTEM_PROMPT,
        messages,
        temperature: 0.7,
    });

    return result.toTextStreamResponse();
}
```

**Benötigte Pakete:**
```bash
npm install ai @ai-sdk/google
```

**Umgebungsvariable:**
```
GOOGLE_GENERATIVE_AI_API_KEY=<key aus aistudio.google.com/app/apikey>
```

---

## Frontend: Mobile-Safe Close Pattern

Kritisch auf iOS Safari: immer einen Backdrop-Overlay einbauen, damit der Chat zuverlässig schließbar ist.

```tsx
{/* Mobile Backdrop — tap to close */}
{isOpen && (
    <div
        className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-sm md:hidden"
        onClick={() => setIsOpen(false)}
    />
)}
```

Close-Button Touch-Target: mindestens `w-11 h-11` (44px) — Apple HIG.

---

## Referenz-Implementation

Vollständiges Beispiel: `projects/axionea-website/src/components/ChatBot.tsx`

---

## Resources
- `resources/system-prompt-template.md` — Leere Vorlage für System-Prompts
- Wissensbasis via PDFs: → `skills/company/managing-rag-pipeline/`
- Deployment: → `skills/company/deploying-to-amplify/`
