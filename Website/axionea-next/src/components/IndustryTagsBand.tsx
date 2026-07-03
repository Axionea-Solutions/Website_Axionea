"use client";

import Link from "next/link";

// Referenz-Branchen mit eigener Landingpage werden verlinkt. Steuerberater
// bekommt erst einen Link, sobald /ki-fuer-steuerberater existiert.
const tags: { label: string; icon: string; key?: boolean; href?: string }[] = [
    { label: "Arztpraxen", icon: "M22 12h-4l-3 9L9 3l-3 9H2", key: true, href: "/ki-fuer-arztpraxen" },
    { label: "Kieferorthopäden", icon: "M12 5.5c-2-2-5-2.5-6 .5-1 3 1 6 2.5 9 .8 1.6 1.5 3 3.5 3s2.7-1.4 3.5-3c1.5-3 3.5-6 2.5-9-1-3-4-2.5-6-.5z", key: true, href: "/ki-fuer-kieferorthopaeden" },
    { label: "Immobilienmakler", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", key: true, href: "/ki-fuer-makler" },
    { label: "Steuerberater", icon: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z", key: true },
    { label: "Rechtsanwälte", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { label: "Beautystudios", icon: "M12 2a10 10 0 100 20 10 10 0 000-20z" },
    { label: "Handwerk", icon: "M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" },
    { label: "Sportvereine", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" },
    { label: "Kleine Agenturen", icon: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" },
    { label: "Finanzberater", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
    { label: "E-Commerce", icon: "M2 3h20v14H2zM8 21h8M12 17v4" },
    { label: "Gastronomie", icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" },
    { label: "Coaches", icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" },
    { label: "Startups", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
    { label: "Personalwesen", icon: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 3a4 4 0 110 8 4 4 0 010-8zM20 8v6M23 11h-6" },
];

function TagItem({ label, icon, isKey, href }: { label: string; icon: string; isKey?: boolean; href?: string }) {
    const className = `inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm whitespace-nowrap transition-all duration-300 shrink-0 ${
        isKey
            ? "border-sapphire/40 bg-sapphire/10 text-sapphire font-semibold shadow-[0_0_16px_rgba(15,82,186,0.15)]"
            : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-muted-foreground hover:border-sapphire/30 hover:text-foreground"
    } ${href ? "hover:bg-sapphire/20 hover:shadow-[0_0_24px_rgba(15,82,186,0.3)]" : ""}`;

    const content = (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-4 h-4 ${isKey ? "opacity-100" : "opacity-60"}`}
                aria-hidden="true"
            >
                <path d={icon} />
            </svg>
            {label}
            {href && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} aria-label={`KI für ${label} — zur Referenzseite`} className={className}>
                {content}
            </Link>
        );
    }
    return <span className={className}>{content}</span>;
}

export default function IndustryTagsBand() {
    return (
        <section className="py-12 md:py-16 px-6 border-t border-b border-black/5 dark:border-white/5">
            {/* Header — Referenzen zeigen, Bandbreite betonen */}
            <div className="max-w-3xl mx-auto text-center mb-8">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[3px] uppercase text-sapphire mb-4 bg-sapphire/10 px-4 py-2 rounded-full border border-sapphire/15">
                    Referenzen
                </span>
                <h2
                    className="text-[clamp(24px,4vw,40px)] font-bold tracking-tight leading-tight mb-3"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    Branchen, in denen wir liefern
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                    Erprobte Lösungen für <Link href="/ki-fuer-arztpraxen" className="text-foreground font-medium underline underline-offset-4 decoration-sapphire/40 hover:decoration-sapphire transition-colors">Arztpraxen</Link>,{" "}
                    <Link href="/ki-fuer-kieferorthopaeden" className="text-foreground font-medium underline underline-offset-4 decoration-sapphire/40 hover:decoration-sapphire transition-colors">Kieferorthopäden</Link>,{" "}
                    <Link href="/ki-fuer-makler" className="text-foreground font-medium underline underline-offset-4 decoration-sapphire/40 hover:decoration-sapphire transition-colors">Makler</Link> &amp;{" "}
                    <span className="text-foreground font-medium">Steuerberater</span> — die Technik dahinter funktioniert überall, wo Abläufe sich wiederholen.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                {/* Marquee wrapper — three identical tracks for seamless loop */}
                <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
                    {/* Track 1 */}
                    <div className="flex gap-4 shrink-0 pr-4">
                        {tags.map((tag) => (
                            <TagItem key={`a-${tag.label}`} label={tag.label} icon={tag.icon} isKey={tag.key} href={tag.href} />
                        ))}
                    </div>
                    {/* Track 2 */}
                    <div className="flex gap-4 shrink-0 pr-4">
                        {tags.map((tag) => (
                            <TagItem key={`b-${tag.label}`} label={tag.label} icon={tag.icon} isKey={tag.key} href={tag.href} />
                        ))}
                    </div>
                    {/* Track 3 */}
                    <div className="flex gap-4 shrink-0 pr-4">
                        {tags.map((tag) => (
                            <TagItem key={`c-${tag.label}`} label={tag.label} icon={tag.icon} isKey={tag.key} href={tag.href} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
