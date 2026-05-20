#!/usr/bin/env python3
"""
PDF Text Extractor — Axionea RAG Pipeline
Extracts and chunks text from PDFs for chatbot knowledge bases.

Usage:
    python extract_pdf.py <pdf_path> [--output .tmp/chunks.json]
    python extract_pdf.py docs/ --output .tmp/chunks.json  # Alle PDFs im Ordner

Dependencies:
    pip install pdfplumber
"""

import argparse
import json
import sys
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("ERROR: pdfplumber nicht installiert. Ausführen: pip install pdfplumber")
    sys.exit(1)


def extract_text_from_pdf(pdf_path: str) -> str:
    """Extrahiert den gesamten Text aus einem PDF."""
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            text = page.extract_text()
            if text:
                full_text += f"\n--- Seite {page_num} ---\n{text}\n"
    return full_text.strip()


def chunk_text(text: str, source: str, chunk_size: int = 800, overlap: int = 80) -> list[dict]:
    """Teilt Text in überlappende Chunks."""
    chunks = []
    step = chunk_size - overlap
    for i in range(0, len(text), step):
        chunk = text[i:i + chunk_size].strip()
        if len(chunk) > 50:  # Sehr kurze Chunks ignorieren
            chunks.append({
                "text": chunk,
                "source": source,
                "chunk_index": len(chunks),
                "char_start": i,
            })
    return chunks


def process_pdf(pdf_path: str) -> list[dict]:
    """Hauptfunktion: Extrahiert und chunked ein PDF."""
    path = Path(pdf_path)
    print(f"Verarbeite: {path.name}")
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print(f"  WARNUNG: Kein Text extrahiert aus {path.name}")
        return []
    chunks = chunk_text(text, source=path.name)
    print(f"  → {len(chunks)} Chunks aus {len(text)} Zeichen")
    return chunks


def main():
    parser = argparse.ArgumentParser(description="PDF Text Extractor für RAG-Pipeline")
    parser.add_argument("input", help="PDF-Datei oder Ordner mit PDFs")
    parser.add_argument("--output", default=".tmp/chunks.json", help="Output JSON-Datei")
    parser.add_argument("--chunk-size", type=int, default=800, help="Zeichen pro Chunk (default: 800)")
    parser.add_argument("--overlap", type=int, default=80, help="Überlappung in Zeichen (default: 80)")
    args = parser.parse_args()

    input_path = Path(args.input)
    all_chunks = []

    if input_path.is_dir():
        pdf_files = list(input_path.glob("**/*.pdf"))
        if not pdf_files:
            print(f"Keine PDF-Dateien gefunden in: {input_path}")
            sys.exit(1)
        for pdf_file in pdf_files:
            all_chunks.extend(process_pdf(str(pdf_file)))
    elif input_path.is_file() and input_path.suffix.lower() == ".pdf":
        all_chunks = process_pdf(str(input_path))
    else:
        print(f"ERROR: {input_path} ist keine PDF-Datei oder kein Ordner.")
        sys.exit(1)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, ensure_ascii=False, indent=2)

    print(f"\nFertig: {len(all_chunks)} Chunks gespeichert in {output_path}")

    # Auch als Plain-Text speichern (für direkte System-Prompt-Injektion)
    txt_output = output_path.with_suffix(".txt")
    with open(txt_output, "w", encoding="utf-8") as f:
        for chunk in all_chunks:
            f.write(chunk["text"] + "\n\n---\n\n")
    print(f"Plain-Text: {txt_output}")


if __name__ == "__main__":
    main()
