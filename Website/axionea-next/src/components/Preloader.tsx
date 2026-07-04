"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Lock body scroll during preloader
        document.body.style.overflow = "hidden";

        // Remove preloader smoothly after 1.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
            // We re-enable scroll slightly before the animation fully ends for better UX
            setTimeout(() => {
                document.body.style.overflow = "";
            }, 400);
        }, 1500);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    // The main slide-up exit animation
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[90] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Glowing Logo Container */}
                    <div className="relative flex flex-col items-center justify-center">

                        {/* Background ambient glow behind logo */}
                        <motion.div
                            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-sapphire/30 blur-[70px] rounded-full w-48 h-48 z-0"
                        />

                        {/* The Logo Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10"
                        >
                            <Image
                                src="/assets/logo/Asset 4@4x.png"
                                alt="Axionea Logo"
                                width={64}
                                height={57}
                                priority
                                className="object-contain drop-shadow-[0_0_20px_rgba(15,82,186,0.8)]"
                            />
                        </motion.div>

                        {/* Sleek Progress Bar Container */}
                        <div className="mt-10 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative z-10">
                            {/* Animated Progress Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
                                className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-sapphire to-cyan-400 rounded-full origin-left"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
