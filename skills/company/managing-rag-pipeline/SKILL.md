---
name: managing-rag-pipeline
description: >
  Builds a RAG (Retrieval Augmented Generation) pipeline to inject document
  knowledge (PDFs, Word files, text) into AI chatbots. Use when the user wants
  to give a chatbot knowledge from documents, says "PDFs als Wissensbasis",
  "Dokumente einlesen", "RAG aufbauen", "Vektordatenbank", "Verlustanalyse
  hinterlegen", or asks how to make a chatbot answer from specific files.
---

# Managing RAG Pipeline

## When to use this skill
- Chatbot soll aus PDFs / Word-Dokumenten antworten können
- Große Wissensbasis (>10 Seiten) die nicht komplett in den System-Prompt passt
- Dokumente ändern sich regelmäßig (z.B. monatliche Reports)
- Mehrere Kunden-Dokumente sollen getrennt abrufbar sein

## Wann KEIN RAG (Static Prompt statt RAG)

Für kleine Wissensbasis (<10 kompakte Seiten) ist es einfacher, den Text direkt
in den System-Prompt einzufügen — kein extra Service, kein extra Code.
→ Nutze dann: `skills/company/building-chatbots/resources/system-prompt-template.md`

---

## RAG Architektur

```
PDF/Dokument
    ↓ Extrahieren (PyPDF2 / pdfplumber)
Rohtext
    ↓ Chunking (500–1000 Tokens, 10% Overlap)
Text-Chunks
    ↓ Embedding (text-embedding-004 / ada-002)
Vektoren
    ↓ Speichern
Vektordatenbank (Supabase pgvector | Pinecone | lokale FAISS)
    ↓ Bei User-Frage: Top-K Chunks retrieven
Relevante Chunks → In System-Prompt injizieren → LLM
```

---

## Workflow

- [ ] Dokumente sammeln und in `/docs` ablegen
- [ ] PDF-Extraktion ausführen (`scripts/extract_pdf.py`)
- [ ] Chunks erstellen und in Vektordatenbank laden (`scripts/ingest.py`)
- [ ] Retrieval-Funktion in API-Route einbauen
- [ ] System-Prompt mit retrievten Chunks anreichern
- [ ] Testen: Fragen stellen die im Dokument beantwortet werden

---

## Tech Stack Empfehlung

| Komponente | Empfehlung | Alternative |
|-----------|-----------|-------------|
| PDF-Extraktion | `pdfplumber` | `PyPDF2`, `pymupdf` |
| Embeddings | Google `text-embedding-004` | OpenAI `ada-002` |
| Vektordatenbank | Supabase pgvector | Pinecone, FAISS (lokal) |
| Retrieval | cosine similarity, Top-5 | |

---

## Script: PDF Extrahieren

```python
# scripts/extract_pdf.py
import pdfplumber
import json
from pathlib import Path

def extract_pdf(pdf_path: str) -> list[dict]:
    """Extrahiert Text aus PDF und gibt Chunks zurück."""
    chunks = []
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"

    # Chunking: 800 Zeichen mit 80 Zeichen Overlap
    chunk_size = 800
    overlap = 80
    for i in range(0, len(full_text), chunk_size - overlap):
        chunk = full_text[i:i + chunk_size]
        if chunk.strip():
            chunks.append({
                "text": chunk.strip(),
                "source": Path(pdf_path).name,
                "chunk_index": len(chunks)
            })
    return chunks

if __name__ == "__main__":
    import sys
    chunks = extract_pdf(sys.argv[1])
    print(f"Extrahiert: {len(chunks)} Chunks")
    with open(".tmp/chunks.json", "w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)
```

---

## Option: Statische Injektion (einfachster RAG-Ersatz)

Für kleine Dokumente: Text direkt als Konstante in der API-Route speichern.

```typescript
// app/api/chat/route.ts
import { readFileSync } from 'fs';
import { join } from 'path';

// Wird einmalig beim Server-Start geladen
const KNOWLEDGE_BASE = readFileSync(
    join(process.cwd(), 'data/knowledge.txt'),
    'utf-8'
);

const SYSTEM_PROMPT = `
Du bist Ax, der Assistent von Axionea.

## Dein Wissen:
${KNOWLEDGE_BASE}

## Regeln:
...
`;
```

Datei `data/knowledge.txt` enthält den extrahierten PDF-Text.
**Diese Option reicht für 90% der Website-Chatbot-Fälle.**

---

## Resources
- `scripts/extract_pdf.py` — PDF-Text-Extraktion
- Upstream: `skills/company/building-chatbots/` — Chatbot-Integration
