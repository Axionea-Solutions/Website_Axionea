"use client";

import { useState } from "react";
import { LetterReveal } from "./ui/LetterReveal";
import { useInView } from "@/hooks/useInView";



/* ──────────────── FAQ Item ──────────────── */
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const { ref, isInView } = useInView(0.1);

    return (
        <div
            ref={ref}
            className="border-b border-slate-100 last:border-b-0"
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
                    className={`text-sm md:text-base font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-sapphire' : 'text-slate-900 group-hover:text-sapphire'}`}
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-sapphire/10 border border-sapphire/20 rotate-45' : 'bg-slate-50 border border-slate-100 group-hover:bg-slate-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-sapphire' : 'text-slate-400'}`}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </button>
            <div
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
                <div className="overflow-hidden">
                    <div className="px-6 pb-5">
                        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                            {answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ──────────────── FAQ Data ──────────────── */
const faqs = [
    {
        question: "Was genau macht Axionea?",
        answer: "Axionea automatisiert Geschäftsprozesse mit KI — von Chatbots für die Terminvereinbarung über KI-Telefonassistenten für den Telefonsupport bis hin zu internen Wissens-Chatbots. Wir analysieren deine Abläufe und richten maßgeschneiderte KI-Lösungen für dich ein.",
    },
    {
        question: "Brauche ich technisches Wissen, um mit Axionea zu arbeiten?",
        answer: "Nein, überhaupt nicht. Wir kümmern uns um die gesamte technische Umsetzung. Du brauchst keine IT-Abteilung und keine Programmierkenntnisse — wir erklären alles verständlich und richten alles für dich ein.",
    },
    {
        question: "Wie lange dauert die Implementierung?",
        answer: "Je nach Komplexität zwischen 2 und 6 Wochen. Ein einfacher KI-Chatbot für die Terminbuchung kann in wenigen Tagen live sein, während umfassende Workflow-Automatisierungen etwas mehr Zeit benötigen. Du bekommst einen klaren Zeitplan im Vorfeld.",
    },
    {
        question: "Für welche Branchen ist Axionea geeignet?",
        answer: "Wir haben uns auf Arztpraxen, Kieferorthopäden und Immobilienmakler spezialisiert. Unsere KI-Lösungen sind genau auf die täglichen Herausforderungen in diesen Branchen zugeschnitten, etwa bei Terminverwaltung, Patientensupport oder Immobilien-Exposés.",
    },
    {
        question: "Ist eure KI DSGVO-konform für Arztpraxen?",
        answer: "Ja. Wir arbeiten ausschließlich mit EU-Hosting, schließen Auftragsverarbeitungsverträge (AVV) ab und nutzen KI-Modelle ohne Training auf Kundendaten. Patientendaten werden niemals unkontrolliert verarbeitet. Auf Wunsch begleiten wir euch durch die vollständige EU-AI-Act-Compliance.",
    },
    {
        question: "Was kostet ein Einstieg mit Axionea?",
        answer: "Unser KI-Potenzial-Check startet ab 990 € — BAFA-förderfähig mit bis zu 2.800 € Förderung. Danach wisst ihr genau, was sich lohnt, bevor ihr investiert. Daneben bieten wir Festpreis-Pilotprojekte und ein monatliches Retainer-Modell (Managed AI) an.",
    },
    {
        question: "Bietet ihr auch Schulungen für unser Team an?",
        answer: "Ja, wir bieten spezielle KI-Schulungen, AI-Fluency-Workshops und Train-the-Trainer-Programme an. So stellen wir sicher, dass euer gesamtes Team die neuen Tools sicher und effizient nutzen kann.",
    }
];

/* ──────────────── Main FAQ Section ──────────────── */
export default function FAQ() {
    return (
        <section id="faq" className="py-16 md:py-24 px-6">
            <div className="max-w-4xl mx-auto">
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
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        <LetterReveal text="Alles was du über unsere KI-Lösungen wissen musst, auf einen Blick" delay={0.2} stagger={0.015} />
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:border-sapphire/50 hover:shadow-[0_0_20px_rgba(15,82,186,0.25),0_0_50px_rgba(15,82,186,0.12)]">
                    {faqs.map((faq, i) => (
                        <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
