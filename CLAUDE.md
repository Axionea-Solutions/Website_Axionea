# Axionea — Claude Code Project Bible

## Über Axionea
Deutsche KI-Automatisierungsagentur (GbR) für KMU in der DACH-Region. Wir bauen deterministische, selbstheilende Automatisierungen für Unternehmen ohne eigene IT-Abteilung.

**Leitmotiv:** Konkret & messbar — keine leeren Versprechen, keine Buzzwords.

---

## Projektstruktur

```
Axionea/
├── CLAUDE.md                  # Diese Datei — wird jede Session geladen
├── CLAUDE.local.md            # Persönliche Overrides (gitignored)
├── .mcp.json                  # MCP-Integrationen (HubSpot, etc.)
├── .claude/
│   ├── settings.json          # Globale Permissions & Tool-Zugriff
│   ├── settings.local.json    # Lokale Overrides (gitignored)
│   ├── rules/                 # Kontextuelle Regeln nach Thema
│   ├── commands/              # Wiederverwendbare Slash-Commands
│   ├── agents/                # Spezialisierte Sub-Agents
│   └── hooks/                 # Automatische Validierung & Guards
├── skills/
│   ├── company/               # Agentur-weite Skills (B.L.A.S.T., Brand, etc.)
│   └── projects/              # Projektspezifische Skills
├── projects/                  # Aktive Kundenprojekte
│   ├── lej-coaching/          # Le. J Coaching Website (Next.js)
│   └── scraper/               # Web-Scraper Automation
└── .agent/
    └── workflows/             # Antigravity Workflow-Definitionen
```

---

## Aktive Projekte

### Le. J Coaching — Website
**Pfad:** `projects/lej-coaching/website/`
**Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS 4, OGL 1.0.11
**Commands:**
```bash
cd projects/lej-coaching/website
npm run dev       # Dev-Server starten
npm run build     # Production Build
npm run lint      # ESLint prüfen
```
**Skill:** `skills/projects/lej-coaching/`

### Scraper Automation
**Pfad:** `projects/scraper/`
**Stack:** Python, B.L.A.S.T.-Architektur
**Skill:** `skills/projects/scraper/`

---

## B.L.A.S.T. Protokoll
Jedes neue Automatisierungsprojekt folgt dem B.L.A.S.T.-Protokoll:
- **B**lueprint — Vision & Logik (5 Discovery-Fragen)
- **L**ink — Connectivity & API-Tests
- **A**rchitect — 3-Layer Build (Architecture / Navigation / Tools)
- **S**tylize — Payload-Refinement & UI
- **T**rigger — Deployment & Automation

**Skill:** `skills/company/blast-protocol/SKILL.md`
**Workflow:** `.agent/workflows/create-project.md`

Vor dem Coden immer anlegen: `gemini.md`, `task_plan.md`, `findings.md`, `progress.md`

---

## Skills & Agents

### Company Skills (`skills/company/`)
| Skill | Trigger |
|-------|---------|
| `blast-protocol/` | Neues Automatisierungsprojekt starten |
| `brand-identity/` | Texte, CTAs, UI-Copy für Axionea schreiben |
| `building-chatbots/` | AI-Chatbot / Assistent in Projekt integrieren |
| `creating-skills/` | Neuen Skill erstellen |
| `deploying-to-amplify/` | Next.js auf AWS Amplify deployen, Env-Vars setzen |
| `error-handling-patterns/` | Error Handling in Code implementieren |
| `hubspot-crm-fundament/` | HubSpot-CRM aufsetzen/aufräumen für Website-Leads (MCP-Audit + UI-Guides) |
| `managing-rag-pipeline/` | PDFs / Dokumente als Chatbot-Wissensbasis einbinden |
| `setting-up-nextjs-project/` | Neues Kundenprojekt (Next.js Website) scaffolden |
| `using-firecrawl/` | Web-Scraping mit Firecrawl |
| `using-spline/` | 3D-Animationen mit Spline integrieren |
| `writing-system-prompts/` | System-Prompt für KI-Assistent schreiben |

### Agents (`.claude/agents/`)
- `codeReviewer.md` — Isolierter Code-Review Sub-Agent
- `security-auditor.md` — OWASP-Sicherheitsaudit Sub-Agent

---

## Coding-Konventionen

### TypeScript (Next.js Projekte)
- Strict Mode aktiviert (`"strict": true` in tsconfig)
- Keine `any`-Types — immer explizite Typen
- Interfaces über Types für Objekt-Shapes
- Komponenten: PascalCase, Funktionen: camelCase, Konstanten: UPPER_SNAKE_CASE

### Tailwind CSS
- Mobile-first: `base → sm → md → lg → xl`
- Keine inline-styles — immer Tailwind-Klassen
- Custom Values via `tailwind.config` — kein willkürliches `style={{}}`

### Allgemein
- Kein unnötiger Code — keine spekulativen Abstraktionen
- Error Handling nur an System-Grenzen (User Input, externe APIs)
- Keine `console.log` in Production-Code

---

## Markensprache (für UI-Copy & Texte)
**Details:** `skills/company/brand-identity/resources/voice-tone.md`

- Sprache: Deutsch (DACH), Du-Form für CTAs/Headlines
- Konkret & messbar: Zahlen statt vager Aussagen
- Verboten: "revolutionär", "disruptiv", "transformativ", "signifikant"
- Standard-CTAs: "Jetzt starten →", "Kostenlos beraten lassen", "Demo ansehen"

---

## Gitignore-Hinweis
`.claude/settings.local.json` und `CLAUDE.local.md` sind gitignored — für persönliche Overrides.
`.claude/` ist aktuell vollständig gitignored. Rules, Commands, Agents und Hooks ggf. aus dem Gitignore nehmen wenn Team-weit geteilt werden soll.
