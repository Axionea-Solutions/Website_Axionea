"use client";

const tags = [
    { label: "Arztpraxen", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
    { label: "Rechtsanwälte", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { label: "Beautystudios", icon: "M12 2a10 10 0 100 20 10 10 0 000-20z" },
    { label: "Handwerk", icon: "M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" },
    { label: "Sportvereine", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" },
    { label: "Kleine Agenturen", icon: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" },
    { label: "Finanzberater", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
    { label: "Immobilienbüros", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { label: "Steuerberater", icon: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" },
    { label: "E-Commerce", icon: "M2 3h20v14H2zM8 21h8M12 17v4" },
    { label: "Gastronomie", icon: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" },
    { label: "Coaches", icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" },
    { label: "Startups", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
    { label: "Personalwesen", icon: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 3a4 4 0 110 8 4 4 0 010-8zM20 8v6M23 11h-6" },
];

function TagItem({ label, icon }: { label: string; icon: string }) {
    return (
        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-sm text-muted-foreground whitespace-nowrap hover:border-sapphire/30 hover:text-foreground transition-all duration-300 shrink-0">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 opacity-60"
            >
                <path d={icon} />
            </svg>
            {label}
        </span>
    );
}

export default function IndustryTagsBand() {
    return (
        <section className="py-8 px-6 border-t border-b border-black/5 dark:border-white/5">
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
                            <TagItem key={`a-${tag.label}`} label={tag.label} icon={tag.icon} />
                        ))}
                    </div>
                    {/* Track 2 */}
                    <div className="flex gap-4 shrink-0 pr-4">
                        {tags.map((tag) => (
                            <TagItem key={`b-${tag.label}`} label={tag.label} icon={tag.icon} />
                        ))}
                    </div>
                    {/* Track 3 */}
                    <div className="flex gap-4 shrink-0 pr-4">
                        {tags.map((tag) => (
                            <TagItem key={`c-${tag.label}`} label={tag.label} icon={tag.icon} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
