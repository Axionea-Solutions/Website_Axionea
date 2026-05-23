/**
 * Inhalte der Kieferorthopäden-Landingpage (/ki-fuer-kieferorthopaeden).
 * Reiner Content — Icons werden in den Komponenten über `iconKey` aufgelöst
 * (siehe components/landing/praxis/icons.tsx), damit dieses File CMS-ready bleibt.
 */

import type { GraphicKey } from "@/components/landing/praxis/graphics/PraxisGraphics";

export type PraxisIconKey =
    | "aligner"
    | "router"
    | "bell"
    | "mail"
    | "userHeart"
    | "database"
    | "receipt"
    | "phone"
    | "users"
    | "fileSearch"
    | "handshake"
    | "vault"
    | "badgeEuro"
    | "shieldCheck"
    | "report"
    | "exit";

export interface PraxisStat {
    value: string;
    label: string;
}

export interface PraxisServiceCard {
    /** Eyebrow-Label, z.B. "Phase 1" oder "Inklusive". */
    phase: string;
    title: string;
    description: string;
    features: string[];
    iconKey: PraxisIconKey;
    /** Animierte Grafik im Karten-Header; ohne Wert wird der Icon-Header gezeigt. */
    graphicKey?: GraphicKey;
    /** Visuell zurückhaltender (z.B. Best-of-Breed-Block). */
    subtle?: boolean;
    /** KFO-spezifisch hervorgehoben. */
    highlight?: boolean;
}

export interface PraxisPhase {
    phase: string;
    duration: string;
    title: string;
    steps: string[];
}

export interface KnowledgeSource {
    label: string;
    detail: string;
}

export interface KnowledgeCategory {
    title: string;
    detail: string;
}

export interface KnowledgeAgent {
    title: string;
    description: string;
}

export interface PraxisDifferentiator {
    title: string;
    description: string;
    iconKey: PraxisIconKey;
}

export interface TrustCard {
    title: string;
    iconKey: PraxisIconKey;
    points: string[];
    ctaLabel: string;
    ctaHref: string;
}

/* ─────────────────── Hero Stats ─────────────────── */

export const kfoStats: PraxisStat[] = [
    { value: "24/7", label: "Aligner-Erstanfrage qualifiziert" },
    { value: "+25%", label: "mehr qualifizierte Erstkonsultationen" },
    { value: "auto.", label: "Recall-Sequenz über Behandlungszeitraum" },
];

/* ──────────── KFO-spezifische Use-Cases (bestehend, erhalten) ──────────── */

export const kfoUseCases: PraxisServiceCard[] = [
    {
        phase: "KFO-spezifisch",
        title: "Aligner-Anfragen-Routing",
        description:
            "Eingehende Aligner-Interessenten werden direkt qualifiziert: Bilder-Upload, Ersteinschätzung, Konsultations-Buchung — alles ohne Wartezeit am Telefon.",
        features: [
            "Strukturierter Bilder-Upload mit Einwilligung",
            "Automatische Erst-Qualifizierung",
            "Direkte Konsultations-Buchung",
            "Übergabe ins PVS",
        ],
        iconKey: "aligner",
        graphicKey: "chatbot",
        highlight: true,
    },
    {
        phase: "KFO-spezifisch",
        title: "Konsultations-Vorbereitung",
        description:
            "Der KI-Agent sammelt Anamnese, Vorlieben (z.B. Behandlungsdauer, Budget) und priorisiert die Konsultations-Liste für deinen ersten Termin-Tag.",
        features: [
            "Anamnese vorab eingesammelt",
            "Behandlungs- & Budget-Präferenzen",
            "Priorisierte Konsultations-Liste",
            "Vorbereitete Patientenakte",
        ],
        iconKey: "router",
        graphicKey: "engine",
        highlight: true,
    },
    {
        phase: "KFO-spezifisch",
        title: "Recall-Automatisierung",
        description:
            "Über die komplette Behandlungsdauer von 18–24 Monaten erinnert das System Patienten automatisch an Kontrolltermine und Aligner-Wechsel.",
        features: [
            "Erinnerung an Kontrolltermine",
            "Aligner-Wechsel-Sequenz",
            "Reaktivierung bei Ausbleiben",
            "Über gesamte Behandlungsdauer",
        ],
        iconKey: "bell",
        graphicKey: "recall",
        highlight: true,
    },
];

