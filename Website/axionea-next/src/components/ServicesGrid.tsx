"use client";

import { useEffect, useState } from "react";
import { LetterReveal } from "./ui/LetterReveal";
import { useInView } from "@/hooks/useInView";



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
                <div className="absolute top-[30px] left-[50px] w-[100px] h-[100px] rounded-full bg-white backdrop-blur-md border border-slate-200 flex items-center justify-center shadow-sm z-10 transition-transform hover:-translate-y-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[36px] h-[36px] text-sapphire">
                        <rect x="4" y="6" width="3.5" height="14" rx="0.5" />
                        <rect x="4" y="3" width="3.5" height="2" rx="0.5" />
                        <rect x="10.5" y="10" width="3.5" height="10" rx="0.5" />
                        <rect x="17" y="14" width="3.5" height="6" rx="0.5" />
                        <rect x="17" y="10" width="3.5" height="3" rx="0.5" />
                    </svg>
                </div>

                {/* --- Right Node (Multi-Squares) --- */}
                <div className="absolute top-[100px] left-[200px] w-[110px] h-[110px] rounded-full bg-white backdrop-blur-md border border-slate-200 flex items-center justify-center shadow-sm z-10 transition-transform hover:-translate-y-1">
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
            <div className="w-full max-w-xs bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
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
                <div className="bg-sapphire border border-sapphire rounded-2xl rounded-br-sm px-4 py-2 text-xs text-white max-w-[75%] shadow-sm">
                    Erstelle einen Terminplan für die Woche.
                </div>
            </div>

            {/* Bot thinking or response 1 */}
            {phase === 1 ? (
                <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.4s]" />
                    </div>
                </div>
            ) : phase >= 2 ? (
                <div className="flex items-start gap-2 transition-all duration-500 opacity-100">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2 text-xs text-slate-700 max-w-[80%] leading-relaxed">
                        Hier ist dein optimierter Terminplan für KW 13. Soll ich Pufferzeiten einbauen?
                    </div>
                </div>
            ) : null}

            {/* User message 2 */}
            {phase >= 2 && (
                <div className={`flex justify-end transition-all duration-500 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-sapphire border border-sapphire shadow-sm rounded-2xl rounded-br-sm px-4 py-2 text-xs text-white max-w-[75%]">
                        Ja, 15 Minuten zwischen Terminen.
                    </div>
                </div>
            )}

            {/* Bot thinking 2 or final response */}
            {phase === 3 ? (
                <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.2s]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-sapphire animate-[bounce_1.4s_ease-in-out_infinite_0.4s]" />
                    </div>
                </div>
            ) : phase >= 4 ? (
                <div className="flex items-start gap-2 transition-all duration-500 opacity-100">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-sapphire">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                        </svg>
                    </div>
                    <div className="bg-slate-100 border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm px-4 py-2 text-xs text-slate-700 max-w-[80%] leading-relaxed">
                        ✅ Fertig! 8 Termine mit 15-Min-Puffer eingeplant.
                    </div>
                </div>
            ) : null}

            {/* Chat input with blinking cursor */}
            <div className="w-full bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-2.5 flex items-center gap-2 mt-1">
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
        <div className="relative w-full h-[256px] flex items-center justify-center overflow-hidden bg-transparent rounded-t-[1.5rem] pt-6">
            <div className="flex flex-row items-center justify-center transform scale-[0.65] origin-center w-max">

                {/* Left Nodes */}
                <div className="flex flex-col gap-6 z-[2] shrink-0">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white backdrop-blur-md min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Kundenanfragen</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white backdrop-blur-md min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Termine</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white backdrop-blur-md min-w-[200px]">
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
                        <path d="M 0,33 C 50,33 50,100 100,100" fill="none" stroke="rgba(15,82,186,0.2)" strokeWidth="2" />
                        <path d="M 0,100 C 50,100 50,100 100,100" fill="none" stroke="rgba(15,82,186,0.2)" strokeWidth="2" />
                        <path d="M 0,167 C 50,167 50,100 100,100" fill="none" stroke="rgba(15,82,186,0.2)" strokeWidth="2" />
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
                        <div className="w-[140px] h-[140px] rounded-2xl border-[3px] border-sapphire bg-slate-900 shadow-[0_0_30px_rgba(15,82,186,0.4)] flex flex-col items-center justify-center gap-1.5 relative">
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
                        <path d="M 0,100 C 50,100 50,70 100,70" fill="none" stroke="rgba(15,82,186,0.2)" strokeWidth="2" />
                        <path d="M 0,100 C 50,100 50,130 100,130" fill="none" stroke="rgba(15,82,186,0.2)" strokeWidth="2" />
                        {/* Animated glow lines */}
                        <path d="M 0,100 C 50,100 50,70 100,70" className="workflow-line-glow" style={{ animationDelay: '1.5s' }} />
                        <path d="M 0,100 C 50,100 50,130 100,130" className="workflow-line-glow" style={{ animationDelay: '2s' }} />
                    </svg>
                </div>

                {/* Right Nodes */}
                <div className="flex flex-col gap-8 z-[2] shrink-0">
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white backdrop-blur-md min-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sapphire shrink-0">
                            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        <span className="text-[15px] font-semibold text-slate-700">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200 shadow-sm bg-white backdrop-blur-md min-w-[200px]">
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

/* ═══════════════════════════════════════════════════════
   5.  INDUSTRY SOLUTIONS — Simple Grid
   ═══════════════════════════════════════════════════════ */
function IndustryIllustration() {
    return (
        <div className="relative w-full h-56 flex flex-row items-center justify-center gap-4 px-6 overflow-hidden">
            <div className="w-[80px] h-[80px] rounded-2xl bg-white backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-center transition-transform hover:-translate-y-1">
                {/* Cross / Medical */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-sapphire">
                    <path d="M12 2v20M2 12h20" />
                </svg>
            </div>
            <div className="w-[100px] h-[100px] rounded-2xl bg-white backdrop-blur-md border border-sapphire/30 shadow-md flex items-center justify-center transition-transform hover:-translate-y-1 z-10">
                {/* Building / Real Estate */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-sapphire">
                    <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                </svg>
            </div>
            <div className="w-[80px] h-[80px] rounded-2xl bg-white backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-center transition-transform hover:-translate-y-1">
                {/* Tooth / Dental (Abstracted as a smile or shield for simplicity) */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-sapphire">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   6.  MANAGED AI — Shield & Monitor
   ═══════════════════════════════════════════════════════ */
function ManagedAIIllustration() {
    return (
        <div className="relative w-full h-56 flex flex-col items-center justify-center px-6 overflow-hidden">
            <div className="absolute w-[160px] h-[160px] rounded-full border-2 border-dashed border-sapphire/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                <div className="w-[120px] h-[120px] rounded-full border-2 border-sapphire/30 animate-[spin_7s_linear_infinite_reverse]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80px] h-[80px] bg-white rounded-2xl border border-sapphire/20 shadow-md flex items-center justify-center transition-transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-sapphire">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   7.  TRAINING — KI-Schulungen
   ═══════════════════════════════════════════════════════ */
function TrainingIllustration() {
    return (
        <div className="relative w-full h-56 flex flex-col items-center justify-center px-6 overflow-hidden">
            <div className="w-[100px] h-[100px] bg-white backdrop-blur-md rounded-full border border-sapphire/30 shadow-[0_0_20px_rgba(15,82,186,0.2)] flex items-center justify-center transition-transform hover:scale-105 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-sapphire">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
            </div>
            <div className="absolute w-[160px] h-[160px] border border-sapphire/20 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
            <div className="absolute w-[220px] h-[220px] border border-sapphire/10 rounded-full animate-[ping_4s_ease-in-out_infinite]" />
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
                transition: `all 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
            }}
        >
            <div className="group relative h-full rounded-3xl border border-slate-200 bg-white transition-all duration-500 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)] hover:-translate-y-1 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sapphire/[0.05] via-transparent to-transparent pointer-events-none" />

                {/* Illustration */}
                <div className="relative border-b border-slate-100 bg-slate-50/50">
                    {illustration}
                </div>

                {/* Content */}
                <div className="relative p-6">
                    <h3
                        className="text-base font-bold text-sapphire mb-2 tracking-tight"
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
        <section id="services" className="py-16 md:py-24 px-6">
            <div className="max-w-6xl mx-auto">
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
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        <LetterReveal text="Konkrete KI-Werkzeuge für deinen Praxis-, Büro- oder Kanzleialltag" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* Services Grid — 3×2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <ServiceCard
                        index={0}
                        title="KI-Strategie & Audit"
                        description="Von KI-Potenzialanalyse über EU-AI-Act-Compliance bis zur Tool-Auswahl — wir zeigen dir genau wo KI bei dir Sinn macht. BAFA-förderfähig."
                        illustration={<StrategyIllustration />}
                    />
                    <ServiceCard
                        index={1}
                        title="Chatbots & Termin-Assistenten"
                        description="Terminvereinbarung, Patienten-FAQ oder Vorab-Einordnung von Makler-Anfragen — unsere Assistenten antworten sofort, rund um die Uhr und immer freundlich."
                        illustration={<ChatbotIllustration />}
                    />
                    <ServiceCard
                        index={2}
                        title="KI-Telefonassistent"
                        description="Die Praxis klingelt ununterbrochen? Unser KI-Telefon-Assistent nimmt Anrufe entgegen, beantwortet Fragen und legt Termine direkt in eurem System an."
                        illustration={<ManagedAIIllustration />}
                    />
                    <ServiceCard
                        index={3}
                        title="Backoffice-Automatisierung"
                        description="Wir vernetzen eure bestehende Software (CRM, Kalender, E-Mail) und lassen KI wiederkehrende Aufgaben wie Datenübertragung und E-Mail-Sortierung erledigen."
                        illustration={<WorkflowIllustration />}
                    />
                    <ServiceCard
                        index={4}
                        title="Interner Wissens-Chatbot"
                        description="Kein langes Suchen mehr. Ein interner Assistent, der all eure Dokumente, Exposés oder Behandlungsrichtlinien kennt und sofort Antworten liefert."
                        illustration={<ContentGenIllustration />}
                    />
                    <ServiceCard
                        index={5}
                        title="Branchen-KI-Tools"
                        description="Wir implementieren spezialisierte KI-Lösungen wie automatische Exposé-Texter, KI-Dokumentation für Ärzte oder Bildverbesserung für Immobilien."
                        illustration={<IndustryIllustration />}
                    />
                    <ServiceCard
                        index={6}
                        title="KI-Schulungen"
                        description="Wir machen dein Team KI-fit. Praxisnahe KI-Schulungen, Tool-Trainings und Schulung eurer internen KI-Verantwortlichen — BAFA-förderfähig."
                        illustration={<TrainingIllustration />}
                        className="md:col-span-2 lg:col-span-1 lg:col-start-2"
                    />
                </div>
            </div>
        </section>
    );
}
