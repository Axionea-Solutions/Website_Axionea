# /project:review — Code Review

Führe einen vollständigen Code-Review der geänderten oder angegebenen Dateien durch.

## Ablauf

1. **Scope bestimmen**
   - Wenn Dateien angegeben: nur diese reviewen
   - Sonst: `git diff --name-only HEAD` ausführen und geänderte Dateien reviewen

2. **Review gegen Axionea-Standards**
   Prüfe jede Datei gegen:
   - `.claude/rules/code-style.md` — TypeScript, Naming, Tailwind
   - `.claude/rules/api-conventions.md` — falls API-Route betroffen
   - `.claude/rules/testing.md` — falls Logik ohne Tests hinzugefügt wurde

3. **Ausgabe-Format**

   Für jede Datei:
   ```
   ## [Dateiname]
   
   ### Kritisch (muss behoben werden)
   - Zeile X: [Problem] → [Korrektur]
   
   ### Empfohlen (sollte behoben werden)
   - Zeile X: [Verbesserung]
   
   ### Gut gemacht
   - [Was gut ist — kurz erwähnen]
   ```

4. **Zusammenfassung**
   - Gesamtbewertung: Bereit zum Commit / Überarbeitung nötig
   - Priorisierte Liste der kritischen Punkte

## Verwendung

```
/project:review                    # Review aller geänderten Dateien
/project:review src/components/    # Review eines Verzeichnisses
/project:review Hero.tsx           # Review einer Datei
```
