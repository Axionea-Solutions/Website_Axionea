# Code Style Rules — Axionea

Diese Regeln gelten für alle Projekte unter `projects/`. Bei Konflikten hat der projektspezifische Skill Vorrang.

---

## TypeScript

- **Strict Mode** ist Pflicht (`"strict": true` in tsconfig)
- Kein `any` — immer explizite Typen oder `unknown` mit Type Guard
- `interface` für Objekt-Shapes, `type` für Unions/Intersections
- Kein `!` (non-null assertion) ohne Kommentar warum es sicher ist
- Asynchrone Funktionen: immer `async/await`, kein `.then()/.catch()` mischen

## Benennung

| Typ | Konvention | Beispiel |
|-----|-----------|---------|
| Komponenten | PascalCase | `HeroSection`, `ContactForm` |
| Funktionen | camelCase | `fetchUserData`, `formatDate` |
| Konstanten | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| CSS-Klassen | Tailwind (keine custom) | `flex items-center gap-4` |
| Dateien (Komponenten) | PascalCase.tsx | `HeroSection.tsx` |
| Dateien (Utils) | camelCase.ts | `formatDate.ts` |

## Next.js Komponenten

```tsx
// ✅ Korrekt — Server Component by default
export default function PageName() {
  return <div>...</div>
}

// ✅ Korrekt — Client Component explizit markieren
"use client"
export default function InteractiveComponent() { ... }
```

- Server Components by default, `"use client"` nur wenn nötig
- Keine prop drilling über 2+ Ebenen — Context oder State Management nutzen
- Images immer über `next/image`, Links über `next/link`

## Tailwind CSS

- Mobile-first: `base → sm → md → lg → xl`
- Keine inline `style={{}}` — immer Tailwind-Klassen
- Klassen-Reihenfolge: Layout → Flexbox/Grid → Spacing → Sizing → Typography → Colors → Effects
- Custom Values via `tailwind.config.ts`, keine arbiträren Werte `[...]` ohne Begründung

## Allgemein

- Keine `console.log` in Production-Code — `console.error` für echte Fehler mit Kontext
- Keine spekulativen Abstraktionen — 3 ähnliche Stellen rechtfertigen noch keine Utility
- Kein auskommentierter Code committen
- Error Handling nur an System-Grenzen (User Input, externe APIs, Dateisystem)
