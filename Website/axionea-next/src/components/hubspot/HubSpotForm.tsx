"use client";

import { useEffect, useId } from "react";
import { HUBSPOT_FORM, HUBSPOT_FORM_SCRIPT_SRC } from "./config";

/**
 * HubSpot Form V3 Embed.
 * Der globale Script (siehe layout.tsx) erkennt .hs-form-frame Divs via MutationObserver
 * und rendert sie automatisch — auch wenn sie später (z.B. im Modal) gemountet werden.
 * Als Safety-Net injizieren wir das Script zusätzlich beim Mount, falls das Modal
 * vor dem globalen Script lädt.
 */
export default function HubSpotForm() {
    const rawId = useId();
    const targetId = `hs-form-${rawId.replace(/:/g, "")}`;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = HUBSPOT_FORM_SCRIPT_SRC;
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            script.remove();
        };
    }, []);

    return (
        <div
            id={targetId}
            className="hs-form-frame"
            data-region={HUBSPOT_FORM.region}
            data-form-id={HUBSPOT_FORM.formId}
            data-portal-id={HUBSPOT_FORM.portalId}
        />
    );
}
