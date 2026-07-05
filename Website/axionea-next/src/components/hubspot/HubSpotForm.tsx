"use client";

import { useEffect, useId, useRef, useState } from "react";
import { HUBSPOT_FORM, HUBSPOT_FORM_SCRIPT_SRC } from "./config";
import { useConsent } from "@/lib/consent";
import ConsentNotice from "./ConsentNotice";

/**
 * HubSpot Form V4 Embed.
 * Der globale Script (siehe ConsentScripts) rendert .hs-form-frame Divs — auch
 * später gemountete (z. B. im Modal). Das Innen-Rendering des iframes braucht
 * aber mehrere Sekunden; ohne Anzeige wirkt das Modal solange kaputt. Deshalb:
 * Skeleton solange geladen wird, nach Timeout ein Fallback mit Retry
 * (Re-Mount + Script-Reinject) und direkten Kontaktdaten.
 */
export default function HubSpotForm() {
    const consent = useConsent();
    const rawId = useId();
    const frameRef = useRef<HTMLDivElement>(null);
    const [attempt, setAttempt] = useState(0);
    const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

    useEffect(() => {
        if (consent !== "all") return;
        setStatus("loading");
        const started = Date.now();
        const timer = setInterval(() => {
            const iframe = frameRef.current?.querySelector("iframe");
            if (iframe && iframe.getBoundingClientRect().height > 50) {
                setStatus("ready");
                clearInterval(timer);
            } else if (Date.now() - started > 8000) {
                setStatus("failed");
                clearInterval(timer);
            }
        }, 300);
        return () => clearInterval(timer);
    }, [consent, attempt]);

    if (consent !== "all") return <ConsentNotice kind="form" />;

    const retry = () => {
        // Frame neu mounten (key) + Script erneut laden, damit der Embed neu scannt
        const script = document.createElement("script");
        script.src = `${HUBSPOT_FORM_SCRIPT_SRC}?r=${Date.now()}`;
        script.async = true;
        document.body.appendChild(script);
        setAttempt((a) => a + 1);
    };

    return (
        <div className="relative">
            <div
                key={attempt}
                ref={frameRef}
                id={`hs-form-${rawId.replace(/:/g, "")}-${attempt}`}
                className="hs-form-frame"
                data-region={HUBSPOT_FORM.region}
                data-form-id={HUBSPOT_FORM.formId}
                data-portal-id={HUBSPOT_FORM.portalId}
            />

            {status === "loading" && (
                <div className="min-h-[320px] flex flex-col items-center justify-center gap-3 text-slate-500" role="status" aria-label="Formular wird geladen">
                    <div className="w-8 h-8 rounded-full border-2 border-sapphire/30 border-t-sapphire animate-spin" aria-hidden="true" />
                    <p className="text-sm">Formular wird geladen …</p>
                </div>
            )}

            {status === "failed" && (
                <div className="min-h-[320px] flex flex-col items-center justify-center gap-4 text-center p-6">
                    <p className="text-sm text-slate-600 max-w-sm">
                        Das Formular lädt gerade nicht. Versuch es einmal neu — oder schreib uns direkt an{" "}
                        <a href="mailto:info@axionea-solutions.de" className="text-sapphire underline underline-offset-2">
                            info@axionea-solutions.de
                        </a>
                        .
                    </p>
                    <button
                        type="button"
                        onClick={retry}
                        className="px-5 py-2.5 rounded-xl bg-sapphire text-white font-semibold text-sm hover:bg-sapphire-hover transition-colors"
                    >
                        Formular neu laden
                    </button>
                </div>
            )}
        </div>
    );
}
