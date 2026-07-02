"use client";

import { useId } from "react";
import { HUBSPOT_FORM } from "./config";
import { useConsent } from "@/lib/consent";
import ConsentNotice from "./ConsentNotice";

/**
 * HubSpot Form V3 Embed.
 * Der globale Script (siehe layout.tsx) wird genau einmal geladen und erkennt alle
 * .hs-form-frame Divs — auch später (z.B. im Modal) gemountete — via MutationObserver
 * und rendert sie automatisch. Diese Komponente injiziert das Script daher NICHT
 * erneut: doppeltes Laden des Embeds verursacht Render-Races (leeres Formular).
 */
export default function HubSpotForm() {
    const consent = useConsent();
    const rawId = useId();
    const targetId = `hs-form-${rawId.replace(/:/g, "")}`;

    if (consent !== "all") return <ConsentNotice kind="form" />;

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
