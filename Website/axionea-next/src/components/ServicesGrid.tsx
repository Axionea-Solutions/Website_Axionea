"use client";

import { useRef, useEffect, useState } from "react";
import { LetterReveal } from "./ui/LetterReveal";
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-sapphire/10 border border-sapphire/20 animate-pulse" />
        </div>
    ),
});

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

/* ═══════════════════════════════════════════════════════
   1.  AI STRATEGY — Connected circles with traveling dots
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   1.  AI STRATEGY — Geometric Network Illustration
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   1.  AI STRATEGY — Neumorphic Node Illustration
   ═══════════════════════════════════════════════════════ */
function StrategyIllustration() {
    return (
        <div className="relative w-full h-56 flex items-center justify-center overflow-hidden pt-6">
            <div className="flex flex-row items-center justify-center transform scale-[0.8] origin-center w-max h-full relative">

                {/* Connection line and Knowledge Exchange animation */}
                <svg className="absolute inset-0 w-[400px] h-[250px] pointer-events-none" viewBox="0 0 400 250" fill="none">
                    {/* Background track path from Left Node center (100,80) to Right Node center (255,155) */}
                    <path
                        d="M 100 80 L 255 155"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />

                    {/* Data packet moving Left to Right (A to B) */}
                    <circle r="5" fill="#0F52BA" className="shadow-sm">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 100 80 L 255 155" />
                    </circle>

                    {/* Data packet moving Right to Left (B to A) slightly delayed/faster */}
                    <circle r="4" fill="#3b82f6" opacity="0.8">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 255 155 L 100 80" />
                    </circle>
                </svg>

                {/* --- Left Node (Bar Chart) --- */}
                <div className="absolute top-[30px] left-[50px] w-[100px] h-[100px] rounded-full bg-white border border-sapphire/20 flex items-center justify-center shadow-sm z-10 transition-transform hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[36px] h-[36px] text-sapphire">
                        <rect x="4" y="6" width="3.5" height="14" rx="0.5" />
                        <rect x="4" y="3" width="3.5" height="2" rx="0.5" />
                        <rect x="10.5" y="10" width="3.5" height="10" rx="0.5" />
                        <rect x="17" y="14" width="3.5" height="6" rx="0.5" />
                        <rect x="17" y="10" width="3.5" height="3" rx="0.5" />
                    </svg>
                </div>

                {/* --- Right Node (Multi-Squares) --- */}
                <div className="absolute top-[100px] left-[200px] w-[110px] h-[110px] rounded-full bg-white border border-sapphire/20 flex items-center justify-center shadow-sm z-10 transition-transform hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="miter" className="w-[38px] h-[38px] text-sapphire">
                        <path d="M 15 5 L 21 11 L 15 17" fill="none" />
                        <path d="M 12 8 L 18 14 L 12 20 L 6 14 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="w-[400px] h-[250px] pointer-events-none" />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   2.  CONTENT GENERATION — Typing menu with cursor
   ═══════════════════════════════════════════════════════ */
function ContentGenIllustration() {
    const [activeItem, setActiveItem] = useState(0);
    const items = ["KI-Texte erstellen", "Grammatik korrigieren", "Im Detail erklären"];
    useEffect(() => {
        const timer = setInterval(() => setActiveItem(a => (a + 1) % items.length), 2000);
        return () => clearInterval(timer);
    }, [items.length]);
    return (
        <div className="relative w-full h-56 flex flex-col items-center justify-center px-6 gap-3">
            {/* Input field with blinking cursor */}
            <div className="w-full max-w-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-300" />
                <div className="w-px h-5 bg-sapphire animate-[blink_1s_step-end_infinite]" />
                <div className="flex-1" />
            </div>
            {/* Dropdown options */}
            <div className="w-full max-w-xs space-y-1">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className={`px-4 py-2 rounded-lg text-xs transition-all duration-300 cursor-default shadow-sm ${i === activeItem
                            ? 'bg-sapphire/10 border border-sapphire/20 text-sapphire font-medium'
                            : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'
                            }`}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {/* Generate button */}
            <div className="absolute top-6 right-6">
                <span className="text-xs font-medium bg-slate-100 border border-slate-200 px-4 py-1.5 rounded-lg text-slate-600 shadow-sm">
                    Generieren
                </span>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   3.  CHATBOT — Conversation with thinking dots + cursor
   ═══════════════════════════════════════════════════════ */
function ChatbotIllustration() {
    const [phase, setPhase] = useState(0); // 0=msg1, 1=thinking, 2=response, 3=thinking2, 4=response2
    useEffect(() => {
        const durations = [2500, 1800, 2500, 1800, 2500];
        const timer = setTimeout(() => {
            setPhase(p => (p + 1) % 5);
        }, durations[phase]);
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <div className="relative w-full h-56 flex flex-col justify-end px-6 pb-4 gap-2.5 overflow-hidden">
            {/* User message 1 */}
            <div className={`flex justify-end transition-all duration-500 ${phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="bg-sapphire/10 border border-sapphire/20 rounded-2xl rounded-br-sm px-4 py-2 text-xs text-sapphire max-w-[75%] shadow-sm">
                    Erstelle einen Terminplan für die Woche.
                </div>
            </div>

            {/* Bot thinking or response 1 */}
            {phase === 1 ? (
                <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.4s]" />
                    </div>
                </div>
            ) : phase >= 2 ? (
                <div className="flex items-start gap-2 transition-all duration-500 opacity-100">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2 text-xs text-slate-600 max-w-[80%] leading-relaxed">
                        Hier ist dein optimierter Terminplan für KW 13. Soll ich Pufferzeiten einbauen?
                    </div>
                </div>
            ) : null}

            {/* User message 2 */}
            {phase >= 2 && (
                <div className={`flex justify-end transition-all duration-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-sapphire/10 border border-sapphire/20 shadow-sm rounded-2xl rounded-br-sm px-4 py-2 text-xs text-sapphire max-w-[75%]">
                        Ja, 15 Minuten zwischen Terminen.
                    </div>
                </div>
            )}

            {/* Bot thinking 2 or final response */}
            {phase === 3 ? (
                <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.4s]" />
                    </div>
                </div>
            ) : phase >= 4 ? (
                <div className="flex items-start gap-2 transition-all duration-500 opacity-100">
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2 text-xs text-slate-600 max-w-[80%] leading-relaxed">
                        ✅ Fertig! 8 Termine mit 15-Min-Puffer eingeplant.
                    </div>
                </div>
            ) : null}

            {/* Chat input with blinking cursor */}
            <div className="w-full bg-slate-50 border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400">Nachricht eingeben</span>
                <div className="flex-1" />
                <div className="w-px h-4 bg-sapphire/80 animate-[blink_1s_step-end_infinite]" />
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   4.  AUTOMATED WORKFLOWS — Knowledge Graph
   ═══════════════════════════════════════════════════════ */
function WorkflowIllustration() {
    return (
        <div className="relative w-full h-[256px] flex items-center justify-center overflow-hidden bg-white rounded-t-[1.5rem] pt-6">
            <div className="flex flex-row items-center justify-center transform scale-[0.65] origin-center w-max">

                {/* Left Nodes */}
                <div className="flex flex-col gap-6 z-[2] shrink-0">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Kundenanfragen</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Termine</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Dokumente</span>
                    </div>
                </div>

                {/* Left SVG Lines */}
                <div className="w-[120px] h-[220px] shrink-0 z-[1] -mx-1">
                    <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
                        {/* Static base lines */}
                        <path d="M 0,33 C 50,33 50,100 100,100" fill="none" stroke="rgba(15,82,186,0.1)" strokeWidth="2" />
                        <path d="M 0,100 C 50,100 50,100 100,100" fill="none" stroke="rgba(15,82,186,0.1)" strokeWidth="2" />
                        <path d="M 0,167 C 50,167 50,100 100,100" fill="none" stroke="rgba(15,82,186,0.1)" strokeWidth="2" />
                        {/* Animated glow lines */}
                        <path d="M 0,33 C 50,33 50,100 100,100" className="workflow-line-glow" />
                        <path d="M 0,100 C 50,100 50,100 100,100" className="workflow-line-glow" style={{ animationDelay: '0.5s' }} />
                        <path d="M 0,167 C 50,167 50,100 100,100" className="workflow-line-glow" style={{ animationDelay: '1s' }} />
                    </svg>
                </div>

                {/* Center Engine */}
                <div className="z-[2] shrink-0">
                    <div className="relative">
                        <div className="absolute -inset-3 rounded-3xl border-2 border-sapphire/20 animate-core-pulse" />
                        <div className="w-[140px] h-[140px] rounded-2xl border-[3px] border-sapphire bg-white shadow-xl flex flex-col items-center justify-center gap-1.5 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-sapphire drop-shadow-sm">
                                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                                <rect x="9" y="9" width="6" height="6" />
                                <line x1="9" y1="1" x2="9" y2="4" />
                                <line x1="15" y1="1" x2="15" y2="4" />
                                <line x1="9" y1="20" x2="9" y2="23" />
                                <line x1="15" y1="20" x2="15" y2="23" />
                                <line x1="20" y1="9" x2="23" y2="9" />
                                <line x1="20" y1="14" x2="23" y2="14" />
                                <line x1="1" y1="9" x2="4" y2="9" />
                                <line x1="1" y1="14" x2="4" y2="14" />
                            </svg>
                            <span className="text-base font-bold text-sapphire tracking-tight leading-none" style={{ fontFamily: 'var(--font-syne)' }}>Axionea</span>
                            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">KI-Engine</span>
                        </div>
                    </div>
                </div>

                {/* Right SVG Lines */}
                <div className="w-[120px] h-[220px] shrink-0 z-[1] -mx-1">
                    <svg viewBox="0 0 100 200" className="w-full h-full overflow-visible">
                        {/* Static base lines */}
                        <path d="M 0,100 C 50,100 50,70 100,70" fill="none" stroke="rgba(15,82,186,0.1)" strokeWidth="2" />
                        <path d="M 0,100 C 50,100 50,130 100,130" fill="none" stroke="rgba(15,82,186,0.1)" strokeWidth="2" />
                        {/* Animated glow lines */}
                        <path d="M 0,100 C 50,100 50,70 100,70" className="workflow-line-glow" style={{ animationDelay: '1.5s' }} />
                        <path d="M 0,100 C 50,100 50,130 100,130" className="workflow-line-glow" style={{ animationDelay: '2s' }} />
                    </svg>
                </div>

                {/* Right Nodes */}
                <div className="flex flex-col gap-8 z-[2] shrink-0">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Benachrichtigungen</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

/* ──────────────── Service Card ──────────────── */

function ServiceCard({
    title,
    description,
    illustration,
    className = "",
    index,
}: {
    title: string;
    description: string;
    illustration: React.ReactNode;
    className?: string;
    index: number;
}) {
    const { ref, isInView } = useInView(0.1);

    const getTransform = () => {
        if (index === 0 || index === 2) return "translateX(-30px)";
        return "translateX(30px)";
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(30px)",
                transition: `all 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-gray-200 bg-white transition-all duration-500 hover:border-sapphire/30 hover:shadow-[0_20px_60px_-15px_rgba(15,82,186,0.12)] shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sapphire/[0.02] via-transparent to-transparent pointer-events-none" />

                {/* Illustration */}
                <div className="relative">
                    {illustration}
                </div>

                {/* Content */}
                <div className="relative p-6">
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

export default function ServicesGrid() {
    return (
        <section id="services" className="py-16 md:py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9" />
                        </svg>
                        SERVICES
                    </span>
                    <h2
                        className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-tight mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Unsere KI-Services" />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        <LetterReveal text="KI-Funktionen, die dein Unternehmen auf das nächste Level bringen" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* Services Grid — 2×2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ServiceCard
                        index={0}
                        title="KI-Strategie & Beratung"
                        description="Experten-Beratung für die Implementierung von KI-Lösungen, die dein Unternehmenswachstum antreiben"
                        illustration={<StrategyIllustration />}
                    />
                    <ServiceCard
                        index={1}
                        title="Content-Generierung"
                        description="Nahtlose KI-gestützte Content-Erstellung — hochwertige Texte, die zur Stimme deiner Marke passen"
                        illustration={<ContentGenIllustration />}
                    />
                    <ServiceCard
                        index={2}
                        title="KI-Chatbots"
                        description="Intelligente Chatbots mit fortschrittlicher KI für erstklassigen Kundensupport und automatisierte Prozesse"
                        illustration={<ChatbotIllustration />}
                    />
                    <ServiceCard
                        index={3}
                        title="Automatisierte Workflows und Agenten"
                        description="Automatisiere wiederkehrende Aufgaben, steigere die Effizienz und spare wertvolle Zeit"
                        illustration={<WorkflowIllustration />}
                    />
                </div>
            </div>
        </section>
    );
}
