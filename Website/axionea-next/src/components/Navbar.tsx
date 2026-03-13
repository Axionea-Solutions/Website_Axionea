"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group" aria-label="Axionea Startseite">
                    <Image
                        src="/assets/logo/Asset 4@4x.png"
                        alt="Axionea Logo"
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                    />
                    <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                        Axionea
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#warum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Plattform</a>
                    <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Lösungen</a>
                    <a href="#kontakt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
                    <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
                </div>

                {/* Desktop CTA */}
                <div className="flex items-center gap-3">
                    <a
                        href="#kontakt"
                        className="inline-flex h-8 md:h-10 items-center justify-center rounded-lg bg-sapphire px-3 md:px-5 text-xs md:text-sm font-medium text-white shadow transition-all hover:bg-sapphire-hover hover:shadow-lg hover:shadow-sapphire/20"
                    >
                        Jetzt starten
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
                >
                    <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    <a href="#warum" className="text-base text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>Plattform</a>
                    <a href="#services" className="text-base text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>Lösungen</a>
                    <a href="#kontakt" className="text-base text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>Support</a>
                    <a href="#faq" className="text-base text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>FAQ</a>
                    <a
                        href="#kontakt"
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-sapphire px-5 text-sm font-medium text-white shadow transition-all hover:bg-sapphire-hover w-full text-center"
                        onClick={() => setMobileOpen(false)}
                    >
                        Jetzt starten
                    </a>
                </div>
            )}
        </nav>
    );
}
