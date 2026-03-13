"use client";

import CardNav, { CardNavItem } from "./CardNav";
import { useTheme } from "./ThemeProvider";

export default function AnimatedNavbar() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const navItems: CardNavItem[] = [
        {
            label: "Plattform",
            bgColor: isDark ? "rgba(15, 82, 186, 0.15)" : "rgba(15, 82, 186, 0.08)",
            textColor: isDark ? "#ffffff" : "#000926",
            links: [
                { label: "Warum Axionea", href: "/#warum-axionea", ariaLabel: "Warum Axionea" },
                { label: "ROI-Rechner", href: "/#roi-rechner", ariaLabel: "ROI-Rechner öffnen" },
                { label: "Vergleich", href: "/#vergleich", ariaLabel: "Zum Vergleich" },
                { label: "Team", href: "/#team", ariaLabel: "Zum Team" },
            ],
        },
        {
            label: "Lösungen",
            bgColor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
            textColor: isDark ? "#ffffff" : "#000926",
            links: [
                { label: "Alle Services", href: "/#services", ariaLabel: "Alle Services ansehen" },
                { label: "Unser Prozess", href: "/#prozess", ariaLabel: "Unser Prozess" },
                { label: "KI-Architektur", href: "/#architektur", ariaLabel: "KI-Architektur" },
            ],
        },
        {
            label: "Support",
            bgColor: isDark ? "rgba(15, 82, 186, 0.25)" : "rgba(15, 82, 186, 0.10)",
            textColor: isDark ? "#ffffff" : "#000926",
            links: [
                { label: "FAQ", href: "/#faq", ariaLabel: "Häufige Fragen" },
            ],
        },
    ];

    return (
        <CardNav
            logo="/assets/logo/Asset 3@4x.png"
            logoAlt="Axionea Logo"
            items={navItems}
            baseColor={isDark ? "rgba(10, 10, 12, 0.85)" : "rgba(255, 255, 255, 0.85)"}
            menuColor={isDark ? "#ffffff" : "#000926"}
            buttonBgColor="#0F52BA"
            buttonTextColor="#ffffff"
            ease="power3.out"
        />
    );
}
