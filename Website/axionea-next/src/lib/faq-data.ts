// Zentrale FAQ-Datenquelle — wird von FAQ.tsx (sichtbares Accordion) UND
// StructuredData.tsx (FAQPage JSON-LD) gelesen. Google verlangt, dass das
// Schema exakt den sichtbaren Fragen entspricht — deshalb nur hier pflegen.

export interface FaqEntry {
    question: string;
    answer: string;
}

export const faqs: FaqEntry[] = [
    {
        question: "Was genau macht Axionea?",
        answer: "Axionea automatisiert Geschäftsprozesse mit KI — von Chatbots für die Terminvereinbarung über KI-Telefonassistenten bis hin zu internen Wissens-Chatbots. Wir analysieren deine Abläufe und richten maßgeschneiderte KI-Lösungen für dich ein.",
    },
    {
        question: "Brauche ich technisches Wissen, um mit Axionea zu arbeiten?",
        answer: "Nein, überhaupt nicht. Wir kümmern uns um die gesamte technische Umsetzung. Du brauchst keine IT-Abteilung und keine Programmierkenntnisse — wir erklären alles verständlich und richten alles für dich ein.",
    },
    {
        question: "Wie lange dauert die Implementierung?",
        answer: "Je nach Komplexität zwischen 2 und 6 Wochen. Ein einfacher KI-Chatbot für die Terminbuchung kann in wenigen Tagen live sein, während umfassende Workflow-Automatisierungen etwas mehr Zeit benötigen. Du bekommst einen klaren Zeitplan im Vorfeld.",
    },
    {
        question: "Für welche Branchen ist Axionea geeignet?",
        answer: "Für jede Branche, in der wiederkehrende Abläufe Zeit kosten — Terminverwaltung, Kundenanfragen, Dokumentenarbeit. Besonders viel Erfahrung haben wir in Arztpraxen, bei Kieferorthopäden, Immobilienmaklern und Steuerberatern gesammelt.",
    },
    {
        question: "Ist eure KI DSGVO-konform?",
        answer: "Ja. Wir arbeiten ausschließlich mit EU-Hosting, schließen Auftragsverarbeitungsverträge (AVV) ab und nutzen KI-Modelle ohne Training auf euren Daten. Sensible Daten werden niemals unkontrolliert verarbeitet. Auf Wunsch begleiten wir euch durch die vollständige EU-AI-Act-Compliance.",
    },
    {
        question: "Was kostet ein Einstieg mit Axionea?",
        answer: "Unser KI-Potenzial-Check startet ab 990 € — BAFA-förderfähig mit bis zu 2.800 € Förderung. Danach wisst ihr genau, was sich lohnt, bevor ihr investiert. Daneben bieten wir Festpreis-Pilotprojekte und ein monatliches Retainer-Modell (Managed AI) an.",
    },
    {
        question: "Bietet ihr auch Schulungen für unser Team an?",
        answer: "Ja, wir bieten spezielle KI-Schulungen, AI-Fluency-Workshops und Train-the-Trainer-Programme an. So stellen wir sicher, dass euer gesamtes Team die neuen Tools sicher und effizient nutzen kann.",
    },
];
