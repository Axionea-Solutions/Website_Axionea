"use client";

export default function Footer() {
    const links = [
        { label: "Services", href: "#services" },
        { label: "Kontakt", href: "#kontakt" },
        { label: "Prozess", href: "#prozess" },
        { label: "FAQ", href: "#faq" },
        { label: "Datenschutz", href: "#" },
        { label: "Impressum", href: "/impressum" },
    ];

    return (
        <footer className="relative pt-32 pb-12 px-6 overflow-hidden">
            {/* Ambient glow — large soft radial gradient behind the logo */}
            <div
                className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08] dark:opacity-[0.06]"
                style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
            />

            <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
                {/* Social Icons */}
                <div className="flex items-center gap-3 mb-10">
                    {/* X / Twitter */}
                    <a href="#" aria-label="X" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center hover:border-sapphire/30 hover:bg-sapphire/5 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-muted-foreground">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    {/* Instagram */}
                    <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center hover:border-sapphire/30 hover:bg-sapphire/5 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-muted-foreground">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center hover:border-sapphire/30 hover:bg-sapphire/5 transition-all duration-300">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-muted-foreground">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>

                {/* Logo + Brand */}
                <div className="flex items-center gap-3 mb-4">
                    <img src="/assets/logo/Asset 4@4x.png" alt="Axionea Logo" className="h-12 w-auto dark:invert-0" />
                </div>
                <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    AXIONEA
                </h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">
                    Next-gen KI-Systeme, gebaut für die Innovatoren von morgen.
                </p>

                {/* CTA Button */}
                <a
                    href="#kontakt"
                    className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-[15px] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] hover:bg-slate-50 mb-12"
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                    <span className="relative z-10 transition-colors duration-300 tracking-tight">Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-sapphire relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                    </svg>
                </a>

                {/* Nav Links */}
                <nav className="flex flex-wrap items-center justify-center gap-8 mb-10">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 decoration-transparent hover:decoration-muted-foreground transition-all duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Divider */}
                <div className="w-full h-px bg-black/5 dark:bg-white/5 mb-6" />

                {/* Copyright */}
                <p className="text-xs text-muted-foreground" suppressHydrationWarning>
                    AXIONEA © {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
