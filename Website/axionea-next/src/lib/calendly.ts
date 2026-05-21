/**
 * Dynamisches und DSGVO-konformes Laden des Calendly-Widgets bei Interaktion (Two-Click-Verfahren).
 * Verhindert, dass Calendly Cookies und Tracking-Skripte bereits beim Laden der Website lädt.
 */
export function openCalendly(url: string) {
    if (typeof window === "undefined") return;

    const executeWidget = () => {
        if (window.Calendly) {
            window.Calendly.initPopupWidget({ url });
        }
    };

    // 1. Wenn Calendly bereits geladen ist, direkt ausführen
    if (window.Calendly) {
        executeWidget();
        return;
    }

    // 2. CSS-Styles dynamisch in den Head einfügen (falls noch nicht vorhanden)
    if (!document.querySelector('link[href*="calendly.com"]')) {
        const link = document.createElement("link");
        link.href = "https://assets.calendly.com/assets/external/widget.css";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }

    // 3. Script-Tag dynamisch einfügen
    if (!document.querySelector('script[src*="calendly.com"]')) {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        script.onload = () => {
            executeWidget();
        };
        script.onerror = () => {
            console.error("Fehler beim Laden des Calendly-Skripts.");
            // Fallback: Zu Kontaktformular scrollen
            const contactSection = document.getElementById("kontakt");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
        };
        document.head.appendChild(script);
    }
}
