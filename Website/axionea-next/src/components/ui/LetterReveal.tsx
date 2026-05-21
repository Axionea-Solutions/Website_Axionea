"use client";

import { useInView } from "@/hooks/useInView";

interface LetterRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    as?: React.ElementType;
}

export function LetterReveal({
    text,
    className = "",
    delay = 0,
    stagger = 0.03,
    as: Component = "span"
}: LetterRevealProps) {
    const { ref, isInView } = useInView(0.1);

    // Split text into words, then words into letters, to preserve natural word breaking
    const words = text.split(" ");
    let letterIndex = 0;

    return (
        <Component ref={ref} className={`inline-block ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split("").map((letter, i) => {
                        const currentDelay = delay + (letterIndex * stagger);
                        letterIndex++;
                        return (
                            <span
                                key={i}
                                className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isInView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 -translate-y-[20px] blur-[4px]"}`}
                                style={{
                                    transitionDelay: `${currentDelay}s`,
                                }}
                            >
                                {letter}
                            </span>
                        );
                    })}
                    {/* Add space between words unless it's the last word */}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </Component>
    );
}
