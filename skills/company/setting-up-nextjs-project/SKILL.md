---
name: setting-up-nextjs-project
description: >
  Scaffolds a new Next.js client project following Axionea's standard stack
  and conventions. Use when starting a new website project for a client,
  bootstrapping a Next.js app, or setting up TypeScript, Tailwind, and
  project structure from scratch. Trigger when user says "neues Kundenprojekt",
  "Website aufsetzen", "Next.js Projekt starten", "Projekt scaffolden".
---

# Setting Up a Next.js Project

## When to use this skill
- Neues Kundenprojekt anlegen (Website, Landing Page, Web-App)
- Frisches Next.js Repo mit Axionea-Konventionen aufsetzen
- TypeScript + Tailwind + ESLint korrekt konfigurieren

---

## Standard Stack

| Technologie | Version | Zweck |
|------------|---------|-------|
| Next.js | 15+ | Framework (App Router) |
| React | 19 | UI |
| TypeScript | Strict | Type Safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | latest | Animationen |
| ESLint | latest | Code Quality |

---

## Workflow

- [ ] Projekt initialisieren
- [ ] `tsconfig.json` auf Strict prüfen
- [ ] `next.config.ts` für Deployment-Ziel konfigurieren
- [ ] Ordnerstruktur anlegen
- [ ] CLAUDE.md für das Projekt anlegen
- [ ] `.env.local` anlegen und in `.gitignore` prüfen
- [ ] `npm run dev` — läuft es?

---

## Initialisierung

```bash
npx create-next-app@latest <projektname> \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

---

## Ordnerstruktur

```
src/
├── app/
│   ├── layout.tsx          # Root Layout — Fonts, Metadata, globale Komponenten
│   ├── page.tsx            # Startseite
│   ├── globals.css         # Tailwind Imports + CSS Variablen
│   └── api/
│       └── [route]/
│           └── route.ts    # API Endpoints
├── components/
│   ├── ui/                 # Generische, wiederverwendbare UI-Elemente
│   ├── sections/           # Page-Sections (Hero, Features, CTA, ...)
│   └── layout/             # Header, Footer, Nav
├── lib/
│   └── utils.ts            # Utility-Funktionen (cn, formatDate, ...)
└── types/
    └── index.ts            # Globale TypeScript-Typen
```

---

## tsconfig.json — Pflicht-Einstellungen

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## next.config.ts — Standard

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',  // Für AWS Amplify / Docker
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
```

---

## Tailwind 4 — globals.css

```css
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-sapphire: #1e40af;
  --color-sapphire-hover: #1d3fa8;

  /* Typography */
  --font-sans: var(--font-inter);
  --font-display: var(--font-syne);
}
```

---

## Checkliste vor erstem Commit

```
[ ] npm run build — kein Fehler
[ ] npm run lint  — kein Fehler
[ ] .env.local in .gitignore
[ ] CLAUDE.md mit Projekt-Kontext angelegt
[ ] README mit lokalen Setup-Schritten
[ ] Vercel/Amplify verbunden
```

---

## Nach dem Setup

- Chatbot einbauen? → `skills/company/building-chatbots/`
- Deployment? → `skills/company/deploying-to-amplify/`
- Brand-Copy schreiben? → `skills/company/brand-identity/`
