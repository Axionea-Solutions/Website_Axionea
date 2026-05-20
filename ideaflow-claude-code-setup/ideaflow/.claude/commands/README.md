# IdeaFlow Custom Claude Code Commands

## Usage
Run these with `/[command-name]` inside Claude Code terminal.

---

## /new-feature [name]
**Purpose**: Start a new feature the right way — branch, plan, implement.

```
Steps:
1. Create feature branch: git checkout -b feature/[name]
2. Ask me to describe the feature in detail
3. Write a brief plan in docs/features/[name].md before touching code
4. Implement incrementally — one file at a time, test after each
5. Never modify more than 3 files in a single step
```

---

## /evaluate-idea [transcript]
**Purpose**: Test the Claude idea evaluation pipeline directly from terminal.

```
Call backend/src/services/claude.ts evaluateIdea() with the given transcript.
Print the full JSON response.
Show token usage and latency.
```

---

## /db-check
**Purpose**: Validate database state in dev.

```
1. Connect to ./data/ideaflow.db
2. Count rows in each table
3. Show last 5 ideas with their scores
4. Check for any NULL required fields
5. Report any schema mismatches vs docs/db-schema.md
```

---

## /security-check
**Purpose**: Quick security audit before committing.

```
Scan for:
- Any hardcoded API keys or secrets (ANTHROPIC_API_KEY, JWT_SECRET, etc.)
- Unvalidated user input reaching DB queries
- Missing auth middleware on routes
- console.log with sensitive data
Report findings. NEVER commit if findings exist.
```

---

## /sync-docs
**Purpose**: Keep docs in sync with actual code.

```
1. Read current backend/src/routes/*.ts — extract all API endpoints
2. Compare against docs/architecture.md API list
3. List any endpoints in code but not in docs
4. List any endpoints in docs but not in code
5. Update docs/architecture.md to match reality
```
