#!/bin/bash
# validate-bash.sh — Pre-Execution Hook für Claude Code
# Blockiert gefährliche Shell-Befehle bevor sie ausgeführt werden.
#
# Hook-Typ: PreToolUse (Bash)
# Konfiguration: .claude/settings.json → hooks.PreToolUse

# Liest den Befehl aus dem JSON-Input von Claude Code
COMMAND=$(cat /dev/stdin | python3 -c "import sys, json; data=json.load(sys.stdin); print(data.get('tool_input', {}).get('command', ''))" 2>/dev/null)

if [ -z "$COMMAND" ]; then
  exit 0
fi

# ============================================================
# BLOCKIERTE MUSTER
# ============================================================

# 1. Rekursives Löschen ohne explizite Pfade
if echo "$COMMAND" | grep -qE "rm\s+-rf\s+(/|~|\.\s*$|\.\/$)"; then
  echo "BLOCKED: 'rm -rf /' oder 'rm -rf ~' ist nicht erlaubt — zu destruktiv." >&2
  exit 2
fi

# 2. Force Push auf main/master
if echo "$COMMAND" | grep -qE "git\s+push.*(--force|-f).*(main|master)"; then
  echo "BLOCKED: Force Push auf main/master ist verboten. Bitte beim User nachfragen." >&2
  exit 2
fi

# 3. Hard Reset ohne explizite Bestätigung
if echo "$COMMAND" | grep -qE "git\s+reset\s+--hard"; then
  echo "BLOCKED: 'git reset --hard' kann Arbeit vernichten. Bitte beim User bestätigen lassen." >&2
  exit 2
fi

# 4. git push --force-with-lease auf main (Warnung, nicht blockiert)
if echo "$COMMAND" | grep -qE "git\s+push.*--force-with-lease.*(main|master)"; then
  echo "WARNING: Force-with-lease auf main — bist du sicher? (Hook erlaubt, aber prüfe nochmal)" >&2
fi

# 5. Produktions-.env überschreiben
if echo "$COMMAND" | grep -qE "(echo|cat|>)\s*.*\.env\.production"; then
  echo "BLOCKED: Direkte Änderung von .env.production ist verboten." >&2
  exit 2
fi

# 6. npm publish ohne Bestätigung (versehentliches Veröffentlichen)
if echo "$COMMAND" | grep -qE "^\s*npm\s+publish\b"; then
  echo "BLOCKED: 'npm publish' muss explizit vom User autorisiert werden." >&2
  exit 2
fi

# ============================================================
# Befehl ist sicher — Ausführung erlauben
# ============================================================
exit 0
