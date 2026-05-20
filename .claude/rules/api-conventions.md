# API-Konventionen — Axionea

Gilt für Next.js API Routes (`app/api/`) und Python-Tools in B.L.A.S.T.-Projekten.

---

## Next.js API Routes

### Dateistruktur
```
app/api/
├── contact/
│   └── route.ts      # POST /api/contact
├── user/
│   ├── route.ts      # GET/POST /api/user
│   └── [id]/
│       └── route.ts  # GET/PATCH/DELETE /api/user/:id
```

### Response-Format (einheitlich)
```typescript
// ✅ Erfolg
return NextResponse.json({ data: result }, { status: 200 })

// ✅ Fehler
return NextResponse.json(
  { error: "Kurze Fehlerbeschreibung", code: "ERROR_CODE" },
  { status: 400 }
)
```

### Error Handling in API Routes
Siehe `skills/company/error-handling-patterns/SKILL.md` für den vollständigen Pattern.

- Input validieren am Anfang der Route (fail fast)
- Externe API-Fehler abfangen und in eigenes Format übersetzen
- Keine Stack Traces an den Client
- HTTP Status Codes korrekt nutzen: 400 (Bad Input), 401 (Unauth), 404 (Not Found), 500 (Server Error)

```typescript
export async function POST(request: Request) {
  // 1. Input validieren
  const body = await request.json().catch(() => null)
  if (!body?.email) {
    return NextResponse.json({ error: "E-Mail fehlt" }, { status: 400 })
  }

  // 2. Business-Logik
  try {
    const result = await processRequest(body)
    return NextResponse.json({ data: result })
  } catch (error) {
    console.error("processRequest failed:", error)
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 })
  }
}
```

## Python Tools (B.L.A.S.T.)

- Alle Credentials aus `.env` — niemals hardcoded
- Jedes Tool gibt ein strukturiertes Objekt zurück: `{ "success": bool, "data": ..., "error": str | None }`
- Retry-Logik für externe APIs (max 3 Versuche, exponentieller Backoff)
- Zwischenergebnisse in `.tmp/` speichern, niemals direkt in finale Ausgabe

## HubSpot API
MCP-Tools verfügbar — nutze `mcp__claude_ai_HubSpot__*` Tools direkt statt rohe API-Calls.
