# Testing Rules — Axionea

---

## Was wird getestet

- **Immer testen:** Kritische Business-Logik, Daten-Transformationen, API-Response-Handling
- **Nicht nötig:** Triviale Getter/Setter, reine Presentational Components ohne Logik
- **Integration über Unit:** Echte Datenbankverbindungen, echte API-Calls (kein Mocking von DB/APIs)

## Kein DB-Mocking

**Regel:** Integrationstests müssen echte Services treffen — kein Mocking von Datenbanken oder externen APIs.

**Warum:** Gemockte Tests können bestehen während Production-Migrationen brechen. Lieber echte Test-Umgebungen.

## Test-Benennung

```typescript
// Format: "beschreibt was es macht — unter welchen Umständen"
describe("fetchUserData", () => {
  it("gibt leeres Array zurück wenn keine User existieren", () => { ... })
  it("wirft Fehler bei ungültiger API-URL", () => { ... })
})
```

## Struktur

- Testdatei neben der Quelldatei: `utils/formatDate.ts` → `utils/formatDate.test.ts`
- E2E-Tests in `__tests__/e2e/`
- Fixtures und Mocks in `__tests__/fixtures/`

## Axionea Automations (Python/B.L.A.S.T.)

- Jedes Tool in `tools/` muss einzeln testbar sein (atomare Inputs/Outputs)
- Teste immer den "Link"-Schritt (API-Verbindung) separat vor dem vollen Flow
- Fehler-Szenarien testen: leere Responses, Rate Limits, ungültige Keys
