"use client";

import { useEffect } from "react";
import { HUBSPOT_MEETINGS_SCRIPT_SRC, HUBSPOT_MEETINGS_SRC } from "./config";
import { useConsent } from "@/lib/consent";
import ConsentNotice from "./ConsentNotice";

/**
 * HubSpot Meetings Embed.
 * Das Meetings-Script scannt nur beim Laden nach .meetings-iframe-container Divs.
 * Da der Container erst beim Modal-Öffnen gemountet wird, injizieren wir das Script
 * jedes Mal neu, damit es den neuen Container findet.
 * Lädt erst nach Zustimmung zu externen Inhalten (DSGVO/TTDSG).
 */
export default function HubSpotMeetings() {
    const consent = useConsent();

    useEffect(() => {
        if (consent !== "all") return;
        const script = document.createElement("script");
        script.src = HUBSPOT_MEETINGS_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
        return () => {
            script.remove();
        };
    }, [consent]);

    if (consent !== "all") return <ConsentNotice kind="meetings" />;

    return (
        <div
            className="meetings-iframe-container"
            data-src={HUBSPOT_MEETINGS_SRC}
            style={{ minHeight: "600px", width: "100%" }}
        />
    );
}
