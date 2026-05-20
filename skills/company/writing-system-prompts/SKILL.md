---
name: writing-system-prompts
description: >
  Crafts effective system prompts for AI chatbots and assistants, covering
  persona definition, knowledge injection, behavioral rules, and output format.
  Use when defining a chatbot's personality, writing an AI assistant's
  instructions, or improving an existing system prompt. Trigger when user says
  "System Prompt schreiben", "KI-Persönlichkeit definieren", "Chatbot
  konfigurieren", "Prompt Engineering", or asks what the bot should know/do.
---

# Writing System Prompts

## When to use this skill
- Neuen Chatbot-Charakter für Kundenprojekt definieren
- Bestehendem Bot mehr Wissen oder schärfere Regeln geben
- Bot antwortet zu allgemein oder off-topic
- Wissensbasis aus PDFs in Prompt einbauen (→ managing-rag-pipeline)

---

## Anatomie eines System-Prompts

Ein guter System-Prompt hat 4 Blöcke — in dieser Reihenfolge:

```
1. PERSONA     — Wer ist der Bot? Name, Charakter, Ton
2. KONTEXT     — Was macht das Unternehmen? Welches Wissen soll er haben?
3. WISSENSBASIS — Produkte, FAQs, Dokumente (ggf. aus PDFs injiziert)
4. REGELN      — Was darf/muss/soll er tun? Was ist verboten?
```

---

## Template

```
Du bist "[NAME]", [KURZE PERSONA-BESCHREIBUNG] von [UNTERNEHMEN].
Deine Aufgabe: [ZIEL IN EINEM SATZ].

## Über [UNTERNEHMEN]
- Gegründet: [JAHR], Standort: [ORT]
- Zielkunden: [ZIELGRUPPE]
- Kernleistungen:
  • [LEISTUNG 1] — [was es bewirkt]
  • [LEISTUNG 2] — [was es bewirkt]
- USP: [Was unterscheidet das Unternehmen?]
- Preise: [Einstieg / Pakete / auf Anfrage]

## Häufige Fragen & Antworten
F: [Frage 1]
A: [Antwort 1]

F: [Frage 2]
A: [Antwort 2]

## Kontakt & nächste Schritte
[Wie soll der Bot Interessenten weiterleiten? CTA, Link, Formular?]

## Regeln
- Sprache: Deutsch (Du-Form)
- Ton: [präzise & sachlich / freundlich & locker / professionell]
- Antworte kurz (2–4 Sätze) außer bei Erklärungsbedarf
- Erfinde keine Leistungen oder Preise
- Bei unbekannten Fragen: "Das beantworte ich gerne persönlich — [CTA]"
- Verbotene Begriffe: "revolutionär", "disruptiv", "transformativ", "KI-Lösung"
```

---

## Dos & Don'ts

**Do:**
- Konkrete Zahlen statt vage Aussagen ("80% Zeitersparnis" statt "viel Zeit sparen")
- Klare Verbote für Off-Topic-Fragen einbauen
- Explizit sagen in welcher Sprache und welchem Ton geantwortet wird
- FAQs direkt im Prompt als F/A-Paare

**Don't:**
- Zu langer Prompt ohne Struktur — LLM verliert den Faden
- Widersprüchliche Regeln ("sei freundlich" + "antworte nur auf X")
- Keine Regeln für Edge Cases (was wenn jemand unhöflich ist?)
- Buzzwords aus der Verbotsliste

---

## Axionea-spezifisch (für eigene Website)

Verbotene Wörter laut Brand-Identity:
`revolutionär`, `disruptiv`, `transformativ`, `signifikant`, `KI-Lösung`, `Ökosystem`

Standard-CTAs: `"Jetzt starten →"`, `"Kostenlos beraten lassen"`, `"Demo ansehen"`

---

## Qualitätsprüfung

Teste den Prompt mit diesen Fragen:
- [ ] Was kostet ihr? → Gibt er eine sinnvolle Antwort?
- [ ] Kannst du mir helfen meinen Haushalt zu organisieren? → Wird er korrekt abgewiesen?
- [ ] Ich will mehr erfahren → Verweist er auf den richtigen CTA?
- [ ] [Produkt aus dem Dokument] → Kann er konkret antworten?
