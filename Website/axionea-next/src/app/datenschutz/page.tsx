import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import AnimatedNavbar from '@/components/AnimatedNavbar';

export default function Datenschutz() {
    return (
        <main className="min-h-screen bg-[#070d1a] text-white selection:bg-sapphire selection:text-white pt-32 pb-16">
            {/* Background Glows matching home page */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-sapphire/20 blur-[120px]" />
                <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
            </div>

            <AnimatedNavbar />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 pt-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:-translate-x-1 transition-transform"
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    Zurück zur Startseite
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                    Datenschutzerklärung
                </h1>

                <div className="prose prose-invert prose-blue max-w-none prose-headings:font-[family-name:var(--font-syne)] prose-a:text-sapphire hover:prose-a:text-sapphire-hover">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">1. Datenschutz auf einen Blick</h2>
                        <h3 className="text-xl font-semibold mb-3">Allgemeine Hinweise</h3>
                        <p className="mb-4 text-gray-300">
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                        </p>
                        <h3 className="text-xl font-semibold mb-3">Datenerfassung auf dieser Website</h3>
                        <p className="mb-2 text-gray-300"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
                        <p className="mb-4 text-gray-300">Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.</p>
                    </section>
                    
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">2. Allgemeine Hinweise und Pflicht&shy;informationen</h2>
                        <h3 className="text-xl font-semibold mb-3">Datenschutz</h3>
                        <p className="mb-4 text-gray-300">
                            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">3. EU AI Act & Compliance</h2>
                        <p className="mb-4 text-gray-300">
                            Als Anbieter von modernen KI-Lösungen legen wir höchsten Wert auf ethische KI-Entwicklung und die Einhaltung aktueller sowie kommender EU-Richtlinien, insbesondere des EU AI Acts (Verordnung über künstliche Intelligenz). Unsere Systeme werden transparent und unter Einhaltung strenger Sicherheits- und Datenschutzstandards (DSGVO) entwickelt und bereitgestellt.
                        </p>
                    </section>

                     <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">4. Hinweis zur verantwortlichen Stelle</h2>
                        <p className="mb-4 text-gray-300">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                        <p className="mb-2"><strong>Axionea GbR (in Gründung)</strong></p>
                        <p className="mb-2">
                            Leprosenweg 1b<br />
                            85080 Gaimersheim
                        </p>
                        <p className="mb-2">
                            E-Mail: <a href="mailto:maximilian.zvada@axionea-solutions.de">maximilian.zvada@axionea-solutions.de</a><br />
                            E-Mail: <a href="mailto:nico.fisseler@axionea-solutions.de">nico.fisseler@axionea-solutions.de</a>
                        </p>
                        <p className="mt-4 text-gray-300">
                            Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                        </p>
                    </section>
                </div>
            </div>

            <div className="mt-20">
                <Footer />
            </div>
        </main>
    );
}
