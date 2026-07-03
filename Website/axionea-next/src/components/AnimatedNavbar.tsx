"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { BookingButton } from "./hubspot";

type NavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

// Direkt in der Bar sichtbar (Desktop) — die wichtigsten Anlaufstellen
const PRIMARY_LINKS: NavLink[] = [
    { label: "Arztpraxen", href: "/ki-fuer-arztpraxen", ariaLabel: "KI für Arztpraxen" },
    { label: "Kieferorthopäden", href: "/ki-fuer-kieferorthopaeden", ariaLabel: "KI für Kieferorthopäden" },
    { label: "Makler", href: "/ki-fuer-makler", ariaLabel: "KI für Makler" },
    { label: "Förderung", href: "/foerderung", ariaLabel: "BAFA & Förderprogramme" },
];

// Im Fächer-Panel: alle Sektionen der Hauptseite + Sub-Pages + Legal
type PanelSection = {
    title: string;
    accent?: boolean;
    links: NavLink[];
};

const PANEL_SECTIONS: PanelSection[] = [
    {
        title: "Plattform",
        links: [
            { label: "Warum Axionea", href: "/#warum", ariaLabel: "Warum Axionea" },
            { label: "Sicheres Hosting", href: "/#hosting", ariaLabel: "Sicheres Hosting & Compliance" },
            { label: "ROI-Rechner", href: "/#roi", ariaLabel: "ROI-Rechner öffnen" },
            { label: "Services", href: "/#services", ariaLabel: "Alle Services" },
            { label: "Vergleich", href: "/#vergleich", ariaLabel: "Zum Vergleich" },
            { label: "Prozess", href: "/#prozess", ariaLabel: "Unser Prozess" },
            { label: "Team", href: "/#team", ariaLabel: "Zum Team" },
            { label: "FAQ", href: "/#faq", ariaLabel: "Häufige Fragen" },
        ],
    },
    {
        title: "Branchen",
        accent: true,
        links: [
            { label: "Arztpraxen", href: "/ki-fuer-arztpraxen", ariaLabel: "KI für Arztpraxen" },
            { label: "Kieferorthopäden", href: "/ki-fuer-kieferorthopaeden", ariaLabel: "KI für Kieferorthopäden" },
            { label: "Immobilienmakler", href: "/ki-fuer-makler", ariaLabel: "KI für Makler" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Förderung & BAFA", href: "/foerderung", ariaLabel: "BAFA & Förderprogramme" },
            { label: "Kontakt", href: "/#kontakt", ariaLabel: "Kontakt aufnehmen" },
            { label: "Impressum", href: "/impressum", ariaLabel: "Impressum" },
            { label: "Datenschutz", href: "/datenschutz", ariaLabel: "Datenschutz" },
        ],
    },
];

export default function AnimatedNavbar() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [isScrolled, setIsScrolled] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Scroll detection
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 80);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Body-Scroll lock wenn Panel offen
    useEffect(() => {
        if (isPanelOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isPanelOpen]);

    // ESC schließt Panel
    useEffect(() => {
        if (!isPanelOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsPanelOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isPanelOpen]);

    const baseBg = isDark ? "rgba(10, 10, 12, 0.75)" : "rgba(255, 255, 255, 0.78)";
    const panelBg = isDark ? "rgba(10, 10, 12, 0.95)" : "rgba(255, 255, 255, 0.97)";
    const textColor = isDark ? "text-white" : "text-[#000926]";
    const linkBase = isDark ? "text-white/75" : "text-[#000926]/70";
    const linkHover = isDark ? "hover:text-white" : "hover:text-[#000926]";
    const panelLinkBase = isDark ? "text-white/80" : "text-[#000926]/75";
    const panelLinkHover = isDark ? "hover:text-white" : "hover:text-[#000926]";

    return (
        <>
            {/* ─── Top Bar ─── */}
            {/* Beim Öffnen des Panels fadet die Bar weich aus, damit sie sich nicht mit dem Panel-Header überlappt */}
            <div
                className={`fixed left-1/2 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isScrolled
                        ? "w-[92%] max-w-[1100px] top-[0.8em]"
                        : "w-[96%] max-w-[1280px] top-[1.2em] md:top-[1.6em]"
                } ${
                    isPanelOpen
                        ? "opacity-0 -translate-y-2 pointer-events-none z-[45]"
                        : "opacity-100 z-[50]"
                }`}
                aria-hidden={isPanelOpen}
            >
                <nav
                    className={`relative flex items-center justify-between h-[60px] px-3 md:px-5 rounded-xl backdrop-blur-xl border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] ${textColor}`}
                    style={{ backgroundColor: baseBg }}
                    aria-label="Hauptnavigation"
                >
                    {/* ─── Brand: Logo + AXIONEA (links) ─── */}
                    <Link
                        href="/"
                        className="flex items-center gap-1 transition-opacity duration-300 hover:opacity-80 shrink-0"
                        onClick={(e) => {
                            if (typeof window !== "undefined" && window.location.pathname === "/") {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        aria-label="Axionea Startseite"
                    >
                        <img
                            src="/assets/logo/Asset 3@4x.png"
                            alt="Axionea Logo"
                            className={`h-[38px] w-auto transition-all duration-500 ${isDark ? "brightness-0 invert" : ""}`}
                        />
                        <span
                            className="text-[22px] md:text-[24px] font-bold tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            xionea
                        </span>
                    </Link>

                    {/* ─── Direkte Primary Links (mittig, lg+) ─── */}
                    <ul className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
                        {PRIMARY_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    aria-label={link.ariaLabel}
                                    className={`text-[14px] font-medium tracking-tight transition-colors duration-200 ${linkBase} ${linkHover}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* ─── Hamburger (rechts, nur Icon) ─── */}
                    <button
                        type="button"
                        onClick={() => setIsPanelOpen((v) => !v)}
                        aria-label={isPanelOpen ? "Menü schließen" : "Menü öffnen"}
                        aria-expanded={isPanelOpen}
                        aria-controls="nav-panel"
                        className={`group relative flex flex-col items-center justify-center gap-[6px] w-10 h-10 rounded-md transition-colors shrink-0 ${
                            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                        }`}
                    >
                        <span
                            className={`block w-[26px] h-[2px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-origin:50%_50%] ${
                                isPanelOpen ? "translate-y-[8px] rotate-45" : ""
                            }`}
                        />
                        <span
                            className={`block w-[26px] h-[2px] bg-current transition-all duration-300 ${
                                isPanelOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                            }`}
                        />
                        <span
                            className={`block w-[26px] h-[2px] bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-origin:50%_50%] ${
                                isPanelOpen ? "-translate-y-[8px] -rotate-45" : ""
                            }`}
                        />
                    </button>
                </nav>
            </div>

            {/* ─── Side-Panel Drawer (Fächer von links) ─── */}
            {/* Backdrop */}
            <div
                onClick={() => setIsPanelOpen(false)}
                className={`fixed inset-0 z-[55] bg-black/55 backdrop-blur-sm transition-opacity duration-400 ${
                    isPanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden="true"
            />

            {/* Drawer — fächert von rechts ein */}
            <aside
                id="nav-panel"
                role="dialog"
                aria-label="Erweiterte Navigation"
                aria-modal="true"
                className={`fixed top-0 right-0 bottom-0 z-[60] w-[88%] sm:w-[420px] max-w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isPanelOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div
                    className={`h-full overflow-y-auto backdrop-blur-2xl border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] ${textColor}`}
                    style={{ backgroundColor: panelBg }}
                >
                    {/* Header — Logo + Close */}
                    <div className="flex items-center justify-between p-5 border-b border-white/5">
                        <Link
                            href="/"
                            onClick={() => setIsPanelOpen(false)}
                            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
                            aria-label="Axionea Startseite"
                        >
                            <img
                                src="/assets/logo/Asset 3@4x.png"
                                alt="Axionea Logo"
                                className={`h-[34px] w-auto ${isDark ? "brightness-0 invert" : ""}`}
                            />
                            <span
                                className="text-[22px] font-bold tracking-tight"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                xionea
                            </span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsPanelOpen(false)}
                            aria-label="Menü schließen"
                            className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                                isDark ? "hover:bg-white/5" : "hover:bg-black/5"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5"
                                aria-hidden="true"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Sektionen mit Fächer-Stagger */}
                    <div className="p-4 flex flex-col gap-3">
                        {PANEL_SECTIONS.map((section, idx) => (
                            <div
                                key={section.title}
                                className={`rounded-xl p-5 border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    section.accent
                                        ? "border-sapphire/25"
                                        : isDark
                                          ? "border-white/[0.06]"
                                          : "border-black/[0.06]"
                                } ${isPanelOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                                style={{
                                    backgroundColor: section.accent
                                        ? "rgba(15, 82, 186, 0.10)"
                                        : isDark
                                          ? "rgba(255, 255, 255, 0.03)"
                                          : "rgba(0, 0, 0, 0.025)",
                                    transitionDelay: isPanelOpen ? `${120 + idx * 80}ms` : "0ms",
                                }}
                            >
                                <div
                                    className="text-[11px] font-bold tracking-[0.12em] uppercase mb-3 text-sapphire"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {section.title}
                                </div>
                                <ul className="flex flex-col gap-1">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                aria-label={link.ariaLabel}
                                                onClick={() => setIsPanelOpen(false)}
                                                className={`flex items-center gap-2 py-2 text-[15px] transition-colors duration-200 ${panelLinkBase} ${panelLinkHover}`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-3.5 h-3.5 opacity-50 shrink-0"
                                                    aria-hidden="true"
                                                >
                                                    <path d="m9 18 6-6-6-6" />
                                                </svg>
                                                <span>{link.label}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Footer-CTA im Panel — öffnet HubSpot Meetings im Modal */}
                        <div
                            className={`mt-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                isPanelOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                            }`}
                            style={{ transitionDelay: isPanelOpen ? `${120 + PANEL_SECTIONS.length * 80}ms` : "0ms" }}
                        >
                            <BookingButton
                                ariaLabel="Kostenloses Erstgespräch buchen"
                                onOpen={() => setIsPanelOpen(false)}
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-sapphire text-white text-sm font-bold tracking-tight transition-all duration-300 hover:bg-sapphire-hover hover:shadow-[0_4px_20px_rgba(15,82,186,0.5)]"
                            >
                                Kostenloses Erstgespräch buchen
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </BookingButton>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
