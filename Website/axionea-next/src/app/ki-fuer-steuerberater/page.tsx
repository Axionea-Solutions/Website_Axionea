import type { Metadata } from "next";
import Footer from "@/components/Footer";
import IndustryLanding from "@/components/landing/IndustryLanding";

export const metadata: Metadata = {
    title: "KI für Steuerberater | Mandantenanfragen & Belege automatisieren — Axionea",
    description: "KI-Lösungen für Steuerkanzleien: Mandanten-Assistent für Standardfragen, automatische Beleg-Vorsortierung, Fristen-Erinnerungen. DSGVO-konform, EU-Hosting. Kostenloses Erstgespräch.",
    keywords: [
        "KI für Steuerberater",
        "KI Steuerkanzlei",
        "Mandantenanfragen automatisieren",
        "Belege digitalisieren KI",
        "DATEV KI",
        "Kanzlei Automatisierung",
        "Fristen Erinnerung automatisch",
    ],
    alternates: { canonical: "https://www.axionea-solutions.de/ki-fuer-steuerberater" },
    openGraph: {
        title: "KI für Steuerberater | Axionea",
        description: "Mandanten-Assistent, Beleg-Vorsortierung, Fristen-Automatik — DSGVO-konform, sofort einsetzbar.",
        url: "https://www.axionea-solutions.de/ki-fuer-steuerberater",
    },
};

const ChatIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const InboxIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
);
const BellIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);
const ChipIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
);

export default function KiFuerSteuerberater() {
    return (
        <>
            <IndustryLanding
                chip="STEUERBERATER"
                chipIcon={ChipIcon}
                headline="KI für Steuerberater"
                subline="Mandanten-Assistent, automatische Beleg-Vorsortierung, Fristen-Automatik — mehr Zeit für Beratung statt Verwaltung."
                intro="Dieselben Mandantenfragen jeden Tag: Welche Unterlagen fehlen? Wie ist der Stand? Wann ist die Frist? Dazu Belege, die sortiert und zugeordnet werden wollen — bei Personalmangel bleibt die eigentliche Beratung liegen. Wir bauen KI-Systeme, die genau diese Routine übernehmen, damit sich deine Kanzlei auf das konzentriert, was Honorar bringt: Gestaltungsberatung und Mandantenbindung."
                stats={[
                    { value: "24/7", label: "Standardfragen der Mandanten werden sofort beantwortet" },
                    { value: "−10h/Wo.", label: "weniger Routine-Kommunikation pro Kanzlei" },
                    { value: "100%", label: "der Belege vorstrukturiert statt lose im Posteingang" },
                ]}
                useCases={[
                    {
                        title: "Mandanten-Assistent",
                        description: "Beantwortet Standardfragen zu Fristen, Unterlagen und Bearbeitungsstand — per Web-Chat oder E-Mail, rund um die Uhr. Komplexe Fälle gehen priorisiert an dein Team.",
                        icon: ChatIcon,
                    },
                    {
                        title: "Beleg-Vorsortierung",
                        description: "Eingehende Belege und Dokumente werden erkannt, klassifiziert und mit Kerndaten strukturiert abgelegt — anschlussfähig an eure Kanzleisoftware statt loser Mail-Anhänge.",
                        icon: InboxIcon,
                    },
                    {
                        title: "Fristen- & Unterlagen-Automatik",
                        description: "Fehlende Unterlagen werden automatisch und freundlich nachgefordert, Fristen-Erinnerungen gehen ohne Zutun raus. Kein manuelles Nachfassen mehr.",
                        icon: BellIcon,
                    },
                ]}
                faqs={[
                    {
                        question: "Wie passt KI zu Verschwiegenheitspflicht und § 203 StGB?",
                        answer: "Alle Systeme laufen auf EU-Hosting mit Auftragsverarbeitungsvertrag, Mandantendaten werden nie als Trainingsdaten genutzt und Zugriffe sind auf das Nötigste beschränkt. Die konkrete Ausgestaltung stimmen wir im Erstgespräch mit euch bzw. eurem Datenschutzbeauftragten ab.",
                    },
                    {
                        question: "Funktioniert das mit DATEV und unserer Kanzleisoftware?",
                        answer: "Wir integrieren über die vorhandenen Schnittstellen eurer Systeme oder arbeiten mit strukturierten Übergabeformaten, die eure Software importieren kann. Was konkret bei euch im Einsatz ist, klären wir im Erstgespräch — die Lösung passt sich eurer Umgebung an, nicht umgekehrt.",
                    },
                    {
                        question: "Was passiert bei fachlichen oder heiklen Mandantenfragen?",
                        answer: "Der Assistent beantwortet nur Organisatorisches (Fristen, Unterlagen, Status) und gibt keine Steuerberatung. Fachliche Fragen erkennt er und übergibt sie priorisiert an euer Team — der Mandant weiß dabei jederzeit, dass er mit einem Assistenten schreibt (EU-AI-Act-konforme Kennzeichnung).",
                    },
                    {
                        question: "Was kostet das ungefähr?",
                        answer: "Das hängt vom Umfang ab — pauschale Preislisten gibt es bei uns nicht. Der Einstieg ist ein KI-Potenzial-Check (BAFA-förderfähig mit bis zu 2.800 € Förderung), danach wisst ihr genau, was sich für eure Kanzlei lohnt. Pilotprojekte setzen wir zum Festpreis um — euer konkretes Angebot bekommt ihr im kostenlosen Erstgespräch.",
                    },
                ]}
                ctaText="Mehr Beratung, weniger Verwaltung?"
            />
            <Footer />
        </>
    );
}
