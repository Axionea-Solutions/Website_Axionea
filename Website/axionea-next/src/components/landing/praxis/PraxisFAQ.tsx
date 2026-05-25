"use client";

import { LetterReveal } from "@/components/ui/LetterReveal";
import { kfoFaqs } from "@/data/kfo-praxis";

export function PraxisFAQ() {
    return (
        <section className="mb-20">
            <h2
                className="text-3xl md:text-4xl font-bold text-white text-center mb-10 tracking-tight"
                style={{ fontFamily: "var(--font-syne)" }}
            >
                <LetterReveal text="Häufige Fragen" />
            </h2>
            <div className="space-y-4 max-w-3xl mx-auto">
                {kfoFaqs.map((faq) => (
                    <details
                        key={faq.question}
                        className="group rounded-2xl border border-slate-200 bg-white shadow-sm p-6 open:bg-[#F0F5FF] open:border-sapphire/40 hover:border-sapphire/30 transition-all"
                    >
                        <summary
                            className="cursor-pointer font-semibold text-slate-900 text-base md:text-lg list-none flex justify-between items-center gap-4"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            <span>{faq.question}</span>
                            <span className="text-sapphire text-2xl group-open:rotate-45 transition-transform shrink-0">+</span>
                        </summary>
                        <p className="text-slate-600 mt-4 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
