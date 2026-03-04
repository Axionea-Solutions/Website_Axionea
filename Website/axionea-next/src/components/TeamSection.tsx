"use client";

import { useRef, useEffect, useState } from "react";
import { LetterReveal } from "./ui/LetterReveal";

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

/* ──────────────── Team Member Card ──────────────── */
function TeamCard({
    name,
    role,
    description,
    initials,
    index,
}: {
    name: string;
    role: string;
    description: string;
    initials: string;
    index: number;
}) {
    const { ref, isInView } = useInView(0.1);
    const fromLeft = index % 2 === 0;

    return (
        <div
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.25}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-500 hover:border-sapphire/30 hover:shadow-[0_20px_60px_-15px_rgba(15,82,186,0.12)] shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]">
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sapphire/[0.02] via-transparent to-transparent pointer-events-none" />

                <div className="relative flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sapphire/20 to-sapphire/5 border border-sapphire/20 flex items-center justify-center mb-5 shadow-[0_8px_32px_rgba(15,82,186,0.15)] group-hover:shadow-[0_8px_40px_rgba(15,82,186,0.25)] transition-all duration-500">
                        <span className="text-2xl font-bold text-sapphire" style={{ fontFamily: "var(--font-syne)" }}>
                            {initials}
                        </span>
                    </div>

                    {/* Name & Role */}
                    <h3
                        className="text-lg font-bold text-slate-900 mb-1 tracking-tight group-hover:text-sapphire transition-colors duration-300"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        {name}
                    </h3>
                    <span className="text-xs font-medium text-sapphire/70 uppercase tracking-widest mb-3">
                        {role}
                    </span>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ──────────────── Team Data ──────────────── */
const team = [
    {
        name: "Maximilian Zvada",
        role: "CEO & Founder",
        initials: "MZ",
        description: "Verbindet technisches Verständnis mit strategischer Planung, um passgenaue Automatisierungslösungen für den Mittelstand zu konzipieren.",
    },
    {
        name: "Nico Fisseler",
        role: "CTO & Founder",
        initials: "NF",
        description: "Verantwortlich für die technische Umsetzung und Architektur. Entwickelt zuverlässige KI-Agenten und nahtlose Software-Integrationen.",
    },
];

/* ──────────────── Main Team Section ──────────────── */
export default function TeamSection() {
    return (
        <section id="team" className="py-16 md:py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        TEAM
                    </span>
                    <h2
                        className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-tight mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Behind the Scenes" />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        <LetterReveal text="Das Team hinter Axionea — Experten mit Leidenschaft für KI und Innovation" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {team.map((member, i) => (
                        <TeamCard key={i} {...member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
