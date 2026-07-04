"use client";

import { ReactNode } from "react";

// Leichtgewichtiger Renderer für Bot-Nachrichten: **fett**, "- "-Listen und
// Aktions-Marker ([[roi]], [[termin]], [[kontakt]]) — bewusst ohne
// dangerouslySetInnerHTML und ohne Markdown-Dependency.

export type ChatAction = "roi" | "termin" | "kontakt";

const ACTION_LABELS: Record<ChatAction, string> = {
    roi: "ROI-Rechner öffnen",
    termin: "Termin buchen",
    kontakt: "Kontaktformular",
};

const ACTION_PATTERN = /\[\[(roi|termin|kontakt)\]\]/g;

// **fett** innerhalb einer Zeile
function renderInline(text: string, keyPrefix: string): ReactNode[] {
    return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
            return (
                <strong key={`${keyPrefix}-${i}`} className="font-semibold">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

interface ChatMarkdownProps {
    content: string;
    onAction?: (action: ChatAction) => void;
}

export default function ChatMarkdown({ content, onAction }: ChatMarkdownProps) {
    // Aktions-Marker einsammeln und aus dem Text entfernen
    const actions: ChatAction[] = [];
    let text = content.replace(ACTION_PATTERN, (_, name: ChatAction) => {
        if (!actions.includes(name)) actions.push(name);
        return "";
    });
    // Während des Streamings: angebrochenen Marker am Ende nicht roh anzeigen
    text = text.replace(/\[\[?[a-z]*$/, "").trimEnd();

    // Zeilen in Absätze und Listen gruppieren
    const blocks: ReactNode[] = [];
    let listItems: string[] = [];
    let paragraph: string[] = [];
    let blockKey = 0;

    const flushList = () => {
        if (listItems.length === 0) return;
        blocks.push(
            <ul key={`b${blockKey++}`} className="list-disc pl-4 space-y-1">
                {listItems.map((item, i) => (
                    <li key={i}>{renderInline(item, `li${i}`)}</li>
                ))}
            </ul>
        );
        listItems = [];
    };
    const flushParagraph = () => {
        if (paragraph.length === 0) return;
        const key = `b${blockKey++}`;
        blocks.push(
            <p key={key}>
                {paragraph.map((line, i) => (
                    <span key={i}>
                        {i > 0 && <br />}
                        {renderInline(line, `${key}-l${i}`)}
                    </span>
                ))}
            </p>
        );
        paragraph = [];
    };

    for (const rawLine of text.split("\n")) {
        const line = rawLine.trimEnd();
        const listMatch = line.match(/^\s*[-•]\s+(.*)$/);
        if (listMatch) {
            flushParagraph();
            listItems.push(listMatch[1]);
        } else if (line.trim() === "") {
            flushList();
            flushParagraph();
        } else {
            flushList();
            paragraph.push(line);
        }
    }
    flushList();
    flushParagraph();

    return (
        <div className="space-y-2">
            {blocks}
            {actions.length > 0 && onAction && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {actions.map((action) => (
                        <button
                            key={action}
                            type="button"
                            onClick={() => onAction(action)}
                            className="min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold bg-sapphire text-white hover:bg-sapphire-hover transition-colors"
                        >
                            {ACTION_LABELS[action]} →
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
