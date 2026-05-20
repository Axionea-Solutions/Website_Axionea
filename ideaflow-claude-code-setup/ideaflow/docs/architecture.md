# IdeaFlow — Architecture

## System Overview

```
[Browser]
  ├── Voice Capture (Web Speech API)
  ├── Dashboard UI (React)
  └── → REST API calls

[Backend API — Node.js/Express]
  ├── POST /api/ideas          → capture + evaluate
  ├── GET  /api/ideas          → list + ranked
  ├── PUT  /api/ideas/:id      → update/pin
  ├── DELETE /api/ideas/:id    → delete
  └── GET  /api/ideas/digest   → weekly summary

[Claude Service — backend/src/services/claude.ts]
  ├── evaluateIdea(transcript) → { score, market, feasibility, model }
  ├── rankIdeas(ideas[])       → sorted + dependency graph
  └── generateDigest(ideas[]) → weekly markdown summary

[Database Layer]
  ├── DEV:  SQLite (./data/ideaflow.db)
  └── PROD: MongoDB Atlas
```

## Data Flow — Idea Capture

1. User presses Voice Button in browser
2. Web Speech API transcribes speech → raw text
3. Frontend sends `POST /api/ideas` with `{ transcript, rawText }`
4. Backend calls `claude.evaluateIdea(transcript)`
5. Claude returns structured JSON evaluation
6. Saved to DB with score, tags, model suggestion
7. Frontend receives response → idea appears in dashboard ranked

## Claude API Usage

All Anthropic calls are centralized in `backend/src/services/claude.ts`.

### evaluateIdea prompt structure:
```
System: You are an expert business idea evaluator for a DACH-focused AI agency.
        Return ONLY valid JSON, no markdown.

User:   Evaluate this idea: [transcript]
        Return: { score: 1-10, marketFit: string, feasibility: string,
                  revenueModel: string, nextStep: string, tags: string[] }
```

### rankIdeas prompt structure:
```
System: Rank these ideas by highest combined score + strategic fit.
        Return ONLY a JSON array of idea IDs in ranked order.

User:   [JSON array of idea objects]
```

## Database Strategy

### Why SQLite for dev, MongoDB for prod?
- SQLite: zero config, single file, perfect for local dev + testing
- MongoDB: flexible schema (idea evaluations evolve), free Atlas tier, easy hosting
- Schema design is identical — same field names, just different drivers

### Migration path:
Use `scripts/migrate-to-mongo.ts` to export SQLite → MongoDB when going to prod.

## Voice Capture Architecture

```typescript
// Web Speech API — no library needed
const recognition = new window.webkitSpeechRecognition();
recognition.lang = 'de-DE'; // or 'en-US' — user can switch
recognition.continuous = false;
recognition.interimResults = true; // show live transcript

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // send to API
};
```

Fallback: Text input field always visible for non-voice environments.

## MVP Feature Scope (Phase 1)

| Feature | Priority | Status |
|---|---|---|
| Voice capture | P0 | TODO |
| Text input fallback | P0 | TODO |
| Claude evaluation | P0 | TODO |
| Ranked dashboard | P0 | TODO |
| Manual re-rank (drag) | P1 | TODO |
| Pin top 3 as "active" | P1 | TODO |
| Idea dependencies | P2 | TODO |
| Weekly digest | P2 | TODO |
| Export to PDF/Notion | P3 | TODO |
