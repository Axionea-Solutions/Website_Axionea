# Skill: Idea Evaluation — Investor-Grade Framework

## Zweck
Jede Idee in IdeaFlow wird automatisch von Claude nach einem institutionellen Investor-Framework bewertet. Das Ergebnis dient als erste Orientierung für Pitch-Vorbereitung, Priorisierung und die nächsten konkreten Schritte.

**Trigger:** Wird bei jeder neuen Idee (`POST /api/ideas`) im Hintergrund ausgeführt.

---

## Evaluierungs-Dimensionen (8 Bereiche)

Basiert auf Frameworks von Y Combinator, Andreessen Horowitz, Sequoia Capital, Bill Gurley und DACH-spezifischen Investoren (HTGF, Earlybird).

### 1. Team & Execution — Gewichtung: 25 %
- Founder-Market-Fit: Warum ist dieses Team einzigartig für das Problem?
- Kritische Fähigkeitslücken (tech, GTM, domain)
- Ausführungsgeschwindigkeit: Wie schnell von Idee zu erstem Kunden?
- Vollzeit-Commitment aller Gründer?

### 2. Marktchance & Timing — Gewichtung: 20 %
- TAM (Total Addressable Market) — Bottom-up bevorzugt
- SAM (Serviceable Addressable Market) — erreichbares Segment
- SOM (Serviceable Obtainable Market) — realistisches Jahr-1–3-Ziel
- CAGR des Marktes
- "Why Now" — welcher strukturelle Wandel macht es jetzt möglich?

### 3. Traction & Product-Market Fit — Gewichtung: 18 %
- PMF-Typ (Sequoia Arc): Hair on Fire / Hard Fact / Future Vision
- Sean Ellis Score (Ziel: ≥40 % "sehr enttäuscht" bei Wegfall)
- Retention-Kurven: flachen sie ab? (PMF-Signal)
- Organisches Wachstum vs. bezahlte Akquise

### 4. Business Model & Unit Economics — Gewichtung: 15 %
- Revenue-Modell (SaaS, Marketplace, Usage-Based, ...)
- Bruttomarge (SaaS-Ziel: >70 %)
- LTV:CAC-Verhältnis (Ziel: ≥3:1)
- CAC Payback Period (Ziel B2B SaaS: <12 Monate)
- Net Revenue Retention (Ziel: >100 %)
- Burn Multiple (Net Burn / Net New ARR; Ziel: <1.5)

### 5. Wettbewerb & Moat — Gewichtung: 10 %
- Direkte und indirekte Wettbewerber
- Moat-Typ: Netzwerkeffekte | Wechselkosten | proprietäre Daten | Marke | Kostenvorteile
- 10× besser als Status Quo?
- Incumbent-Reaktionsrisiko

### 6. Kunden-Analyse (ICP & JTBD) — Gewichtung: 7 %
- Ideal Customer Profile (ICP) — konkrete Firmographics, Trigger, Trends
- Job-to-be-Done: welches Ergebnis will der Kunde erreichen?
- Zahlungsbereitschaft validiert (Gespräche, LOIs, Piloten)?
- Schmerzdringlichkeit: Must-Have vs. Nice-to-Have

### 7. Risikoanalyse — Gewichtung: 3 % (aber Veto-Funktion)
Kategorien: Markt-Timing | Technologie | Regulatorisch (DACH/EU) | Wettbewerb | Ausführung | Finanzen
Stufen: Niedrig | Mittel | Hoch | Showstopper

**DACH-spezifische Risiken:**
- DSGVO: Verarbeitung personenbezogener Daten → DPA-Pflicht
- EU AI Act (ab 2024–2026): Hochrisiko-KI in HR, Kredit, Biometrie → Konformitätsbewertung
- BaFin: Finanzprodukte ohne Lizenzpfad → Showstopper
- Datensouveränität: DE/AT-Kunden verlangen oft EU-only Server

### 8. Investor-Attraktivität — Gewichtung: 2 %
- Begeisterungssignale (evangelische User, nicht-offensichtliche Insight, starke NPS)
- Typische VC-Einwände
- DACH → EU Expansionspfad

---

## Scoring-System

