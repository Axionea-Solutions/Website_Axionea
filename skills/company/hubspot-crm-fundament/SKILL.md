---
name: hubspot-crm-fundament
description: >
  Setzt ein sauberes HubSpot-CRM-Fundament für eingehende Website-Formular-Leads
  auf und hält die Datenbank gesund. Nutze diesen Skill, wenn Leads aus dem
  Website-Kontaktformular bzw. dem Meetings-Embed in HubSpot landen sollen und
  vorher Struktur gebraucht wird (Lead-Quelle trennen, Lifecycle-Stages,
  Owner-Zuweisung, Dubletten, Hygiene). Trigger u.a.: "HubSpot aufräumen",
  "CRM-Fundament", "Leads sortieren", "Lead-Quelle Website", "Lifecycle einrichten",
  "Owner zuweisen", "CRM-Audit", "Kontakte ohne E-Mail", "Dubletten mergen".
  Adaptiert aus den HubSpot-Admin-Skills (TomGranot, MIT) — auf die Axionea-MCP
  und den DACH-Kontext zugeschnitten.
license: MIT
metadata:
  author: axionea
  version: "1.0"
  category: crm-admin
  adapted-from: github.com/TomGranot/hubspot-admin-skills
---

# HubSpot CRM-Fundament (Axionea)

Sauberes CRM-Fundament für die Axionea-HubSpot (**Portal 147982504**, EU1), damit
eingehende Website-Leads vom ersten Tag an sauber strukturiert ankommen — und sich
nicht mit den vorhandenen Outbound-/Scraping-Leads vermischen.

## Wann diesen Skill nutzen

- Das Website-Kontaktformular (Form `3b751fd8-bf68-4fc6-b9a1-acad4149bcb9`) bzw.
  das Meetings-Embed (`maximilian-zvada`) ist angebunden und die ersten Leads kommen.
- Bevor Werbung/SEO Traffic bringt → Fundament *vorher* aufsetzen.
- Quartalsweise als Health-Check, wenn Daten gewachsen sind.

## Zugangswege & ihre Grenzen (WICHTIG)

Es gibt zwei Wege in die HubSpot. **Vor jeder Aktion zuerst klären, welcher passt.**

| Aufgabe | HubSpot-MCP (OAuth, `.mcp.json`) | HubSpot-UI |
|---|---|---|
| CRM **auditieren** (Kontakte/Companies/Deals lesen) | ✅ `search_crm_objects`, `query_crm_data` | — |
| Property-**Definitionen** lesen | ✅ `get_properties`, `search_properties` | — |
| Kontakt-**Records** anlegen/updaten (Owner, Lead-Quelle, Stage setzen) | ✅ `manage_crm_objects` (mit Bestätigung) | — |
| Custom **Property** anlegen (Schema) | ❌ | ✅ Settings → Properties |
| **Listen/Segmente** anlegen | ❌ (nur lesbar mit Reauth) | ✅ Contacts → Lists |
| **Workflows** (Automation) bauen | ❌ | ✅ Automation → Workflows |
| **Formulare** lesen/ändern | ❌ (Reauth nötig) | ✅ Marketing → Forms |

**Merke:** Die MCP **auditiert und pflegt Records**. Das eigentliche Setup
(Properties, Listen, Workflows) ist **UI-Arbeit** — dieser Skill liefert die
exakten Klick-Pfade.

## Vorgehen: Plan → Before → Execute → After

Jede ändernde Aktion folgt diesem Muster (aus den TomGranot-Skills übernommen):
1. **Plan** — Was genau ändern? Scope festlegen.
2. **Before** — Ist-Zustand per MCP auditieren und als Baseline festhalten.
3. **Execute** — Änderung durchführen (MCP-Records oder UI-Schritt).
4. **After** — Per MCP verifizieren, dass das Ergebnis stimmt.

Niemals Massen-Änderungen ohne Before-Baseline. Bei `manage_crm_objects` immer die
Bestätigungs-Tabelle zeigen und Freigabe abwarten.

---

## Schritt 1 — Audit (Before-Baseline)

Per MCP den Ist-Zustand erheben. Mindestens:

```
# Gesamtzahl & Stage-Verteilung
search_crm_objects(CONTACT, properties=[email, lifecyclestage, hs_lead_status,
  hs_analytics_source, hubspot_owner_id, createdate]) → "total" lesen

# Lifecycle-Stages & Lead-Status, die existieren
get_properties(contacts, [lifecyclestage, hs_lead_status])
```

Auf diese **Lücken** prüfen (Stand letzter Audit — neu verifizieren):
- Kontakte **ohne Owner** (`hubspot_owner_id` leer) → siehe Schritt 4.
- Kontakte **ohne `firstname`** / Firmenname im `lastname` (Scraping-Artefakt).
- Kontakte **ohne `email`** → nicht erreichbar, ggf. unterdrücken/löschen.
- Quelle `OFFLINE` (= Outbound/Import) vs. später Form-Leads (= `organic`/`form`).