/* ──────────── Sechs Bausteine (modular kombinierbar) ──────────── */

export const kfoServicesIntro = {
    eyebrow: "BAUSTEINE",
    title: "Sechs Bausteine für eure Praxis.",
    subtitle: "Modular kombinierbar. Wir starten mit dem höchsten ROI für euch.",
};

export const kfoServiceCards: PraxisServiceCard[] = [
    {
        phase: "Phase 1",
        title: "E-Mail-Agent",
        description:
            "Eingehende Praxis-Mails werden automatisch klassifiziert, zusammengefasst und mit Antwortentwürfen versehen. Mehrere Postfächer in einer Oberfläche.",
        features: [
            "Triage nach Dringlichkeit",
            "Antwortvorlagen für Standardanfragen",
            "Bündelung mehrerer Postfächer",
            "DATEV-Schnittstelle für Rechnungen",
            "Lernt aus eurem Antwortstil",
            "Inklusive Team-Schulung",
        ],
        iconKey: "mail",
        graphicKey: "email",
    },
    {
        phase: "Phase 1",
        title: "Personal-Entlastung für die Praxisleitung",
        description:
            "1:1-Begleitung der Inhaber:in. In zwei Stunden bauen wir einen persönlichen Cloud-Workspace, der eure Postfächer, Kalender und Routinen automatisiert.",
        features: [
            "2-Stunden Cloud Deep-Dive",
            "Persönliche Postfächer angebunden",
            "Kalender- und Routinen-Automatisierung",
            "Notiz- und Ideenmanagement",
            "Optional Health-Daten-Integration",
            "Vertraulich, getrennt vom Team-Setup",
        ],
        iconKey: "userHeart",
    },
    {
        phase: "Phase 2",
        title: "Wissensdatenbank & Praxis-Agent",
        description:
            "Das zentrale Praxis-Gehirn. Behandlungsstandards, SOPs, FAQs, Onboarding-Material — durchsuchbar und rollenbasiert. Wissen bleibt in der Praxis.",
        features: [
            "Behandlungs-Wiki mit Quellen",
            "Patienten-FAQs & Antwortvorlagen",
            "SOPs & QM-Doku zentral abrufbar",
            "Onboarding für neue Mitarbeitende",
            "Rollenbasierter Zugriff",
            "Privater Inhaber:in-Bereich getrennt",
        ],
        iconKey: "database",
        graphicKey: "rag",
    },
    {
        phase: "Phase 3",
        title: "Abrechnungs-Agent",
        description:
            "Hilft beim Codieren von Behandlungspositionen, prüft Plausibilität, bereitet Abrechnungen vor. Aus dem Tagesablauf wird abends eine Prüfliste.",
        features: [
            "GOZ- und BEMA-Code-Vorschläge",
            "Plausibilitätsprüfung Positionen",
            "KZV-Antrag-Unterstützung",
            "DATEV-Anbindung",
        ],
        iconKey: "receipt",
        graphicKey: "billing",
    },
    {
        phase: "Phase 4",
        title: "Call-Agent",
        description:
            "Nimmt Standardanrufe ab — Termine, Auskünfte, Notfall-Erkennung. Mehrsprachig. Bei Unsicherheit immer Weiterleitung zum Team.",
        features: [
            "Terminbuchung & -verschiebung",
            "Standardauskünfte automatisiert",
            "Notfall-Erkennung mit Weiterleitung",
            "4 Sprachen (DE · EN · TR · ES)",
        ],
        iconKey: "phone",
        graphicKey: "call",
    },
    {
        phase: "Inklusive",
        title: "Schulungs-Workshop für das ganze Team",
        description:
            "Vier-Modul-Workshop, halbtags, vor Ort oder remote. Aus skeptischen Mitarbeitenden werden Anwender:innen. BAFA-förderfähig.",
        features: [
            "Modul 1: KI verstehen ohne Jargon",
            "Modul 2: Prompt-Engineering hands-on",
            "Modul 3: Quick Wins für den Praxisalltag",
            "Modul 4: Eigene Use Cases identifizieren",
            "BAFA-Antrag wird mit begleitet",
            "Optional vor Ort",
        ],
        iconKey: "users",
    },
    {
        phase: "Auswahl & Setup",
        title: "Dokumentations-Tool",
        description:
            "Wir bauen es nicht selbst, wir wählen das Beste für euch. Für Sprach-zu-Text-Dokumentation am Behandlungsstuhl gibt es bereits ausgezeichnete DSGVO-konforme Tools. Wir liefern Marktrecherche, Empfehlung, fachliche Konfiguration und Integration in eure Workflows.",
        features: [
            "Marktrecherche & Empfehlung",
            "Fachliche Konfiguration",
            "Integration in eure Workflows",
        ],
        iconKey: "fileSearch",
        subtle: true,
    },
];

