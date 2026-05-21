"use client";

import Link from "next/link";
import { LetterReveal } from "@/components/ui/LetterReveal";
import { useInView } from "@/hooks/useInView";

export interface UseCase {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface IndustryStat {
    value: string;
    label: string;
}

export interface IndustryFAQ {
    question: string;
    answer: string;
}

export interface IndustryLandingProps {
    chip: string;
    chipIcon: React.ReactNode;
    headline: string;
    subline: string;
    intro: string;
    stats: IndustryStat[];
    useCases: UseCase[];
    faqs: IndustryFAQ[];
    ctaText: string;
}

export default function IndustryLanding({
    chip,
    chipIcon,
    headline,
    subline,
    intro,
    stats,
    useCases,
    faqs,
    ctaText,
}: IndustryLandingProps) {
    const { ref, isInView } = useInView(0.1);

    return (
        <main className="min-h-screen bg-[#070d1a] text-white selection:bg-sapphire selection:text-white pt-32 pb-16 overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-sapphire/20 blur-[120px]" />
                <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
                {/* Hero */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                        {chipIcon}
                        {chip}
                    </span>
                    <h1
                        className="text-[clamp(36px,6vw,72px)] font-bold tracking-tight leading-tight mb-6 text-white"
                        style={{
                            fontFamily: "var(--font-syne)",
                            textShadow: '0 0 16px rgba(125,211,252,0.5), 0 0 40px rgba(56,189,248,0.4), 0 0 90px rgba(15,82,186,0.4)',
                        }}
                    >
                        <LetterReveal text={headline} />
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        <LetterReveal text={subline} delay={0.2} stagger={0.012} />
                    </p>
                </div>

                {/* Intro */}
                <div className="max-w-3xl mx-auto mb-16">
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {intro}
                    </p>
                </div>

                {/* Stats */}
                <div
                    ref={ref}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20"
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center">
                            <p
                                className="text-3xl md:text-4xl font-bold text-sapphire mb-2"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Use Cases */}
                <div className="mb-20">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-10 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Was wir konkret bauen" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {useCases.map((uc, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:border-sapphire/30 hover:bg-sapphire/5 transition-all duration-300"
                            >
                                <div className="w-11 h-11 rounded-xl bg-sapphire/15 border border-sapphire/20 flex items-center justify-center text-sapphire mb-4">
                                    {uc.icon}
                                </div>
                                <h3
                                    className="text-lg font-bold text-white mb-2"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {uc.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="mb-20">
                    <h2
                        className="text-3xl md:text-4xl font-bold text-white text-center mb-10 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        <LetterReveal text="Häufige Fragen" />
                    </h2>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {faqs.map((faq, i) => (
                            <details
                                key={i}
                                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 open:bg-sapphire/5 open:border-sapphire/30 transition-all"
                            >
                                <summary
                                    className="cursor-pointer font-semibold text-white text-base md:text-lg list-none flex justify-between items-center gap-4"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-sapphire text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
                                </summary>
                                <p className="text-gray-300 mt-4 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center rounded-3xl border border-sapphire/30 bg-sapphire/10 backdrop-blur-md p-10 md:p-14">
                    <h2
                        className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        {ctaText}
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Wir analysieren in 15 Minuten ob KI bei dir wirklich Sinn macht — kostenlos, ohne Vertrag, ohne Verkaufsdruck.
                    </p>
                    <Link
                        href="/#kontakt"
                        className="inline-block px-8 py-4 rounded-full bg-sapphire text-white font-semibold text-lg hover:bg-sapphire-hover transition-all shadow-[0_0_30px_rgba(15,82,186,0.6)] hover:shadow-[0_0_40px_rgba(15,82,186,0.8)]"
                    >
                        Kostenloses Erstgespräch buchen →
                    </Link>
                </div>
            </div>
        </main>
    );
}
