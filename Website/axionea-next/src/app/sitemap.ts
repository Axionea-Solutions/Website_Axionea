import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.axionea-solutions.de';
    // Relaunch + Leadmagneten + Chatbot-Tools (ROI-Report, Foerder-Check, Voice)
    const homeLastModified = new Date('2026-07-05');
    const industryLastModified = new Date('2026-05-21');
    const foerderungLastModified = new Date('2026-07-05');
    const legalLastModified = new Date('2026-01-15');

    return [
        {
            url: baseUrl,
            lastModified: homeLastModified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/ki-fuer-arztpraxen`,
            lastModified: industryLastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ki-fuer-kieferorthopaeden`,
            lastModified: industryLastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ki-fuer-makler`,
            lastModified: industryLastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/ki-fuer-steuerberater`,
            lastModified: homeLastModified,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/foerderung`,
            lastModified: foerderungLastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified: legalLastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/datenschutz`,
            lastModified: legalLastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];
}
