"use client";

import { useInView } from "@/hooks/useInView";
import { BookingButton } from "./hubspot";
import { LetterReveal } from "./ui/LetterReveal";

/* ══════════════════════════════════════════════════════════════
   Standard Process Card (Cards 01–03)
   ══════════════════════════════════════════════════════════════ */
function ProcessCard({
    step,
    title,
    description,
    icon,
    imageSrc,
    imageAlt,
    index,
    className = "",
}: {
    step: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    index: number;
    className?: string;
}) {
    const { ref, isInView } = useInView(0.1);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)] hover:-translate-y-1 overflow-hidden">
                {/* Content section */}
                <div className="relative p-6 pb-4">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 shadow-sm text-sapphire">
                        {icon}
                    </div>

                    {/* Title & Description */}
                    <h3
                        className="text-base font-bold text-slate-900 mb-2 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        {title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Step number row */}
                <div className="relative flex items-center justify-between px-6 py-3">
                    <span
                        className="text-3xl font-bold text-slate-200 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        {step}
                    </span>
                    {/* Dots */}
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-sapphire" />
                        <div className="w-2 h-2 rounded-full bg-slate-100" />
                        <div className="w-2 h-2 rounded-full bg-slate-100" />
                    </div>
                </div>

                {/* Image */}
                <div className="relative mx-4 mb-4 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageSrc}
                        alt={imageAlt ?? title}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="w-full h-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   Enhanced Partnership Card (Cards 04–05)
   ══════════════════════════════════════════════════════════════ */
function PartnershipCard({
    title,
    subtitle,
    description,
    features,
    icon,
    imageSrc,
    imageAlt,
    index,
}: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    index: number;
}) {
    const { ref, isInView } = useInView(0.1);

    return (
        <div
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)] hover:-translate-y-1 overflow-hidden">
                {/* Content section */}
                <div className="relative p-6 pb-4">
                    <div className="flex items-center gap-4 mb-3">
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm text-sapphire shrink-0">
                            {icon}
                        </div>
                        {/* Title — prominent, anstelle von "Schritt 04/05" */}
                        <h3
                            className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            {title}
                        </h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-sapphire text-sm font-semibold uppercase tracking-wider mb-3">
                        {subtitle}
                    </p>
                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {description}
                    </p>

                    {/* Feature list */}
                    <ul className="space-y-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                                <svg className="w-4 h-4 text-sapphire shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image */}
                <div className="relative mx-4 mb-4 mt-6 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageSrc}
                        alt={imageAlt ?? title}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="w-full h-auto opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   Section Divider — "UND DANACH"
   ══════════════════════════════════════════════════════════════ */
function SectionDivider() {
    const { ref, isInView } = useInView(0.2);

    return (
        <div
            ref={ref}
            className="py-12 md:py-20"
            style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 1.2s ease",
            }}
        >
            <div className="text-center">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    UND DANACH
                </span>
                <h2
                    className="text-[clamp(28px,6vw,56px)] font-bold tracking-tight leading-tight mb-4 break-words hyphens-auto text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    <LetterReveal text="Persönliche Betreuung & Schulungen" />
                </h2>
                <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    <LetterReveal text="Erfolgreiche KI-Projekte enden nicht mit dem Go-Live. Sie wachsen mit deinem Unternehmen mit. Wir bleiben an deiner Seite." delay={0.2} stagger={0.012} />
                </p>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   Main Section
   ══════════════════════════════════════════════════════════════ */
