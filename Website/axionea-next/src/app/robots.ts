import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/', disallow: ['/api/'] },
            { userAgent: 'Bytespider', disallow: '/' },
            // Tier 1: kritisch für KI-Suchsichtbarkeit
            { userAgent: 'GPTBot', allow: '/' },
            { userAgent: 'OAI-SearchBot', allow: '/' },
            { userAgent: 'ChatGPT-User', allow: '/' },
            { userAgent: 'ClaudeBot', allow: '/' },
            { userAgent: 'PerplexityBot', allow: '/' },
            // Tier 2: breiteres KI-Ökosystem (Gemini, Apple Intelligence, Alexa, Meta AI)
            { userAgent: 'Google-Extended', allow: '/' },
            { userAgent: 'GoogleOther', allow: '/' },
            { userAgent: 'Applebot-Extended', allow: '/' },
            { userAgent: 'Amazonbot', allow: '/' },
            { userAgent: 'FacebookBot', allow: '/' },
        ],
        sitemap: 'https://www.axionea-solutions.de/sitemap.xml',
        host: 'https://www.axionea-solutions.de',
    };
}
