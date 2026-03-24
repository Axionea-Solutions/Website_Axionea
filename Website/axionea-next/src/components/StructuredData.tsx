/**
 * StructuredData — JSON-LD Komponente für SEO
 *
 * Enthält:
 * - Organization Schema
 * - WebSite Schema mit SearchAction
 * - FAQPage Schema
 * - LocalBusiness Schema
 */

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://axionea.de/#organization",
    name: "Axionea",
    legalName: "Axionea GbR",
    url: "https://axionea.de",
    logo: {
        "@type": "ImageObject",
        url: "https://axionea.de/assets/logo/Asset 4@4x.png",
        width: 400,
        height: 400,
    },
    description:
        "Axionea automatisiert repetitive Prozesse in kleinen und mittelständischen Unternehmen — ohne eigene IT-Abteilung, ohne monatelange Einführung, ohne Enterprise-Budget. DSGVO-konform. Server in Deutschland.",
    foundingDate: "2025",
    founders: [
        {
            "@type": "Person",
            name: "Maximilian Zvada",
            jobTitle: "CEO & Founder",
        },
        {
            "@type": "Person",
            name: "Nico Fisseler",
            jobTitle: "CTO & Founder",
        },
    ],
    address: {
        "@type": "PostalAddress",
        streetAddress: "Leprosenweg 1b",
        postalCode: "85080",
        addressLocality: "Gaimersheim",
        addressCountry: "DE",
    },
    contactPoint: [
        {
            "@type": "ContactPoint",
            email: "info@axionea-solutions.de",
            contactType: "customer service",
            availableLanguage: ["German"],
        },
    ],
    areaServed: ["DE", "AT", "CH"],
    knowsAbout: [
        "KI-Automatisierung",
        "Prozessautomatisierung",
        "KI-Chatbots",
        "Voice Agents",
        "Workflow Automatisierung",
        "KI-Agenten",
        "No-Code Automatisierung",
        "DSGVO-konforme KI",
    ],
    sameAs: [],
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://axionea.de/#website",
    url: "https://axionea.de",
    name: "Axionea",
    description: "KI-Automatisierung für den Mittelstand",
    publisher: {
        "@id": "https://axionea.de/#organization",
    },
    inLanguage: "de-DE",
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://axionea.de/#localbusiness",
    name: "Axionea",
    image: "https://axionea.de/og-image.png",
    url: "https://axionea.de",
    telephone: "+49 173 1726939",
    email: "info@axionea-solutions.de",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Leprosenweg 1b",
        postalCode: "85080",
        addressLocality: "Gaimersheim",
        addressRegion: "Bayern",
        addressCountry: "DE",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 48.814,
        longitude: 11.381,
    },
    areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 51.1657,
            longitude: 10.4515,
        },
        geoRadius: "1000000",
    },
    serviceType: [
        "KI-Automatisierung",
        "KI-Chatbot Entwicklung",
        "Voice Agent Entwicklung",
        "Prozessautomatisierung",
        "KI-Strategie Beratung",
        "Workflow Automatisierung",
    ],
    priceRange: "Ab 990€",
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
    },
    parentOrganization: {
        "@id": "https://axionea.de/#organization",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Was genau macht Axionea?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Axionea automatisiert Geschäftsprozesse mit KI — von Kundensupport-Chatbots über Content-Generierung bis hin zu vollautomatisierten Workflows. Wir analysieren deine Abläufe und implementieren maßgeschneiderte KI-Lösungen.",
            },
        },
        {
            "@type": "Question",
            name: "Brauche ich technisches Wissen, um mit Axionea zu arbeiten?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Nein, überhaupt nicht. Wir kümmern uns um die gesamte technische Umsetzung. Du brauchst keine IT-Abteilung und keine Programmierkenntnisse — wir erklären alles verständlich und richten alles für dich ein.",
            },
        },
        {
            "@type": "Question",
            name: "Wie lange dauert die Implementierung?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Je nach Komplexität zwischen 2 und 6 Wochen. Ein einfacher Chatbot kann in wenigen Tagen live sein, während umfassende Workflow-Automatisierungen etwas mehr Zeit benötigen. Du bekommst einen klaren Zeitplan im Vorfeld.",
            },
        },
        {
            "@type": "Question",
            name: "Was kostet die Zusammenarbeit mit Axionea?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Unsere Preise richten sich nach dem Umfang deines Projekts. Wir bieten transparente Festpreise — keine versteckten Kosten, keine überraschenden Rechnungen. Einstiegspakete starten ab 990€. Buche ein kostenloses Erstgespräch und wir erstellen dir ein individuelles Angebot.",
            },
        },
        {
            "@type": "Question",
            name: "Für welche Branchen ist Axionea geeignet?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Wir arbeiten mit Arztpraxen, Rechtsanwälten, Agenturen, E-Commerce, Handwerksbetrieben, Coaches und vielen weiteren Branchen. Überall dort, wo repetitive Aufgaben Zeit kosten, kann KI einen Mehrwert liefern.",
            },
        },
        {
            "@type": "Question",
            name: "Bietet ihr auch laufenden Support an?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Ja! Nach der Implementierung bieten wir fortlaufende Optimierung und Support an. Wir überwachen die Performance deiner KI-Systeme und passen sie kontinuierlich an, damit sie immer auf Höchstleistung laufen.",
            },
        },
    ],
};

export default function StructuredData() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
