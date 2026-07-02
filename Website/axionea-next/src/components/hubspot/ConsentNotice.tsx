"use client";

import { setConsent } from "@/lib/consent";

/**
 * Platzhalter statt eines externen Embeds, solange keine Zustimmung vorliegt.
 * Klick lädt die externen Inhalte (setzt Consent = "all").
 */
export default function ConsentNotice({ kind }: { kind: "form" | "meetings" }) {
    const target = kind === "form" ? "das Kontaktformular" : "den Terminkalender";

    return (
        <div className="min-h-[420px] flex flex-col items-center justify-center text-center gap-4 p-8 rounded-xl border border-dashed border-slate-300 bg-slate-50">
            <div className="w-12 h-12 rounded-full bg-sapphire/10 border border-sapphire/20 flex items-center justify-center text-sapphire">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                </svg>
            </div>
            <div>
                <p className="font-bold text-slate-800 mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                    Externe Inhalte
                </p>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Um {target} zu laden, werden Daten über HubSpot (EU-Hosting) und Google reCAPTCHA verarbeitet. Bitte stimme dem Laden externer Inhalte zu.
                </p>
            </div>
            <button
                type="button"
                onClick={() => setConsent("all")}
                className="px-5 py-2.5 rounded-xl bg-sapphire text-white font-semibold text-sm hover:bg-sapphire-hover transition-colors cursor-pointer"
            >
                Akzeptieren &amp; laden
            </button>
            <a href="/datenschutz" className="text-xs text-slate-500 hover:underline">
                Mehr zum Datenschutz
            </a>
        </div>
    );
}
