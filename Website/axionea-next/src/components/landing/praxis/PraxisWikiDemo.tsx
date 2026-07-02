"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { PraxisIcon } from "./icons";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

const EXAMPLE_QUESTIONS = [
    "Wie läuft eine Aligner-Behandlung ab?",
    "Wie oft werden Aligner gewechselt?",
    "Welche GOZ-Position gilt für die Erstberatung?",
    "Wie funktioniert das Recall-System?",
];

const FALLBACK_ANSWER =
    "Eine Aligner-Behandlung läuft typischerweise so ab: Erstberatung & Diagnostik → digitaler Scan → individueller Behandlungsplan → Aligner-Serie mit regelmäßigen Kontrollen → ggf. Retainer zur Stabilisierung. Die genaue Dauer hängt vom Befund ab — das klärt am besten das Praxisteam in einer persönlichen Beratung.";

export function PraxisWikiDemo() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notice, setNotice] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    async function ask(question: string) {
        const trimmed = question.trim();
        if (!trimmed || isLoading) return;

        setNotice(null);
        const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
        setMessages(nextMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/praxis-wiki", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: nextMessages }),
            });

            if (!res.ok || !res.body) {
                const data = await res.json().catch(() => null);
                setNotice(
                    data?.error ??
                        "Die Live-Demo ist gerade nicht erreichbar. Hier eine Beispiel-Antwort aus der Wissensbasis:",
                );
                setMessages([...nextMessages, { role: "assistant", content: FALLBACK_ANSWER }]);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let acc = "";
            setMessages([...nextMessages, { role: "assistant", content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                acc += decoder.decode(value, { stream: true });
                setMessages([...nextMessages, { role: "assistant", content: acc }]);
                scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
            }
        } catch {
            setNotice("Verbindung fehlgeschlagen. Hier eine Beispiel-Antwort aus der Wissensbasis:");
            setMessages([...nextMessages, { role: "assistant", content: FALLBACK_ANSWER }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="mb-20">
            <SectionHeading
                eyebrow="INTERAKTIV"
                eyebrowIcon="database"
                title="Frag das Praxis-Wiki"
                subtitle="Stell eine Frage — der Praxis-Agent antwortet aus der Wissensbasis. So fühlt sich euer zukünftiger Agent an"
            />

            <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] p-5 md:p-6">
                {/* Chat-Verlauf */}
                <div ref={scrollRef} className="mb-4 max-h-80 space-y-3 overflow-y-auto" aria-live="polite">
                    {messages.length === 0 ? (
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sapphire/10 text-sapphire">
                                <PraxisIcon name="database" className="h-4 w-4" />
                            </span>
                            <p className="text-sm text-slate-500">
                                Wähle eine Beispiel-Frage oder tippe deine eigene.
                            </p>
                        </div>
                    ) : (
                        messages.map((m, i) =>
                            m.role === "user" ? (
                                <div key={i} className="flex justify-end">
                                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-sapphire px-4 py-2.5 text-sm text-white">
                                        {m.content}
                                    </div>
                                </div>
                            ) : (
                                <div key={i} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sapphire/10 text-sapphire">
                                        <PraxisIcon name="database" className="h-3.5 w-3.5" />
                                    </span>
                                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm leading-relaxed text-slate-700">
                                        {m.content || (isLoading ? "…" : "")}
                                    </div>
                                </div>
                            ),
                        )
                    )}
                </div>

                {notice && (
                    <p className="mb-3 rounded-xl border border-amber/20 bg-amber/10 px-3 py-2 text-xs text-amber">
                        {notice}
                    </p>
                )}

                {/* Beispiel-Chips */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {EXAMPLE_QUESTIONS.map((q) => (
                        <button
                            key={q}
                            type="button"
                            onClick={() => ask(q)}
                            disabled={isLoading}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-sapphire/40 hover:text-sapphire disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {q}
                        </button>
                    ))}
                </div>

                {/* Eingabe */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        ask(input);
                    }}
                    className="flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Eigene Frage stellen…"
                        maxLength={1000}
                        disabled={isLoading}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-sapphire/50 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="shrink-0 rounded-xl bg-sapphire px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sapphire-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "…" : "Fragen"}
                    </button>
                </form>

                <p className="mt-3 text-center text-[11px] text-slate-400">
                    Demo — keine medizinische Beratung. Antworten stammen aus einer simulierten Wissensbasis.
                </p>
            </div>
        </section>
    );
}
