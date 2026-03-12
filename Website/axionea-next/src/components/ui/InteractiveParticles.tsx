"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function InteractiveParticles() {
    const [init, setInit] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isAtBottom, setIsAtBottom] = useState(false);

    // This should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );

            // Check if we are near the bottom (Footer/Contact area)
            // Using 1200px as the threshold for "near bottom"
            const isBottom = (currentScrollY + windowHeight) >= (documentHeight - 1200);

            setScrollY(currentScrollY);
            setIsAtBottom(isBottom);
        };

        // Call once to set initial state
        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: { enable: false },
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60, // reduced from 120 for better performance
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    grab: {
                        distance: 250,
                        links: {
                            opacity: 0.8,
                            color: "#0F52BA" // Sapphire
                        }
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.1,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 0.8,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 120, // Mehr Partikel für breitere Screens
                },
                opacity: {
                    value: 0.3,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    if (init) {
        const isHero = scrollY <= 150;
        const isBlurred = !isHero && !isAtBottom;

        return (
            <div
                className={`fixed inset-0 w-full h-full z-0 pointer-events-none transition-all duration-700 ease-in-out ${isBlurred ? "blur-[4px] opacity-40 bg-black/40" : "blur-0 opacity-100 bg-transparent"
                    }`}
            >
                <div className="w-full h-full pointer-events-auto">
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                        className="w-full h-full"
                    />
                </div>
            </div>
        );
    }

    return null;
}
