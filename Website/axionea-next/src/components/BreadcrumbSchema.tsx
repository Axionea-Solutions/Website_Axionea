// BreadcrumbList-JSON-LD für Unterseiten — Navigationskontext für Suchmaschinen & KI-Crawler
interface BreadcrumbSchemaProps {
    name: string;
    path: string;
}

export default function BreadcrumbSchema({ name, path }: BreadcrumbSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Startseite",
                item: "https://www.axionea-solutions.de",
            },
            {
                "@type": "ListItem",
                position: 2,
                name,
                item: `https://www.axionea-solutions.de${path}`,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