/* ──────────── Phasen-Roadmap ──────────── */

export const kfoRoadmapIntro = {
    eyebrow: "VORGEHEN",
    title: "Wie wir vorgehen.",
    subtitle: "Vom Quick Win bis zur Skalierung — modular, in eurem Tempo.",
};

export const kfoPhases: PraxisPhase[] = [
    {
        phase: "Phase 1",
        duration: "4–6 Wochen",
        title: "Quick Wins",
        steps: ["E-Mail-Agent live", "Postfächer gebündelt", "Cloud Deep-Dive", "Team-Briefing"],
    },
    {
        phase: "Phase 2",
        duration: "2–4 Monate",
        title: "Wissens-Fundament",
        steps: ["Knowledge Base", "Praxis-Agent", "SOPs & FAQs", "Team-Schulung"],
    },
    {
        phase: "Phase 3",
        duration: "4–6 Monate",
        title: "Spezial-Agenten",
        steps: ["Abrechnungs-Agent", "Call-Agent", "Doku-Tool-Setup", "Workflows tiefer"],
    },
    {
        phase: "Phase 4",
        duration: "ab 6 Monate",
        title: "Skalierung",
        steps: ["Partner-Status", "Quartals-Reviews", "Multi-Standort", "Strategie-Calls"],
    },
];

export const kfoRoadmapBanner = {
    claim: "Wir bauen nicht einmal und verschwinden. Wir bleiben dran.",
    subtitle: "Durchlaufend: Partnerschaft, monatliche Reports, Team-Schulung, BAFA-Begleitung.",
};

/* ──────────── Knowledge-Base-Architektur ──────────── */

export const kfoArchitectureIntro = {
    eyebrow: "ARCHITEKTUR",
    title: "Eine Quelle. Drei Agenten. Saubere Trennung.",
    subtitle: "So bauen wir eure Praxis-Wissensbasis auf — und wer welche Antworten bekommt.",
};

export const knowledgeSources: KnowledgeSource[] = [
    { label: "Praxissoftware", detail: "Behandlungsdaten" },
    { label: "SOPs & Doku", detail: "PDFs, Word, Notion" },
    { label: "E-Mail-Postfächer", detail: "Outlook, M365, Gmail" },
    { label: "Team-Wissen", detail: "Interviews & Inputs" },
];

export const knowledgeBase = {
    title: "Knowledge Base · euer zentrales Praxis-Gehirn",
    subtitle: "DSGVO-konform · EU-gehostet · rollenbasierter Zugriff",
    categories: [
        { title: "Behandlungs-Wiki", detail: "SOPs · Standards · Specials" },
        { title: "Abrechnung & FAQs", detail: "GOZ · BEMA · Patienten-FAQs" },
        { title: "Personal & Onboarding", detail: "Rollen · Schulung · Kultur" },
    ] as KnowledgeCategory[],
};

export const knowledgeAgents: KnowledgeAgent[] = [
    { title: "Team-Agent", description: "Für alle Mitarbeitenden. Behandlung & Prozesse." },
    { title: "Verwaltungs-Agent", description: "Empfang & Abrechnung. E-Mail & KPIs." },
    { title: "Inhaber:in-Agent", description: "Voll-Zugriff + privat. Strategie & Persönliches." },
];

/* ──────────── Differenzierung ──────────── */

