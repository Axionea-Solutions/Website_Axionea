import { faqs } from "./faq-data";

// Wissensbasis für den Website-Chatbot "Ax" — wird als gecachter System-Block
// an die Chat-API übergeben. Quelle: sichtbarer Website-Content (Stand 2026-07).
// Pflege-Regel: Keine Service-Preise aufnehmen (Preis-Politik: Angebote nur im
// Erstgespräch). BAFA-/Fördersummen sind ok, das sind staatliche Zuschüsse.

const faqBlock = faqs
    .map((f) => `F: ${f.question}\nA: ${f.answer}`)
    .join("\n\n");

export const CHATBOT_KNOWLEDGE = `
# Über Axionea

Axionea Solutions GbR ist eine deutsche KI-Automatisierungsagentur für kleine und mittelständische Unternehmen (KMU) im DACH-Raum. Sitz: Leprosenweg 1b, 85080 Gaimersheim (Bayern). Gegründet 01.01.2026 von Maximilian Zvada (CEO) und Nico Fisseler (CTO). Kontakt: info@axionea-solutions.de, +49 173 1726939. Website: axionea-solutions.de.

Positionierung: Wir automatisieren, was Unternehmen täglich Zeit kostet — von der Terminbuchung bis zum Backoffice. Ohne dass der Kunde eine eigene IT-Abteilung braucht, ohne versteckte Kosten. Alles DSGVO-konform und EU-AI-Act-ready.

# Services (7 Kernleistungen)

1. KI-Strategie & Audit: Potenzialanalyse, Tool-Auswahl, EU-AI-Act-Compliance-Audit, ROI-Modellierung. Ergebnis: priorisierte Roadmap mit Quick-Wins. BAFA-förderfähig.
2. Chatbots & Termin-Assistenten: 24/7-Assistenten für Web/WhatsApp — Terminvereinbarung, Kundenfragen, Vorab-Einordnung neuer Anfragen. Integration in bestehende Systeme (z. B. HubSpot, Praxis-/Maklersoftware).
3. KI-Telefonassistent (Voice Agents): nimmt Anrufe entgegen, beantwortet FAQ, legt Termine direkt im System des Kunden an — auch nachts und am Wochenende.
4. Backoffice-Automatisierung: vernetzt bestehende Software (CRM, Kalender, E-Mail); KI erledigt wiederkehrende Aufgaben wie Datenübertragung und E-Mail-Sortierung. Integration statt Umstieg.
5. Interne Wissensassistenten (RAG): Assistent, der die eigenen Dokumente, Richtlinien und Abläufe des Kunden kennt und sofort Antworten liefert.
6. Branchen-KI-Tools: z. B. Exposé-Texter für Makler, KI-Dokumentation für Praxen, Beleg-Vorsortierung für Kanzleien.
7. KI-Schulungen: AI-Fluency-Workshops, Tool-Trainings, Train-the-Trainer — BAFA-förderfähig.

# Prozess (3 Schritte)

1. Analyse: Wir analysieren bestehende Abläufe und identifizieren, wo KI den größten Mehrwert liefert.
2. Mit Sicherheit deployen: Maßgeschneiderte KI-Systeme, sicher und zuverlässig, getestet vor Go-Live (Kick-off bis Go-Live typisch 2–4 Wochen).
3. Laufende Optimierung: Nach dem Deployment betreuen und optimieren wir die Systeme (optionales Retainer-Modell "Managed AI").

# Referenz-Branchen (eigene Seiten auf der Website)

- Arztpraxen (/ki-fuer-arztpraxen): KI-Telefonassistent, Terminbuchung, No-Show-Erinnerungen, Vorab-Anamnese. Kontext: Praxen verlieren laut KBV-Bürokratieindex ~7,4 Stunden pro Woche an Bürokratie.
- Kieferorthopäden (/ki-fuer-kieferorthopaeden): Praxis-Wiki, Patientenkommunikation, Dokumentation.
- Immobilienmakler (/ki-fuer-makler): 24/7-Exposé-Anfragen-Assistent, Lead-Qualifizierung, KI-Dokumentenanalyse (Energieausweise, Grundbuchauszüge), automatische Exposé-Texte.
- Steuerberater (/ki-fuer-steuerberater): Mandanten-Assistent für Standardfragen (Fristen, Unterlagen, Status), Beleg-Vorsortierung, Fristen-Automatik. Wichtig: Der Assistent gibt keine Steuerberatung, fachliche Fragen gehen priorisiert ans Kanzleiteam (EU-AI-Act-konforme Kennzeichnung).
- Die Lösungen funktionieren in jeder Branche mit wiederkehrenden Abläufen — die vier Branchen sind Referenzen, keine Einschränkung.

# Sicheres Hosting & Compliance (Sektion /#hosting)

- Ausschließlich EU-Rechenzentren — Daten verlassen Europa nicht.
- Durchgehende Verschlüsselung (TLS + at rest, Stand der Technik nach DSGVO Art. 32).
- Auftragsverarbeitungsvertrag (AVV, DSGVO Art. 28) inklusive. Keine KI-Trainings auf Kunden- oder Geschäftsdaten.
- Backups & Verfügbarkeit, laufendes Monitoring.
- Bot-Kennzeichnung nach EU AI Act: Nutzer wissen immer, dass sie mit einem Assistenten schreiben.

# Preise & Angebot

WICHTIG: Es gibt bewusst keine öffentliche Preisliste. NIEMALS konkrete Preise, Preisspannen oder Zahlen zu Kosten nennen — auch nicht auf Nachfrage. Stattdessen: Wir arbeiten mit transparenten Festpreisen statt Stundensätzen; der Einstieg ist ein KI-Potenzial-Check (BAFA-förderfähig mit bis zu 2.800 € Förderung), danach Festpreis-Pilotprojekte und optional das Retainer-Modell "Managed AI". Das konkrete Angebot gibt es im kostenlosen Erstgespräch.

# Förderung (/foerderung)

KI-Projekte in KMU sind fast immer förderfähig, oft kombinierbar. Wichtigste Programme: digital jetzt (BMWK, bis 50.000 €, KMU 3–499 MA), BAFA go-digital (bis 16.500 €, 50 % Zuschuss — Axionea ist autorisierter Berater), BAFA Beratungsförderung (bis 3.500 €), Bayern Digitalbonus (bis 50.000 €, bayerische KMU), KfW-Digitalisierungskredit, Mittelstand-Digital Zentren (kostenlos). Österreich: aws Digitalisierung (bis 50.000 €). Schweiz: Innosuisse (bis 15.000 CHF). Auf der Förderung-Seite gibt es einen interaktiven Förder-Check (3 Fragen). Axionea unterstützt bei der Antragstellung bis zum Verwendungsnachweis.

# ROI-Rechner (/#roi)

Interaktiver Rechner auf der Startseite: Branche wählen, Teamgröße/Stundenkosten/Routine-Stunden einstellen → zeigt monatliche Kosten repetitiver Arbeit, realistisches Einsparpotenzial und typische Amortisation. Basis: publizierte Studien (McKinsey, EY, Bitkom, ifo, KfW Research, MIT). Kernfakten daraus: Ohne professionelle Begleitung realisieren Unternehmen im Schnitt nur 25 % der angestrebten Einsparungen (McKinsey); nur ~5 % der GenAI-Piloten erreichen messbare Ergebniswirkung, extern begleitete Umsetzungen sind ~doppelt so erfolgreich (MIT, 2025). Das Ergebnis kann man sich als Report per E-Mail schicken lassen.

# Häufige Fragen (identisch mit der Website-FAQ)

${faqBlock}
`;
