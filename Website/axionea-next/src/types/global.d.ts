/**
 * Global Window-Augmentierung für Drittanbieter-Skripte
 * (HubSpot Forms V3 & Meetings)
 */

interface HubSpotFormsAPI {
    create: (opts: {
        region: string;
        portalId: string;
        formId: string;
        target: string;
    }) => void;
}

declare global {
    interface Window {
        hbspt?: {
            forms?: HubSpotFormsAPI;
        };
    }
}

export {};