export default function ProcessSteps() {
    return (
        <section id="prozess" className="py-16 md:py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                {/* ─── Section Header ─── */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        PROZESS
                    </span>
                    <h2
                        className="text-[clamp(28px,6vw,56px)] font-bold tracking-tight leading-tight mb-4 break-words hyphens-auto text-white"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="In 3 Schritten zur KI" />
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                        <LetterReveal text="Von der ersten Analyse bis zur langfristigen Partnerschaft. Wir setzen KI nicht nur um — wir bleiben an deiner Seite und entwickeln dein Team weiter." delay={0.2} stagger={0.012} />
                    </p>
                </div>

                {/* ─── Block 1: Implementierung (Karten 01–03) ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Card 01 — Workflow-Analyse */}
                    <ProcessCard
                        index={0}
                        step="01"
                        title="Workflow-Analyse"
                        description="Wir analysieren deine bestehenden Abläufe und identifizieren, wo KI den größten Mehrwert liefern kann"
                        imageSrc="/images/process_workflow.png"
                        imageAlt="Axionea Workflow-Analyse: Identifikation von Automatisierungspotenzialen in Geschäftsprozessen"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        }
                    />

                    {/* Card 02 — Deployment */}
                    <ProcessCard
                        index={1}
                        step="02"
                        title="Mit Sicherheit deployen"
                        description="Unser Team entwickelt maßgeschneiderte KI-Systeme, die auf deine Ziele ausgerichtet sind — sicher und zuverlässig"
                        imageSrc="/images/process_secure_deploy.png"
                        imageAlt="Axionea KI-System Deployment: Sichere und zuverlässige Implementierung maßgeschneiderter KI-Lösungen"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        }
                    />

                    {/* Card 03 — Laufende Optimierung */}
                    <ProcessCard
                        index={2}
                        step="03"
                        title="Laufende Optimierung"
                        description="Nach dem Deployment unterstützen und optimieren wir deine KI-Systeme, damit sie immer auf Höchstleistung laufen"
                        imageSrc="/images/process_optimization.png"
                        imageAlt="Axionea Laufende KI-Optimierung: Kontinuierliche Verbesserung und Monitoring der KI-Automatisierungssysteme"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        }
                    />
                </div>

                {/* ─── Visual Divider: "UND DANACH" ─── */}
                <SectionDivider />

                {/* ─── Block 2: Langfristige Partnerschaft (Karten 04–05) ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Card 04 — Persönliche Betreuung */}
                    <PartnershipCard
                        index={3}
                        title="Persönliche Betreuung"
                        subtitle="Im Rhythmus, der zu dir passt"
                        description="Wir bleiben an deiner Seite. Im Retainer-Modell betreuen wir dich kontinuierlich — von der monatlichen Strategie-Session bis zum wöchentlichen Sparring. Du entscheidest, wie eng die Zusammenarbeit sein soll."
                        features={[
                            "Persönliche Calls — von 1× pro Monat bis 1× pro Woche",
                            "Transparente Reportings zu allen aktiven KI-Systemen",
                            "Laufende Optimierung deiner Workflows",
                            "Direkter Ansprechpartner statt Ticketsystem",
                        ]}
                        imageSrc="/assets/process/card-04-betreuung-v2.svg"
                        imageAlt="Axionea Persönliche Betreuung — Dashboard mit Kennzahlen, Kalender und Team-Chat"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                                <path d="M8 14h.01" />
                                <path d="M12 14h.01" />
                                <path d="M16 14h.01" />
                                <path d="M8 18h.01" />
                                <path d="M12 18h.01" />
                            </svg>
                        }
                    />

                    {/* Card 05 — Schulungen & Team-Befähigung */}
                    <PartnershipCard
                        index={4}
                        title="Schulungen & Team-Befähigung"
                        subtitle="KI ist nur so gut wie dein Team"
                        description="Wir schulen deine Mitarbeitenden langfristig im souveränen Umgang mit KI. Vom Grundlagen-Workshop bis zum branchenspezifischen Tool-Training — damit eure KI-Systeme nicht nur laufen, sondern auch wirklich genutzt werden."
                        features={[
                            "AI-Fluency-Workshops für alle Mitarbeitenden",
                            "Branchenspezifische Tool-Trainings",
                            "Train-the-Trainer für interne KI-Botschafter",
                            "BAFA-förderfähig — bis zu 80 % Förderung möglich",
                        ]}
                        imageSrc="/assets/process/card-05-schulungen-v2.svg"
                        imageAlt="Axionea KI-Schulungen — Academy Dashboard mit Lernpfad, 4D-Framework und Zertifikaten"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        }
                    />
                </div>

                {/* ─── CTA ─── */}
                <div className="text-center mt-12 md:mt-16">
                    <p className="text-gray-300 text-lg md:text-xl mb-2 font-medium" style={{ fontFamily: "var(--font-syne)" }}>
                        Bereit für den nächsten Schritt?
                    </p>
                    <p className="text-gray-400 text-base mb-6 max-w-xl mx-auto">
                        In 15 Minuten finden wir heraus, wo KI bei dir den größten Hebel hat.
                    </p>
                    <BookingButton
                        ariaLabel="Beratungsgespräch buchen"
                        className="inline-block px-8 py-4 rounded-full bg-sapphire text-white font-semibold text-base hover:bg-sapphire-hover transition-all shadow-md hover:shadow-lg cursor-pointer"
                    >
                        Beratungsgespräch buchen →
                    </BookingButton>
                </div>
            </div>
        </section>
    );
}
