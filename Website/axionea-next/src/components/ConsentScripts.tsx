"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";
import { HUBSPOT_FORM_SCRIPT_SRC } from "./hubspot/config";

/**
 * Lädt Drittanbieter-Skripte erst nach Zustimmung (DSGVO/TTDSG).
 * Das HubSpot-Formular-Embed (inkl. Google reCAPTCHA) wird nur geladen,
 * wenn der Nutzer externen Inhalten zugestimmt hat.
 * Das Meetings-Script injiziert die HubSpotMeetings-Komponente selbst,
 * ebenfalls nur bei vorliegender Zustimmung.
 */
export default function ConsentScripts() {
    const consent = useConsent();

    if (consent !== "all") return null;

    return <Script src={HUBSPOT_FORM_SCRIPT_SRC} strategy="afterInteractive" />;
}
