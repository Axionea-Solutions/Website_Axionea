"use client";

import { useEffect } from "react";
import { HUBSPOT_MEETINGS_SCRIPT_SRC, HUBSPOT_MEETINGS_SRC } from "./config";

/**
 * HubSpot Meetings Embed.
 * Das Meetings-Script scannt nur beim Laden nach .meetings-iframe-container Divs.
 * Da der Container erst beim Modal-Öffnen gemountet wird, injizieren wir das Script
 * jedes Mal neu, damit es den neuen Container findet.
 */
export default function HubSpotMeetings() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = HUBSPOT_MEETINGS_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
        return () => {
            script.remove();
        };
    }, []);

    return (
        <div
            className="meetings-iframe-container"
            data-src={HUBSPOT_MEETINGS_SRC}
            style={{ minHeight: "600px", width: "100%" }}
        />
    );
}
