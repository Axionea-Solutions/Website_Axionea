---
name: deploying-to-amplify
description: >
  Deploys Next.js applications to AWS Amplify, including environment variable
  setup, build configuration, and troubleshooting. Use when deploying a website
  to AWS Amplify, setting environment variables, fixing build errors, or
  connecting a GitHub repo to Amplify. Trigger when user says "Amplify deployen",
  "Umgebungsvariablen AWS", "Build schlägt fehl", "Next.js auf Amplify".
---

# Deploying to AWS Amplify

## When to use this skill
- Erstes Deployment einer Next.js-App auf Amplify
- Umgebungsvariablen setzen oder aktualisieren
- Build-Fehler debuggen
- Redeploy nach Code-Änderungen

---

## Schritt 1: Umgebungsvariablen setzen

**Weg in der Amplify Console:**

```
AWS Amplify Console
  → App öffnen
  → Hosting (linke Sidebar)
  → Environment variables
  → "Add variable"
```

**Danach:** App muss neu deployt werden — "Redeploy this version" oder neuer Git-Push.

**Variablen für Standard-Stack:**
| Variable | Woher |
|----------|-------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | aistudio.google.com/app/apikey |
| `NEXT_PUBLIC_*` | Für Client-side sichtbare Variablen |

> Wichtig: Variablen ohne `NEXT_PUBLIC_` sind nur server-seitig verfügbar (API Routes, Server Components). Client-Komponenten können sie nicht lesen.

---

## Schritt 2: Build-Konfiguration (amplify.yml)

Für Next.js mit Standalone-Output — in Repo-Root ablegen:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

---

## Schritt 3: next.config.ts für Amplify

```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone',  // Für Amplify SSR
};
export default nextConfig;
```

---

## Häufige Fehler & Lösungen

| Fehler | Ursache | Lösung |
|--------|---------|--------|
| `API Configuration Error: API key is missing` | Env-Var nicht gesetzt oder Redeploy fehlt | Var in Amplify setzen → Redeploy |
| `Build failed: Cannot find module` | Node-Version falsch | In Amplify: Node.js 20 einstellen |
| `NEXT_PUBLIC_` var ist undefined | `NEXT_PUBLIC_` Prefix fehlt für Client-Code | Prefix hinzufügen |
| 500-Fehler nur in Prod | Env-Var lokal aber nicht in Amplify | Amplify Console checken |
| Static Export Fehler | `output: 'export'` mit API Routes | `output: 'standalone'` nutzen |

---

## Redeploy auslösen

Nach Änderung von Env-Variablen oder manuell:

```
Amplify Console → App → Deployments → "Redeploy this version"
```

Oder einfach einen leeren Commit pushen:
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

---

## Amplify vs. Vercel — Wann was

| | Amplify | Vercel |
|--|---------|--------|
| AWS-Ökosystem | ✅ Nativ | ❌ |
| Einfachheit | Mittel | Sehr einfach |
| Preis bei viel Traffic | Günstiger | Teurer |
| Auto-Deploy bei Push | ✅ | ✅ |

**Empfehlung:** Vercel für neue Projekte wenn kein AWS-Kontext. Amplify wenn Kunde bereits AWS nutzt.
