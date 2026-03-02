"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

/* ──────────────── useInView hook ──────────────── */
function useInView(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setIsInView(true); obs.unobserve(el); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, isInView };
}

/* ──────────────── Process Card ──────────────── */
function ProcessCard({
    step,
    title,
    description,
    icon,
    imageSrc,
    index,
    className = "",
}: {
    step: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    imageSrc: string;
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
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.25}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-gray-200 bg-white transition-all duration-500 hover:border-sapphire/30 hover:shadow-[0_20px_60px_-15px_rgba(15,82,186,0.12)] shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sapphire/[0.02] via-transparent to-transparent pointer-events-none" />

                {/* Content section */}
                <div className="relative p-6 pb-4">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 shadow-sm text-sapphire">
                        {icon}
                    </div>

                    {/* Title & Description */}
                    <h3
                        className="text-base font-bold text-slate-900 mb-2 tracking-tight group-hover:text-sapphire transition-colors duration-300"
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
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                </div>

                {/* Image */}
                <div className="relative mx-4 mb-4 rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                    <Image
                        src={imageSrc}
                        alt={title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
}

/* ──────────────── Main Section ──────────────── */
export default function ProcessSteps() {
    return (
        <section id="prozess" className="py-16 md:py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header — Badge + Heading structure */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        PROZESS
                    </span>
                    <h2
                        className="text-[clamp(28px,6vw,56px)] font-bold tracking-tight leading-tight mb-4 break-words hyphens-auto"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Einfach & Skalierbar
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Ein transparenter Prozess aus Zusammenarbeit und Feedback — von der Analyse bis zum laufenden System.
                    </p>
                </div>

                {/* Process Cards Grid — ORB AI staggered layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Card 1 — Analyse (left, full height) */}
                    <ProcessCard
                        index={0}
                        step="01"
                        title="Workflow-Analyse"
                        description="Wir analysieren deine bestehenden Abläufe und identifizieren, wo KI den größten Mehrwert liefern kann."
                        imageSrc="/images/process-analyse.png"
                        className="md:row-span-2"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        }
                    />

                    {/* Card 2 — Strategie (right top) */}
                    <ProcessCard
                        index={1}
                        step="02"
                        title="Mit Sicherheit deployen"
                        description="Unser Team entwickelt maßgeschneiderte KI-Systeme, die auf deine Ziele ausgerichtet sind — sicher und zuverlässig."
                        imageSrc="/images/process-strategie.png"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                        }
                    />

                    {/* Card 3 — Optimierung (right bottom) */}
                    <ProcessCard
                        index={2}
                        step="03"
                        title="Laufende Optimierung"
                        description="Nach dem Deployment unterstützen und optimieren wir deine KI-Systeme, damit sie immer auf Höchstleistung laufen."
                        imageSrc="/images/process-umsetzung.png"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        }
                    />
                </div>
            </div>
        </section>
    );
}
