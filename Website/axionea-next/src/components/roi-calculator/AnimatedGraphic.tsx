"use client";

import { motion } from "framer-motion";

export function AnimatedGraphic() {
    return (
        <div className="absolute top-6 right-8 w-24 h-24 pointer-events-none hidden md:flex items-center justify-center opacity-80">
            {/* Soft Glow Background */}
            <div className="absolute inset-0 bg-sapphire/5 blur-xl rounded-full" />

            {/* Center core */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-8 h-8 bg-sapphire/30 rounded-full blur-[6px]"
            />
            <div className="absolute w-3 h-3 bg-sapphire rounded-full shadow-[0_0_20px_4px_rgba(15,82,186,0.6)] z-10" />

            {/* Orbit 1 - Fast inner */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute w-12 h-12 rounded-full border border-dashed border-sapphire/50"
            >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            </motion.div>

            {/* Orbit 2 - Slower outer */}
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-20 h-20 rounded-full border border-sapphire/20"
            >
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </motion.div>
        </div>
    );
}
