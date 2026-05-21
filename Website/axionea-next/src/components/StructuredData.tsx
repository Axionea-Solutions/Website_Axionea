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
    "@id": "https://www.axionea-solutions.de/#organization",
    "name": "Axionea Solutions GbR",
    "alternateName": "Axionea",
    "url": "https://www.axionea-solutions.de",
    "logo": "https://www.axionea-solutions.de/assets/logo/Asset%204@4x.png",
    "description": "KI-Agentur mit Fokus auf Arztpraxen, Kieferorthopäden und Immobilienmakler. DSGVO-konform und EU-AI-Act-ready.",
    "foundingDate": "2026-01-01",
    "founders": [
      {"@type": "Person", "name": "Maximilian Zvada", "jobTitle": "CEO & Founder"},
      {"@type": "Person", "name": "Nico Fisseler", "jobTitle": "CTO & Founder"}
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Leprosenweg 1b",
      "postalCode": "85080",
      "addressLocality": "Gaimersheim",
      "addressRegion": "Bayern",
      "addressCountry": "DE"
    },
    "contactPoint": [{
      "@type": "ContactPoint",
      "telephone": "+49-173-1726939",
      "contactType": "customer service",
      "email": "info@axionea-solutions.de",
      "availableLanguage": ["German", "English"],
      "areaServed": ["DE", "AT", "CH"]
    }]
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.axionea-solutions.de/#website",
    url: "https://www.axionea-solutions.de",
    name: "Axionea",
    description: "KI-Automatisierung für den Mittelstand",
    publisher: {
        "@id": "https://www.axionea-solutions.de/#organization",
    },
    inLanguage: "de-DE",
};

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://www.axionea-solutions.de/#localbusiness",
    name: "Axionea",
    image: "https://www.axionea-solutions.de/og-image.png",
    url: "https://www.axionea-solutions.de",
    telephone: "+49-173-1726939",
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
        "@id": "https://www.axionea-solutions.de/#organization",
    },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Was genau macht Axionea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Axionea automatisiert Geschäftsprozesse mit KI — von Kundensupport-Chatbots über Content-Generierung bis hin zu vollautomatisierten Workflows. Wir analysieren deine Abläufe und implementieren maßgeschneiderte KI-Lösungen."
      }
    },
    {
      "@type": "Question",
      "name": "Brauche ich technisches Wissen, um mit Axionea zu arbeiten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein, überhaupt nicht. Wir kümmern uns um die gesamte technische Umsetzung. Du brauchst keine IT-Abteilung und keine Programmierkenntnisse."
      }
    },
    {
      "@type": "Question",
      "name": "Ist eure KI DSGVO-konform für Arztpraxen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Wir arbeiten ausschließlich mit EU-Hosting, schließen Auftragsverarbeitungsverträge ab und nutzen KI-Modelle ohne Training auf Kundendaten. Auf Wunsch begleiten wir euch durch die vollständige EU-AI-Act-Compliance."
      }
    },
    {
      "@type": "Question",
      "name": "Bietet Axionea auch Schulungen für Mitarbeitende an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Wir schulen euer Team in KI-Grundlagen, im praktischen Umgang mit Tools wie Claude und ChatGPT und in branchenspezifischen Anwendungen. Die Schulungen sind BAFA-förderfähig."
      }
    },
    {
      "@type": "Question",
      "name": "Was kostet ein Einstieg mit Axionea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unser KI-Potenzial-Check startet ab 990 € — BAFA-förderfähig mit bis zu 2.800 € Förderung. Daneben bieten wir Festpreis-Pilotprojekte und ein monatliches Retainer-Modell an."
      }
    },
    {
      "@type": "Question",
      "name": "Wie laufen eure KI-Schulungen ab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir bieten drei Formate an: einen halbtägigen AI-Fluency-Workshop zu KI-Grundlagen, einen tagesfüllenden Tool-Workshop mit branchenspezifischen Inhalten und ein mehrtägiges Train-the-Trainer-Programm. Alle Formate sind BAFA-förderfähig und können vor Ort oder remote durchgeführt werden."
      }
    },
    {
      "@type": "Question",
      "name": "Sind eure KI-Schulungen förderfähig?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Unsere Schulungen sind BAFA-förderfähig (Modul „go-digital“ und „Förderung von Unternehmensberatungen für KMU“). Je nach Bundesland und Unternehmensgröße sind bis zu 80 % Förderung möglich. Wir unterstützen euch bei der Antragstellung."
      }
    }
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Service",
      "serviceType": "KI-Strategie & Audit",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Von KI-Potenzialanalyse über EU-AI-Act-Compliance bis zur Tool-Auswahl — wir zeigen dir genau wo KI bei dir Sinn macht. BAFA-förderfähig.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Lead-Agenten & Chatbots",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Terminvereinbarung, Patienten-FAQ oder Erst-Qualifizierung von Makler-Leads — unsere Agenten antworten sofort, 24/7 und immer freundlich.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Voice Agents (KI-Telefonie)",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Die Praxis klingelt ununterbrochen? Unser KI-Telefon-Assistent nimmt Anrufe entgegen, beantwortet Fragen und legt Termine direkt in eurem System an.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Backoffice-Automatisierung",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Wir vernetzen eure bestehende Software (CRM, Kalender, E-Mail) und lassen KI wiederkehrende Aufgaben wie Datenübertragung und E-Mail-Sortierung erledigen.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Wissensassistenten (RAG)",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Kein langes Suchen mehr. Ein interner Chatbot, der all eure Dokumente, Exposés oder Behandlungsrichtlinien kennt und sofort Antworten liefert.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Branchen-KI-Tools",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Wir implementieren spezialisierte KI-Lösungen wie automatische Exposé-Texter, KI-Dokumentation für Ärzte oder Bildverbesserung für Immobilien.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "KI-Schulungen",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Wir machen dein Team KI-fit. AI-Fluency-Workshops, Tool-Trainings und Train-the-Trainer-Programme — BAFA-förderfähig und praxisorientiert.",
      "url": "https://www.axionea-solutions.de/#schulungen"
    }
  ]
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
        </>
    );
}
