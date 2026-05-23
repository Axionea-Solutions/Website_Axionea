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
        </section>
    );
}
