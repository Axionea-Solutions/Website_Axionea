/**
 * StructuredData — JSON-LD Komponente für SEO
 *
 * Enthält:
 * - Organization Schema
 * - WebSite Schema mit SearchAction
 * - FAQPage Schema (gespeist aus src/lib/faq-data.ts — identisch mit FAQ.tsx)
 * - LocalBusiness Schema
 */

import { faqs } from "@/lib/faq-data";

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.axionea-solutions.de/#organization",
    "name": "Axionea Solutions GbR",
    "alternateName": "Axionea",
    "url": "https://www.axionea-solutions.de",
    "logo": "https://www.axionea-solutions.de/assets/logo/Asset%204@4x.png",
    "description": "KI-Automatisierungsagentur für den Mittelstand — Chatbots, KI-Telefonassistenten und Workflow-Automatisierung. DSGVO-konform und EU-AI-Act-ready, mit Referenzen aus Arztpraxen, Kieferorthopädie, Immobilien und Steuerberatung.",
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
    // Dynamisch generiertes OG-Image (app/opengraph-image.tsx)
    image: "https://www.axionea-solutions.de/opengraph-image",
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

// FAQPage-Schema: exakt die sichtbaren Fragen aus FAQ.tsx (gemeinsame Quelle)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
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
      "serviceType": "Chatbots & Termin-Assistenten",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Terminvereinbarung, Kundenfragen oder Vorab-Einordnung neuer Anfragen — unsere Assistenten antworten sofort, rund um die Uhr und immer freundlich.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Voice Agents (KI-Telefonie)",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Das Telefon klingelt ununterbrochen? Unser KI-Telefon-Assistent nimmt Anrufe entgegen, beantwortet Fragen und legt Termine direkt in eurem System an.",
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
      "description": "Kein langes Suchen mehr. Ein interner Assistent, der all eure Dokumente, Richtlinien und Abläufe kennt und sofort Antworten liefert.",
      "url": "https://www.axionea-solutions.de/#services"
    },
    {
      "@type": "Service",
      "serviceType": "Branchen-KI-Tools",
      "provider": {"@type": "Organization", "name": "Axionea Solutions GbR"},
      "areaServed": ["DE", "AT", "CH"],
      "description": "Spezialisierte KI-Lösungen für deine Branche — zum Beispiel automatische Exposé-Texte für Makler oder KI-Dokumentation für Praxen.",
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
