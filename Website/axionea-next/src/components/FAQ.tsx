"use client";

import { useState, useRef, useEffect } from "react";
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

/* ──────────────── FAQ Item ──────────────── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const { ref, isInView } = useInView(0.1);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div
            ref={ref}
            className="border-b border-gray-200 last:border-b-0"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(10px)",
                transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
            }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-5 px-6 text-left group cursor-pointer"
            >
                <span
                    className={`text-sm md:text-base font-medium transition-colors duration-300 ${isOpen ? 'text-sapphire' : 'text-slate-900 group-hover:text-sapphire'}`}
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-lg bg-slate-50 border border-gray-200 flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-sapphire/10 border-sapphire/20 rotate-45' : 'group-hover:bg-gray-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-sapphire' : 'text-slate-500'}`}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </button>
            <div
                style={{ height: `${height}px` }}
                className="overflow-hidden transition-[height] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
                <div ref={contentRef} className="px-6 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ──────────────── FAQ Data ──────────────── */
const faqs = [
    {
        question: "Was genau macht Axionea?",
        answer: "Axionea automatisiert Geschäftsprozesse mit KI — von Kundensupport-Chatbots über Content-Generierung bis hin zu vollautomatisierten Workflows. Wir analysieren deine Abläufe und implementieren maßgeschneiderte KI-Lösungen.",
    },
    {
        question: "Brauche ich technisches Wissen, um mit Axionea zu arbeiten?",
        answer: "Nein, überhaupt nicht. Wir kümmern uns um die gesamte technische Umsetzung. Du brauchst keine IT-Abteilung und keine Programmierkenntnisse — wir erklären alles verständlich und richten alles für dich ein.",
    },
    {
        question: "Wie lange dauert die Implementierung?",
        answer: "Je nach Komplexität zwischen 2 und 6 Wochen. Ein einfacher Chatbot kann in wenigen Tagen live sein, während umfassende Workflow-Automatisierungen etwas mehr Zeit benötigen. Du bekommst einen klaren Zeitplan im Vorfeld.",
    },
    {
        question: "Was kostet die Zusammenarbeit mit Axionea?",
        answer: "Unsere Preise richten sich nach dem Umfang deines Projekts. Wir bieten transparente Festpreise — keine versteckten Kosten, keine überraschenden Rechnungen. Buche ein kostenloses Erstgespräch und wir erstellen dir ein individuelles Angebot.",
    },
    {
        question: "Für welche Branchen ist Axionea geeignet?",
        answer: "Wir arbeiten mit Arztpraxen, Rechtsanwälten, Agenturen, E-Commerce, Handwerksbetrieben, Coaches und vielen weiteren Branchen. Überall dort, wo repetitive Aufgaben Zeit kosten, kann KI einen Mehrwert liefern.",
    },
    {
        question: "Bietet ihr auch laufenden Support an?",
        answer: "Ja! Nach der Implementierung bieten wir fortlaufende Optimierung und Support an. Wir überwachen die Performance deiner KI-Systeme und passen sie kontinuierlich an, damit sie immer auf Höchstleistung laufen.",
    },
];

/* ──────────────── Main FAQ Section ──────────────── */
export default function FAQ() {
    return (
        <section id="faq" className="py-16 md:py-24 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        FAQ
                    </span>
                    <h2
                        className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight leading-tight mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Häufige Fragen" />
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        <LetterReveal text="Alles was du über unsere KI-Lösungen wissen musst, auf einen Blick" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] overflow-hidden">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
