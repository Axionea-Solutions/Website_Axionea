import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import AnimatedNavbar from '@/components/AnimatedNavbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Impressum | Axionea Solutions',
    description: 'Impressum der Axionea Solutions GbR — Angaben gemäß § 5 TMG. Axionea ist eine KI-Automatisierungsagentur mit Sitz in Gaimersheim, Bayern.',
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.axionea-solutions.de/impressum',
    },
};

export default function Impressum() {
    return (
        <main className="min-h-screen bg-[#070d1a] text-white selection:bg-sapphire selection:text-white pt-32 pb-16">
            {/* Background Glows matching home page */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-sapphire/20 blur-[120px]" />
                <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
            </div>

            <AnimatedNavbar />

            <div className="relative z-10 max-w-4xl mx-auto px-6  md:px-12 pt-6">
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
                    Impressum
                </h1>

                <div className="prose prose-invert prose-blue max-w-none prose-headings:font-[family-name:var(--font-syne)] prose-a:text-sapphire hover:prose-a:text-sapphire-hover">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Angaben gemäß § 5 TMG</h2>
                        <p className="mb-2"><strong>Axionea GbR (in Gründung)</strong></p>
                        <p className="mb-2">
                            Leprosenweg 1b<br />
                            85080 Gaimersheim
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Vertreten durch die Gesellschafter</h2>
                        <p className="mb-2">Nico Fisseler und Maximilian Zvada</p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                        <p className="mb-2">
                            E-Mail: <a href="mailto:maximilian.zvada@axionea-solutions.de">maximilian.zvada@axionea-solutions.de</a><br />
                            E-Mail: <a href="mailto:nico.fisseler@axionea-solutions.de">nico.fisseler@axionea-solutions.de</a>
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Umsatzsteuer-ID</h2>
                        <p className="mb-2">
                            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                            [Wird nach Anmeldung nachgereicht]
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Verbraucher&shy;streit&shy;beilegung / Universal&shy;schlichtungs&shy;stelle</h2>
                        <p className="mb-2">
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Haftung für Inhalte</h2>
                        <p className="mb-4 text-gray-300">
                            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        </p>
                        <p className="mb-4 text-gray-300">
                            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Haftung für Links</h2>
                        <p className="mb-4 text-gray-300">
                            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                        </p>
                        <p className="mb-4 text-gray-300">
                            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Urheberrecht</h2>
                        <p className="mb-4 text-gray-300">
                            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                        </p>
                        <p className="mb-4 text-gray-300">
                            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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
