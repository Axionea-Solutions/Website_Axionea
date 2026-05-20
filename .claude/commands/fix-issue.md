# /project:fix-issue — Strukturierte Fehlerbehebung

Systematische Diagnose und Behebung eines gemeldeten Problems.

## Ablauf

1. **Problem erfassen**
   Frage nach (falls nicht angegeben):
   - Was ist das erwartete Verhalten?
   - Was passiert stattdessen?
   - Fehlermeldung / Stack Trace?
   - Welche Datei / Komponente ist betroffen?

2. **Diagnose**
   - Relevante Dateien lesen
   - Root Cause identifizieren (nicht Symptom beheben)
   - Ähnliche Stellen im Code prüfen die denselben Fehler haben könnten

3. **Fix**
   - Minimale Änderung die das Problem löst
   - Keine "Verbesserungen" die nicht zum Issue gehören
   - Sicherheitslücken (XSS, Injection, etc.) sofort markieren und beheben

4. **Verifikation**
   - Erkläre wie der Fix getestet werden kann
   - Falls Tests existieren: welcher Test deckt das ab?
   - Falls kein Test existiert: empfehle was getestet werden sollte

5. **Abschluss**
   ```
   ## Fix-Zusammenfassung
   
   **Root Cause:** [Was war das eigentliche Problem]
   **Geänderte Dateien:** [Liste]
   **Wie testen:** [Konkrete Schritte]
   **Ähnliche Stellen:** [Falls identifiziert]
   ```

## Verwendung

```
/project:fix-issue                          # Interaktiver Modus — Claude fragt nach
/project:fix-issue "Hero-Button klickt nicht"
/project:fix-issue "TypeError: Cannot read properties of undefined"
```