export const kfoDifferentiatorsIntro = {
    eyebrow: "UNTERSCHIED",
    title: "Was Axionea anders macht.",
    subtitle: "Sechs Gründe, warum Praxen mit uns arbeiten.",
};

export const kfoDifferentiators: PraxisDifferentiator[] = [
    {
        title: "Partnerschaft statt Agentur",
        description: "Wir bauen nicht einmal und verschwinden.",
        iconKey: "handshake",
    },
    {
        title: "Wissen bleibt in der Praxis",
        description: "Tools, die euch gehören.",
        iconKey: "vault",
    },
    {
        title: "BAFA-Antrag inklusive",
        description: "Bis zu 2.800 € Förderung.",
        iconKey: "badgeEuro",
    },
    {
        title: "DSGVO & EU-Hosting",
        description: "Patientendaten bleiben sicher.",
        iconKey: "shieldCheck",
    },
    {
        title: "Monatliche Reports",
        description: "Anrufe, Stunden, EUR — schwarz auf weiß.",
        iconKey: "report",
    },
    {
        title: "30 Tage Ausstiegsklausel",
        description: "Wir verdienen jeden Monat.",
        iconKey: "exit",
    },
];

/* ──────────── Förderung & DSGVO Trust-Block ──────────── */

export const kfoTrustIntro = {
    eyebrow: "FÖRDERUNG & SICHERHEIT",
    title: "Gefördert starten. Sicher betrieben.",
    subtitle: "Bis zu 2.800 € BAFA-Förderung und DSGVO als Standard — nicht als Aufpreis.",
};

export const kfoTrustCards: TrustCard[] = [
    {
        title: "BAFA-Förderung",
        iconKey: "badgeEuro",
        points: [
            "Bis zu 2.800 € pro Antrag",
            "Wir begleiten den Antragsprozess",
            "Förderfähig: Beratung, Implementierung, Schulung",
        ],
        ctaLabel: "Förderung prüfen lassen",
        ctaHref: "/#kontakt",
    },
    {
        title: "DSGVO & Sicherheit",
        iconKey: "shieldCheck",
        points: [
            "AVV als Standard mit jedem Projekt",
            "EU-gehostete Infrastruktur",
            "Optional lokales Hosting für Patientendaten",
        ],
        ctaLabel: "Sicherheitskonzept anfragen",
        ctaHref: "/#kontakt",
    },
];

/* ──────────── FAQ (bestehend, erhalten) ──────────── */

export interface PraxisFAQ {
    question: string;
    answer: string;
}

export const kfoFaqs: PraxisFAQ[] = [
    {
        question: "Kann die KI Aligner-Selbstbilder bewerten?",
        answer:
            "Wir setzen keine KI für medizinische Diagnostik ein — das bleibt bei dir. Was wir machen: Bilder werden strukturiert eingesammelt, in dein PVS einsortiert und für deine Ersteinschätzung vorbereitet, damit du in 2 Minuten siehst was du sonst per Mail-Pingpong klären müsstest.",
    },
    {
        question: "Wie wird die DSGVO bei sensiblen Gesundheitsdaten gewahrt?",
        answer:
            "EU-Hosting, AVV, keine Trainingsnutzung der Daten. Patienten geben explizit Einwilligung vor dem Bilder-Upload. Das gesamte System ist auf DSGVO Art. 9 (besondere Kategorien) ausgelegt.",
    },
    {
        question: "Integriert ihr in unser PVS?",
        answer:
            "Ja. Wir arbeiten standardmäßig mit den üblichen KFO/Zahnarzt-PVS und nutzen entweder API-Integration oder Middleware. Beim Erstgespräch klären wir was bei euch sauber zu integrieren ist.",
    },
    {
        question: "Was kostet das ungefähr?",
        answer:
            "KI-Potenzial-Check ab 990 € (BAFA-förderfähig). Aligner-Routing-Pilot ab ca. 4.900 € Festpreis, Recall-Automatisierung ab ca. 2.900 €. Danach optional Retainer-Modell ab 490 €/Monat.",
    },
];

export const kfoCtaText = "Aligner-Pipeline verdoppeln, Recalls automatisieren?";
