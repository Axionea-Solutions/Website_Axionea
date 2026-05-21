/**
 * Global Window-Augmentierung für Drittanbieter-Skripte
 * (Calendly, etc.)
 */

interface CalendlyAPI {
    initPopupWidget: (opts: { url: string }) => void;
}

declare global {
    interface Window {
        Calendly?: CalendlyAPI;
        __AXIONEA_CALENDLY_URL__?: string;
    }
}

export {};
