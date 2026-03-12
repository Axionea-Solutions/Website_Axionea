"use client";

import { useRef, useEffect, useState } from "react";
import { LetterReveal } from "./ui/LetterReveal";

/* ──────────────── useInView hook ──────────────── */
function useInView(threshold = 0.15) {
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

/* ──────────────── Animated Illustrations ──────────────── */

function ClockIllustration() {
    const [angle, setAngle] = useState(-45);
    useEffect(() => {
        const timer = setInterval(() => setAngle(a => a + 6), 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Clock face */}
            <div className="relative w-32 h-32 rounded-full bg-white border border-slate-200 shadow-md">
                {/* Inner shadow ring */}
                <div className="absolute inset-1 rounded-full border border-slate-100" />
                {/* Hour markers */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                    <div key={deg} className="absolute w-full h-full" style={{ transform: `rotate(${deg}deg)` }}>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-slate-300 rounded-full" />
                    </div>
                ))}
                {/* Minute hand */}
                <div className="absolute top-1/2 left-1/2 origin-bottom transition-transform duration-1000 ease-out"
                    style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)`, width: '2px', height: '38px', background: 'linear-gradient(to top, rgba(15,82,186,0.8), rgba(15,82,186,0.3))', borderRadius: '2px' }} />
                {/* Hour hand */}
                <div className="absolute top-1/2 left-1/2 origin-bottom"
                    style={{ transform: `translate(-50%, -100%) rotate(${angle / 12 + 90}deg)`, width: '2.5px', height: '26px', background: 'linear-gradient(to top, rgba(148,163,184,0.8), rgba(148,163,184,0.3))', borderRadius: '2px' }} />
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sapphire shadow-[0_0_8px_rgba(15,82,186,0.4)]" />
            </div>
            {/* 12 o'clock indicator */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-100 border border-slate-300 shadow-sm" />
        </div>
    );
}

function BarChartIllustration() {
    const { ref, isInView } = useInView(0.3);
    return (
        <div ref={ref} className="relative w-full h-48 flex items-end justify-center pb-4 px-6">
            {/* Labels */}
            <div className="absolute top-3 left-6">
                <span className="text-[10px] text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md shadow-sm">
                    80% Automatisierung
                </span>
            </div>
            <div className="absolute top-3 right-6">
                <span className="text-[10px] text-sapphire bg-sapphire/10 border border-sapphire/20 px-2.5 py-1 rounded-md shadow-sm">
                    10% Kosten
                </span>
            </div>
            {/* VORHER label */}
            <div className="absolute left-2 bottom-1/2 translate-y-1/2">
                <span className="text-[8px] uppercase tracking-[2px] text-slate-400 [writing-mode:vertical-rl] rotate-180">Vorher</span>
            </div>
            {/* NACHHER label */}
            <div className="absolute right-2 bottom-1/2 translate-y-1/2">
                <span className="text-[8px] uppercase tracking-[2px] text-sapphire/70 [writing-mode:vertical-rl] rotate-180">Nachher</span>
            </div>
            {/* Bars */}
            <div className="flex items-end gap-2 h-28">
                {[
                    { h: 35, color: "from-slate-300 to-slate-200" },
                    { h: 50, color: "from-slate-300 to-slate-200" },
                    { h: 40, color: "from-slate-300 to-slate-200" },
                    { h: 75, color: "from-sapphire/60 to-sapphire/30" },
                    { h: 90, color: "from-sapphire/80 to-sapphire/40" },
                    { h: 65, color: "from-sapphire/60 to-sapphire/30" },
                    { h: 100, color: "from-sapphire to-sapphire/50" },
                ].map((bar, i) => (
                    <div
                        key={i}
                        className={`w-5 rounded-t-md bg-gradient-to-t ${bar.color} transition-all duration-1000 ease-out shadow-sm`}
                        style={{
                            height: isInView ? `${bar.h}%` : '0%',
                            transitionDelay: `${i * 100}ms`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function SyncIllustration() {
    return (
        <div className="relative w-full h-48 flex items-center justify-center">
            {/* Main icon circle */}
            <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute -inset-4 rounded-full bg-slate-50 opacity-50" />
                {/* Main circle */}
                <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md z-10 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-sapphire">
                        <polyline points="16 3 21 3 21 8" />
                        <line x1="4" y1="20" x2="21" y2="3" />
                        <polyline points="21 16 21 21 16 21" />
                        <line x1="15" y1="15" x2="21" y2="21" />
                        <line x1="4" y1="4" x2="9" y2="9" />
                    </svg>
                </div>
                {/* Floating user icon 1 */}
                <div className="absolute -top-2 -right-6 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm z-20 animate-[float_3s_ease-in-out_infinite]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
                {/* Floating user icon 2 */}
                <div className="absolute -bottom-3 -left-7 w-10 h-10 rounded-full bg-sapphire/10 border border-sapphire/20 flex items-center justify-center shadow-sm z-20 animate-[float_3s_ease-in-out_infinite_1s]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-sapphire">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

/* ──────────────── Benefit Card ──────────────── */

function BenefitCard({
    title,
    description,
    illustration,
    index,
}: {
    title: string;
    description: string;
    illustration: React.ReactNode;
    index: number;
}) {
    const { ref, isInView } = useInView(0.15);

    const getInitialTransform = () => {
        if (index % 3 === 0) return "translateX(-30px)";
        if (index % 3 === 2) return "translateX(30px)";
        return "translateY(30px)";
    };

    return (
        <div
            ref={ref}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.25}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-gray-200 bg-white transition-all duration-500 hover:border-sapphire/30 hover:shadow-[0_20px_60px_-15px_rgba(15,82,186,0.12)] shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sapphire/[0.02] via-transparent to-transparent pointer-events-none" />

                {/* Illustration area */}
                <div className="relative border-b border-white/[0.04]">
                    {illustration}
                </div>

                {/* Content */}
                <div className="p-6">
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
            </div>
        </div>
    );
}

/* ──────────────── Main Section ──────────────── */

export default function WhyChooseUs() {
    return (
        <section id="warum" className="py-16 md:py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        BENEFITS
                    </span>
                    <h2
                        className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-tight mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Warum Axionea?" />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        <LetterReveal text="Dein Partner für KI-Automatisierung — smarte Lösungen, die sofort wirken" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* Benefit Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <BenefitCard
                        index={0}
                        title="Echtzeit-Analysen"
                        description="Deine Geschäftsdaten live aufbereitet — als verständliches Dashboard statt Excel-Chaos"
                        illustration={<ClockIllustration />}
                    />
                    <BenefitCard
                        index={1}
                        title="KI-getriebenes Wachstum"
                        description="Intelligentere Entscheidungen durch akkurate Echtzeit-Geschäftseinblicke und KI-Analysen"
                        illustration={<BarChartIllustration />}
                    />
                    <BenefitCard
                        index={2}
                        title="Sync in Echtzeit"
                        description="Verbinde dein Team sofort — verfolge Fortschritte und Updates in Echtzeit"
                        illustration={<SyncIllustration />}
                    />
                </div>
            </div>
        </section>
    );
}