### Skala pro Dimension: 1–5
| Wert | Bedeutung |
|------|-----------|
| 5 | Außergewöhnlich — VC wäre begeistert zu investieren |
| 4 | Stark — keine wesentlichen Bedenken |
| 3 | Ausreichend — Mindestanforderung erfüllt, Lücken erklärbar |
| 2 | Schwach — deutliche Lücke muss geschlossen werden |
| 1 | Disqualifizierend — Showstopper |

### Gesamtbewertung (gewichteter Durchschnitt)
| Score | Interpretation |
|-------|---------------|
| 4.0–5.0 | Pitch-bereit — fundable |
| 3.0–3.9 | Vielversprechend — wichtigste Lücken schließen, dann neu bewerten |
| 2.0–2.9 | Frühphase — erhebliche Entwicklung nötig |
| <2.0 | Grundsätzliche Überarbeitung erforderlich |

### Veto-Bedingungen (Maximal-Score 2.0, unabhängig von anderen Dimensionen)
- Team ist nicht Vollzeit oder hat keine relevante Domain-Expertise
- TAM < €200 Mio ohne Markterweiterungs-These
- Kein Beweis, dass ein Kunde bezahlt hat oder ernsthaft committed ist
- Existenzielle regulatorische Risiken ohne Lösungsweg
- Burn Rate impliziert < 6 Monate Runway ohne glaubwürdigen Bridge-Plan

---

## KPI-Benchmarks (Seed-Stage, DACH-Kontext)

### Finanziell
| KPI | Grün | Gelb | Rot |
|-----|------|------|-----|
| TAM (DACH/EU) | >€1 Mrd | €500 Mio–€1 Mrd | <€200 Mio |
| Markt-CAGR | >15 % | 5–15 % | <5 % oder schrumpfend |
| Bruttomarge (SaaS) | >70 % | 50–70 % | <50 % |
| LTV:CAC | ≥3:1 | 2–3:1 | <2:1 |
| CAC Payback | <12 Monate | 12–18 Monate | >24 Monate |
| NRR | >120 % | 100–120 % | <100 % |
| Monatliche Churn (SaaS) | <1 % | 1–2 % | >3 % |
| Burn Multiple | <1.5 | 1.5–2.5 | >3 |

### Produkt & Traction
| KPI | Grün | Gelb | Rot |
|-----|------|------|-----|
| Sean Ellis Score | ≥40 % | 25–40 % | <25 % |
| D30-Retention (Consumer) | >40 % | 20–40 % | <20 % |
| DAU/MAU | >50 % | 20–50 % | <10 % |
| NPS | >50 | 30–50 | <30 |
| Organischer Traffic | >50 % | 25–50 % | <25 % |

---

## Claude System Prompt (Verwendung in `backend/src/services/claude.ts`)

Dieser Skill liefert den System-Prompt für `evaluateIdea()`. Der vollständige Prompt ist in `backend/src/services/claude.ts` implementiert.

**Wichtige Prompt-Regeln:**
1. Gib **nur valides JSON** zurück — kein Markdown, keine Erklärung außerhalb des JSON
2. Triff fundierte Schätzungen auf Basis der Idee — kennzeichne Annahmen explizit
3. Sei ehrlich und kritisch — vage Ideen bekommen niedrige Scores, nicht hohe
4. DACH-Kontext immer berücksichtigen (Regulierung, Marktstruktur, Sprache)
5. Jede Dimension einzeln begründen — keine Pauschalurteile

---

## Output-Struktur (JSON-Schema)

