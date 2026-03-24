# Axionea GbR — Workspace

**KI-Automatisierungsagentur für den DACH-Mittelstand**
*Gegründet von Maxi Zvada & Nico Christian Fisseler*

---

## 🗂️ Ordnerstruktur

```
Axionea/
│
├── .agent/                          ← Antigravity-Konfiguration
│   └── workflows/                   ← Wiederverwendbare Workflows
│       ├── create-project.md        ← Neues Projekt aufsetzen
│       └── create-agent.md          ← Neuen Agenten aufsetzen
│
├── skills/                          ← Alle Skills zentral verwaltet
│   ├── company/                     ← 🏢 Unternehmensweite Skills (immer aktiv)
│   │   ├── brand-identity/          ← Marke, Design, Sprache
│   │   │   ├── SKILL.md             ← Router (wird von Antigravity gelesen)
│   │   │   └── resources/
│   │   │       ├── design-tokens.json   ← Farben, Fonts, Spacing
│   │   │       ├── tech-stack.md        ← Code-Regeln & Forbidden Patterns
│   │   │       └── voice-tone.md        ← Markensprache & Formulierungen
│   │   └── blast-protocol/          ← Automatisierungs-Protokoll
│   │       └── SKILL.md             ← B.L.A.S.T. + A.N.T. 3-Layer Architektur
│   │
│   └── projects/                    ← 🚀 Projektspezifische Skills
│       ├── scraper/
│       └── lej-coaching/
│           └── SKILL.md             ← Scraper-spezifische Regeln
│
├── projects/                        ← Eigentliche Projektdateien
│   ├── Scraper/                     ← B.L.A.S.T.-Struktur je Projekt
│   └── lej-coaching/                ← 🆕 Le. J Coaching Website
│
├── agents/                          ← Agenten-Definitionen
│
├── Consulting/                      ← Beratungsunterlagen
├── Verträge/                        ← Rechtsdokumente
└── Website/                         ← Website-Assets & Logo
```

---

## 🧠 Skills-System

### Company Skills (immer aktiv)
| Skill | Trigger |
|---|---|
| `brand-identity` | UI, Design, Copy, Farben, Axionea erwähnt |
| `blast-protocol` | Neues Projekt, Automatisierung, Agent bauen |
| `creating-skills` | "Erstelle einen Skill", "Baue einen Skill für X" |

### Project Skills (nur im Projektkontext)
| Skill | Trigger |
|---|---|
| `scraper` | Scraping, Datenextraktion, Pipeline |
| `lej-coaching` | Le. J Coaching Website, Coaching-Projekt |

---

## 🚀 Projekte

| Projekt | Beschreibung | Status |
|---|---|---|
| Scraper | [Beschreibung] | 🟡 In Entwicklung |
| lej-coaching | Website für Coaching-Kunde Le. J Coaching | 🟡 In Planung |

---

## 🤖 Agenten

| Agent | Projekt | Zweck |
|---|---|---|
| *(noch keine)* | — | — |

---

## ⚡ Workflows (Slash Commands)

| Command | Beschreibung |
|---|---|
| `/create-project` | Neues Projekt mit B.L.A.S.T.-Struktur aufsetzen |
| `/create-agent` | Neuen Agenten dokumentieren und konfigurieren |
