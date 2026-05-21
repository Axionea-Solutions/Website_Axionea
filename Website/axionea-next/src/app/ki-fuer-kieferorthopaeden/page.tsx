import type { Metadata } from "next";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import Footer from "@/components/Footer";
import IndustryLanding from "@/components/landing/IndustryLanding";

export const metadata: Metadata = {
    title: "KI für Kieferorthopäden | Aligner-Anfragen automatisieren — Axionea",
    description: "KI-Lösungen für Kieferorthopädie-Praxen: Aligner-Anfragen 24/7, Konsultations-Routing, automatische Recall-Erinnerungen. DSGVO-konform, sofort einsetzbar.",
    keywords: [
        "KI für Kieferorthopäden",
        "Aligner Anfragen automatisieren",
        "KFO Praxis Automatisierung",
        "KI Kieferorthopädie",
        "Patientenkommunikation Kieferorthopäde",
    ],
    alternates: { canonical: "https://www.axionea-solutions.de/ki-fuer-kieferorthopaeden" },
    openGraph: {
        title: "KI für Kieferorthopäden | Axionea",
        description: "DSGVO-konforme KI für Aligner-Anfragen, Recalls, Konsultations-Routing — sofort einsetzbar.",
        url: "https://www.axionea-solutions.de/ki-fuer-kieferorthopaeden",
    },
};

const AlignerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 5.5C8 5.5 6 8 6 12s2 6.5 6 6.5 6-2.5 6-6.5-2-6.5-6-6.5z" />
        <path d="M9 9h6M9 15h6" />
    </svg>
);
const RouterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);
const BellIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);
const ChipIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M12 2v6m0 8v6m10-10h-6M8 12H2" />
    </svg>
);

export default function KiFuerKieferorthopaeden() {
    return (
        <>
            <AnimatedNavbar />
            <IndustryLanding
                chip="KIEFERORTHOPÄDIE"
                chipIcon={ChipIcon}
                headline="KI für Kieferorthopäden"
                subline="Aligner-Anfragen, Recalls und Konsultations-Routing — automatisiert auf KFO-Niveau."
                intro="Aligner-Anfragen kommen rund um die Uhr, der initiale Beratungsbedarf ist hoch, und Recall-Termine über die gesamte Behandlungs­dauer (oft 18–24 Monate) wollen sauber gesteuert sein. Wir bauen KI-Systeme, die diese Patient-Journey vollständig abbilden — von der ersten Aligner-Anfrage bis zur letzten Kontroll-Erinnerung."
                stats={[
                    { value: "24/7", label: "Aligner-Erstanfrage qualifiziert" },
                    { value: "+25%", label: "mehr qualifizierte Erstkonsultationen" },
                    { value: "auto.", label: "Recall-Sequenz über Behandlungszeitraum" },
                ]}
                useCases={[
                    {
                        title: "Aligner-Anfragen-Routing",
                        description: "Eingehende Aligner-Interessenten werden direkt qualifiziert: Bilder-Upload, Erstein­schätzung, Konsultations­buchung — alles ohne Wartezeit am Telefon.",
                        icon: AlignerIcon,
                    },
                    {
                        title: "Konsultations-Vorbereitung",
                        description: "KI-Agent sammelt Anamnese, Vorlieben (z.B. Behandlungs­dauer, Budget) und priorisiert die Konsultations-Liste für deinen ersten Termin-Tag.",
                        icon: RouterIcon,
                    },
                    {
                        title: "Recall-Automatisierung",
                        description: "Über die komplette Behandlungs­dauer von 18–24 Monaten erinnert das System Patienten automatisch an Kontroll­termine und Aligner-Wechsel.",
                        icon: BellIcon,
                    },
                ]}
                faqs={[
                    {
                        question: "Kann die KI Aligner-Selbstbilder bewerten?",
                        answer: "Wir setzen keine KI für medizinische Diagnostik ein — das bleibt bei dir. Was wir machen: Bilder werden strukturiert eingesammelt, in dein PVS einsortiert und für deine Erstein­schätzung vorbereitet, damit du in 2 Minuten siehst was du sonst per Mail-Pingpong klären müsstest.",
                    },
                    {
                        question: "Wie wird die DSGVO bei sensiblen Gesundheitsdaten gewahrt?",
                        answer: "EU-Hosting, AVV, keine Trainings­nutzung der Daten. Patienten geben explizit Einwilligung vor dem Bilder-Upload. Das gesamte System ist auf DSGVO Art. 9 (besondere Kategorien) ausgelegt.",
                    },
                    {
                        question: "Integriert ihr in unser PVS (Charly, Dampsoft, etc.)?",
                        answer: "Ja. Wir arbeiten standard­mäßig mit den üblichen KFO/Zahnarzt-PVS und nutzen entweder API-Integration oder Middleware. Beim Erstgespräch klären wir was bei euch sauber zu integrieren ist.",
                    },
                    {
                        question: "Was kostet das ungefähr?",
                        answer: "KI-Potenzial-Check ab 990 € (BAFA-förderfähig). Aligner-Routing-Pilot ab ca. 4.900 € Festpreis, Recall-Automatisierung ab ca. 2.900 €. Danach optional Retainer-Modell ab 490 €/Monat.",
                    },
                ]}
                ctaText="Aligner-Pipeline verdoppeln, Recalls automatisieren?"
            />
            <Footer />
        </>
    );
}
