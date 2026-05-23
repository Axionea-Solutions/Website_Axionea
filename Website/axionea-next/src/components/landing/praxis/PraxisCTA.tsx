"use client";

import Link from "next/link";

export function PraxisCTA({ ctaText }: { ctaText: string }) {
    return (
        <section className="text-center rounded-3xl border border-sapphire/30 bg-sapphire/10 backdrop-blur-md p-10 md:p-14">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
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
        </section>
    );
}