```json
{
  "title": "Kurzer Name (max 5 Wörter)",
  "score": 7,
  "marketFit": "Ein Satz: Wer braucht das und warum jetzt",
  "feasibility": "Ein Satz: Build-Komplexität und Ressourcen",
  "revenueModel": "Wahrscheinlichster Monetarisierungsansatz",
  "nextStep": "Die eine wichtigste erste Maßnahme",
  "tags": ["tag1", "tag2", "tag3"],
  "extended": {
    "investorScore": 3.2,
    "interpretation": "Vielversprechend",
    "tam": "€300–500 Mio für DACH, ~€2 Mrd EU-weit (Bottom-up: ~50.000 KMU × €6.000/Jahr)",
    "sam": "€50–80 Mio (digitale KMU in DE/AT/CH mit 10–250 MA)",
    "som": "€2–5 Mio in Jahr 1–2 (0,5–1 % SAM mit direktem Vertrieb)",
    "marketCagr": "~18 % p.a. (KI-SaaS für KMU, 2024–2028)",
    "whyNow": "GPT-4-Klasse-Modelle seit 2023 kostengünstig nutzbar; KMU-Digitalisierung durch DSGVO-Druck beschleunigt",
    "icp": "Digitalaffine KMU (10–100 MA) in DE/AT, Branche X, Trigger: Skalierungsproblem bei manuellen Prozessen",
    "jtbd": "Wiederkehrende Aufgabe Y in <X Stunden erledigen, ohne teures Personal einzustellen",
    "willingnessToPay": "Annahme: €200–500/Monat SaaS (ähnliche Tools am Markt: €150–800/Monat) — noch nicht validiert",
    "painUrgency": "must-have",
    "grossMarginEstimate": "~75–85 % (KI-SaaS, API-Kosten als Variable)",
    "ltvcacRating": "green",
    "ltvcacNote": "Bei €300/Monat ACV und 24 Monate Retention: LTV ~€7.200. CAC bei €1.500–2.500 (Inside Sales) = 3–5:1",
    "cacPaybackRating": "yellow",
    "cacPaybackNote": "~8–12 Monate je nach Vertriebs-Mix; optimierbar durch PLG-Element",
    "competitors": ["Wettbewerber A", "Wettbewerber B", "Status Quo: Excel/manuell"],
    "moatType": "Wechselkosten (Datenintegration) + proprietäre Daten (Nutzungsflywheel)",
    "differentiator": "10× schneller als manuelle Alternative; DACH-spezifische Compliance eingebaut",
    "risks": [
      {"category": "Markt-Timing", "level": "low", "note": "Markt wächst, Adoption steigt"},
      {"category": "Regulatorisch (DSGVO)", "level": "medium", "note": "DPA-Pflicht; EU-Server nötig für DE-Kunden"},
      {"category": "Wettbewerb", "level": "medium", "note": "US-Anbieter expandieren nach DACH"},
      {"category": "Technologie", "level": "low", "note": "Keine unerprobte Kerntechnologie nötig"},
      {"category": "Ausführung", "level": "medium", "note": "GTM-Expertise im Team unklar"}
    ],
    "topStrengths": [
      "Klarer, dringender Schmerz in einem wachsenden Markt",
      "Attraktives SaaS-Margenmodell mit Expansionspotenzial",
      "DACH-First-Ansatz als kurzfristiger Vorteil"
    ],
    "criticalGaps": [
      "Kein Beweis für Zahlungsbereitschaft — sofort 5–10 Kundengespräche führen",
      "ICP zu vage — Segment auf eine Branche eingrenzen",
      "GTM-Strategie fehlt — welcher Kanal für die ersten 10 Kunden?"
    ],
    "pitchReadiness": "fast-bereit",
    "nextMilestones": [
      "5–10 Kundengespräche mit Entscheidern aus Ziel-ICP führen",
      "1 zahlenden Piloten oder LOI in 60 Tagen sichern",
      "MVP auf eine Kern-Funktion fokussieren und in 4 Wochen bauen"
    ],
    "dimensionScores": {
      "team": 3,
      "market": 4,
      "traction": 2,
      "businessModel": 3,
      "competition": 3,
      "customer": 3,
      "risk": 4,
      "investorAttractiveness": 3
    }
  }
}
```

---

## Quellen & Frameworks
- [16 Startup Metrics — a16z](https://a16z.com/16-startup-metrics/)
- [Arc PMF Framework — Sequoia Capital](https://sequoiacap.com/article/pmf-framework/)
- [All Markets Are Not Equal — Bill Gurley](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)
- [The 11 Risks VCs Evaluate — Tomasz Tunguz](https://tomtunguz.com/the-11-risks-vcs-evaluate/)
- [YC How to Apply](https://www.ycombinator.com/howtoapply)
- [Sean Ellis PMF Survey](https://pmfsurvey.com/)
- [SaaS Growth Benchmarks 2024 — SaaS Capital](https://www.saas-capital.com/)