---

## Schritt 2 — Lead-Quelle trennen (Kernziel)

**Problem:** Vorhandene Leads sind alle `hs_analytics_source = OFFLINE`. Website-
Formular-Leads kommen mit anderer Quelle — aber das reicht nicht für saubere
Trennung in Reports & Nachverfolgung.

**Lösung:** Eine **Custom-Property `axionea_lead_quelle`** (Single-Select) anlegen.

**UI-Schritt (Property anlegen):**
1. Settings (Zahnrad) → Data Management → **Properties**
2. Object: *Contact* → **Create property**
3. Label: `Axionea Lead-Quelle`, intern: `axionea_lead_quelle`
4. Field type: **Dropdown select**, Optionen:
   `Website-Formular`, `Terminbuchung (Meetings)`, `Outbound`, `Empfehlung`, `Sonstiges`
5. Speichern.

**Bestehende 26 Outbound-Leads taggen (per MCP, nach Property-Anlage):**
- `search_crm_objects(CONTACT, filter hs_analytics_source = OFFLINE)` → IDs sammeln
- `manage_crm_objects(updateRequest)` → `axionea_lead_quelle = "Outbound"`
- Bestätigungs-Tabelle zeigen, Freigabe abwarten, dann ausführen.

**Neue Form-Leads automatisch taggen (UI-Workflow, siehe Schritt 5).**

---

## Schritt 3 — Lifecycle-Stages festlegen

HubSpot-Standard ist vorhanden (`subscriber → lead → MQL → SQL → opportunity →
customer → evangelist`). Für Axionea reicht das — **nicht** unnötig neue Stages
erfinden. Stattdessen die Bedeutung definieren:

| Stage | Bedeutung bei Axionea |
|---|---|
| `lead` | Formular ausgefüllt / Termin gebucht, noch kein Kontakt |
| `marketingqualifiedlead` | Passt zur Zielgruppe (Arztpraxis/KFO/Makler), reagiert |
| `salesqualifiedlead` | Erstgespräch terminiert/geführt |
| `opportunity` | Konkretes Angebot raus (→ Deal anlegen) |
| `customer` | Auftrag erteilt |

Eingehende Form-Leads sollen automatisch auf `lead` stehen (Form-Default in HubSpot).

---

## Schritt 4 — Owner-Zuweisung

Aktuell hat **kein** Kontakt einen Owner. Eingehende Leads brauchen sofort einen
Verantwortlichen (Maxi oder Nico), sonst versanden sie.

- Owner-IDs holen: `search_crm_objects(objectType="users")` bzw. `search_owners`.
- **Manuell (MCP):** `manage_crm_objects(updateRequest)` → `hubspot_owner_id` setzen.
- **Automatisch (UI-Workflow):** Round-Robin oder fix in der Lead-Routing-Automation
  (Schritt 5).

---

## Schritt 5 — Automation (UI-Workflows)

Nicht per MCP machbar — in der HubSpot-UI anlegen. **Minimal-Set für den Start:**

**Workflow A — Neue Website-Leads routen**
- Automation → Workflows → Create → *Contact-based*
- Enrollment-Trigger: *Form submission* = Axionea-Kontaktformular
- Aktionen: `axionea_lead_quelle = Website-Formular` → Owner zuweisen
  (Round-Robin Maxi/Nico) → interne Benachrichtigung (E-Mail/Slack) →
  Task „Neuen Lead kontaktieren" (Fällig: +1 Werktag)

**Workflow B — Lifecycle-Progression**
- Trigger: Erstgespräch gebucht (Meetings) → Stage auf `salesqualifiedlead`
- Trigger: Deal angelegt → Stage auf `opportunity`

Halte Workflows minimal. Lieber 2 saubere als 10 verschachtelte.

---

## Schritt 6 — Laufende Hygiene (Quartal)

Per MCP auditieren, Maßnahmen wie oben:
- **Dubletten:** gleiche `email` / Company gleiche `domain` → manuell mergen (UI).
- **Kontakte ohne E-Mail:** prüfen, ob behebbar, sonst unterdrücken/löschen.
- **Scraping-Artefakte:** Firmenname im `lastname` → in `company` verschieben,
  `lastname` korrigieren (MCP-Update mit Before-Baseline).
- **Tote Owner:** deaktivierte Nutzer mit zugewiesenen Kontakten → reassignen.

---

## Verweise

- Original-Skills (Klick-Anleitungen für UI-Aufgaben):
  `github.com/TomGranot/hubspot-admin-skills` — u.a. `hubspot-audit`,
  `assign-unowned-contacts`, `merge-duplicate-companies`, `fix-lifecycle-stages`,
  `new-contact-hygiene-workflow`.
- Website-Anbindung: `Website/axionea-next/src/components/hubspot/`
- Marke/Tonalität für interne Benachrichtigungen: [[axionea-brand-identity]]
