import type { Metadata } from "next";
import Footer from "@/components/Footer";
import IndustryLanding from "@/components/landing/IndustryLanding";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "KI für Arztpraxen | DSGVO-konform, sofort einsetzbar — Axionea",
    description: "KI-Lösungen für Arztpraxen: Telefon-Assistent, WhatsApp-Bot, automatische Erinnerungen gegen No-Shows. DSGVO-konform, EU-Hosting, EU-AI-Act-ready. Kostenloses Erstgespräch.",
    keywords: [
        "KI für Arztpraxen",
        "KI Praxis",
        "Patientenanfragen automatisieren",
        "Telefon-Assistent Arzt",
        "DSGVO KI Arztpraxis",
        "No-Show reduzieren",
        "Anrufbeantworter KI",
    ],
    alternates: { canonical: "https://www.axionea-solutions.de/ki-fuer-arztpraxen" },
    openGraph: {
        title: "KI für Arztpraxen | Axionea",
        description: "DSGVO-konforme KI für Patientenanfragen, Terminbuchung, Anamnese — sofort einsetzbar.",
        url: "https://www.axionea-solutions.de/ki-fuer-arztpraxen",
    },
};

const PhoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const ChatIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const CalendarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const ChipIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

export default function KiFuerArztpraxen() {
    return (
        <>
            <IndustryLanding
                chip="ARZTPRAXEN"
                chipIcon={ChipIcon}
                headline="KI für Arztpraxen"
                subline="Telefon, WhatsApp, Erinnerungen — alles automatisiert, DSGVO-konform, sofort einsetzbar."
                intro="Die Praxis klingelt durchgehend, die Rezeption ist überlastet, und die No-Show-Quote frisst Umsatz. Wir bauen KI-Systeme, die genau diese Engpässe lösen — von der ersten Patientenanfrage bis zur Termin-Erinnerung. EU-Hosting, AVV-Standard, ohne Training auf Patientendaten."
                stats={[
                    { value: "24/7", label: "Erreichbarkeit ohne zusätzliches Personal" },
                    { value: "−30%", label: "No-Show-Quote durch smarte Erinnerungen" },
                    { value: "<3 Wo.", label: "vom Erstgespräch bis Go-Live" },
                ]}
                useCases={[
                    {
                        title: "KI-Telefon-Assistent",
                        description: "Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine direkt in deinem Praxis­system. Auch nachts und am Wochenende.",
                        icon: PhoneIcon,
                    },
                    {
                        title: "WhatsApp- & Web-Chatbot",
                        description: "Patientenanfragen via WhatsApp oder Website-Chat. Vorab-Anamnese, FAQ, Terminvergabe — DSGVO-konform integriert.",
                        icon: ChatIcon,
                    },
                    {
                        title: "Automatische Erinnerungen",
                        description: "Smarte Reminder-Sequenz (SMS / WhatsApp / E-Mail) reduziert No-Shows messbar. Patienten können einfach bestätigen oder verschieben.",
                        icon: CalendarIcon,
                    },
                ]}
                faqs={[
                    {
                        question: "Wie funktioniert das mit der DSGVO bei Patientendaten?",
                        answer: "Alle Daten bleiben in der EU (Hosting in Deutschland oder Frankreich), wir schließen einen Auftrags­verarbeitungs­vertrag ab und nutzen ausschließlich KI-Modelle, die nicht auf deinen Daten trainieren. Auf Wunsch begleiten wir euch zusätzlich durch die volle EU-AI-Act-Compliance.",
                    },
                    {
                        question: "Kann der Telefon-Assistent unsere Praxis-Software bedienen?",
                        answer: "Ja. Wir integrieren in die gängigen Praxisverwaltungs-Systeme (PVS) und Kalender — direkt über die API oder via Middleware. Termine landen automatisch im richtigen Slot beim richtigen Behandler.",
                    },
                    {
                        question: "Was passiert wenn der Patient ein komplexes medizinisches Anliegen hat?",
                        answer: "Die KI erkennt das und leitet sofort an euer Team weiter — entweder per Rückruf-Anfrage oder als Notiz im PVS. Wir trainieren das System auf eure individuellen Eskalations-Regeln.",
                    },
                    {
                        question: "Wie lange dauert die Einrichtung?",
                        answer: "Vom Kick-off bis Go-Live in der Regel 2–4 Wochen. Wir starten mit einer Workflow-Analyse, bauen einen Pilot, testen mit echten Anrufen und gehen dann schrittweise live.",
                    },
                    {
                        question: "Was kostet das ungefähr?",
                        answer: "Das hängt von euren Anforderungen ab — pauschale Preislisten gibt es bei uns nicht. Der Einstieg ist ein KI-Potenzial-Check (BAFA-förderfähig mit bis zu 80 % Förderung), Pilotprojekte setzen wir zum Festpreis um, optional mit Retainer für Betrieb und Optimierung. Euer konkretes Angebot bekommt ihr im kostenlosen Erstgespräch.",
                    },
                ]}
                ctaText="Bereit, deine Praxis-Telefonie zu entlasten?"
            />
            <BreadcrumbSchema name="KI für Arztpraxen" path="/ki-fuer-arztpraxen" />
            <Footer />
        </>
    );
}
