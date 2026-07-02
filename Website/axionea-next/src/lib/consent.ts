"use client";

import { useSyncExternalStore } from "react";

/**
 * Zentrale Consent-Verwaltung (DSGVO/TTDSG).
 * "all" = Zustimmung zu externen Inhalten (HubSpot, Google reCAPTCHA).
 * "essential" = nur technisch notwendige — keine Drittanbieter-Skripte.
 * null = noch keine Entscheidung getroffen.
 */
export type ConsentValue = "all" | "essential" | null;

const STORAGE_KEY = "axionea_cookie_consent";
const listeners = new Set<() => void>();

export function getConsent(): ConsentValue {
    if (typeof window === "undefined") return null;
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "all" || v === "essential" ? v : null;
}

export function setConsent(value: Exclude<ConsentValue, null>): void {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, value);
    listeners.forEach((l) => l());
}

function subscribe(callback: () => void): () => void {
    listeners.add(callback);
    return () => {
        listeners.delete(callback);
    };
}

/** Reaktiver Zugriff auf den Consent-Status in Client-Komponenten. */
export function useConsent(): ConsentValue {
    return useSyncExternalStore(subscribe, getConsent, () => null);
}

/** Zustimmung zu externen Inhalten (Drittanbieter-Skripte). */
export function hasMarketingConsent(): boolean {
    return getConsent() === "all";
}
