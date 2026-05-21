import type { Metadata } from "next";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import IndustryLanding from "@/components/landing/IndustryLanding";

export const metadata: Metadata = {
    title: "KI für Immobilienmakler | Exposé-Anfragen 24/7 — Axionea",
    description: "KI-Lösungen für Immobilienmakler: 24/7 Exposé-Anfragen, automatische Lead-Qualifizierung, Dokumentenanalyse. Mehr Zeit für Vor-Ort-Termine. DSGVO-konform.",
    keywords: [
        "KI für Makler",
        "KI Immobilienmakler",
        "Exposé Anfragen automatisieren",
        "Lead Qualifizierung Immobilien",
        "Immobilien KI",
        "Dokumentenanalyse Makler",
    ],
    alternates: { canonical: "https://www.axionea-solutions.de/ki-fuer-makler" },
    openGraph: {
        title: "KI für Immobilienmakler | Axionea",
        description: "24/7 Exposé-Anfragen, Echtzeit-Lead-Qualifizierung, KI-Dokumentenanalyse — sofort einsetzbar.",
        url: "https://www.axionea-solutions.de/ki-fuer-makler",
    },
};

const HouseIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);
const FilterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);
const DocIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);
const ChipIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
);

export default function KiFuerMakler() {
    return (
        <>
            <AnimatedNavbar />
            <IndustryLanding
                chip="MAKLER"
                chipIcon={ChipIcon}
                headline="KI für Immobilienmakler"
                subline="24/7 Exposé-Anfragen, automatische Lead-Qualifizierung, Dokumentenanalyse — mehr Zeit für Vor-Ort-Termine."
                intro="Exposé-Anfragen kommen abends und am Wochenende — wenn du sie morgens beantwortest, ist der Interessent oft schon weg. Lead-Qualifizierung kostet pro Anfrage 20–30 Minuten. Energieausweise und Teilungs­erklärungen wollen ausgewertet werden. Wir bauen KI-Systeme die genau diese Routine-Arbeit übernehmen, damit du dich auf das konzentrierst was wirklich Provision bringt: Besichtigungen und Verhandlungen."
                stats={[
                    { value: "24/7", label: "Exposé-Anfragen werden direkt qualifiziert" },
                    { value: "<2 Min", label: "Antwortzeit auf erste Interessenten-Mail" },
                    { value: "−15h/Wo.", label: "weniger Routine-Aufgaben pro Makler" },
                ]}
                useCases={[
                    {
                        title: "24/7 Exposé-Agent",
                        description: "Eingehende Anfragen werden sofort beantwortet, Eckdaten geklärt (Budget, Lage, Objekttyp), Besichtigungs­termine vorgeschlagen — auch um 23:00 Uhr.",
                        icon: HouseIcon,
                    },
                    {
                        title: "Lead-Qualifizierung in Echtzeit",
                        description: "KI prüft Bonität-Signale, Finanzierungs­bereitschaft und Match-Qualität gegen dein Portfolio. Nur passende Leads landen auf deinem Schreibtisch.",
                        icon: FilterIcon,
                    },
                    {
                        title: "KI-Dokumentenanalyse",
                        description: "Energieausweise, Grundbuchauszüge, Teilungs­erklärungen — die KI extrahiert die Kern-Eckdaten und legt sie strukturiert ab. Du checkst statt zu suchen.",
                        icon: DocIcon,
                    },
                ]}
                faqs={[
                    {
                        question: "Wie funktioniert die Integration in unser CRM (Onoffice, Flowfact, Propstack)?",
                        answer: "Wir arbeiten mit den gängigen Makler-CRMs entweder über deren API oder via Middleware. Bei Onoffice, Flowfact und Propstack haben wir Standard-Integrationen, andere Systeme klären wir im Erstgespräch.",
                    },
                    {
                        question: "Was passiert wenn ein Interessent etwas Komplexes fragt?",
                        answer: "Die KI erkennt das (z.B. Erbbaurecht, Sonder­situationen) und übergibt nahtlos an dich — entweder per Rückruf-Anfrage oder als priorisierte Notiz im CRM. Du verlierst keinen Lead durch zu viel Automatisierung.",
                    },
                    {
                        question: "Wie ist das mit der DSGVO bei Interessenten-Daten?",
                        answer: "EU-Hosting, AVV, keine Training-Nutzung der Daten. Wir setzen außerdem auf transparente Bot-Kennzeichnung gemäß EU AI Act — Interessenten wissen immer, mit wem sie schreiben.",
                    },
                    {
                        question: "Was kostet das ungefähr?",
                        answer: "KI-Potenzial-Check ab 990 € (BAFA-förderfähig). Exposé-Agent-Pilot ab ca. 3.900 € Festpreis. Dokumentenanalyse-Modul ab ca. 2.400 €. Danach Retainer ab 490 €/Monat — typischer ROI in <3 Monaten.",
                    },
                ]}
                ctaText="Mehr Provision durch weniger Routine?"
            />
            <Footer />
        </>
    );
}
