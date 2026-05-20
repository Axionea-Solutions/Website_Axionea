# IdeaFlow — Claude Code Project Context

## Project Overview
IdeaFlow is a voice-first Idea Management Dashboard for Axionea, powered by Claude AI.
Tagline: *"Pursue your ideas. Later on."*
Phase 1: Internal Axionea tool (Maxi + Nico daily use)
Phase 2: SaaS product for DACH founders

**WHY**: Founders lose ideas constantly. No time to structure them. IdeaFlow captures, evaluates and ranks ideas automatically so founders return to them ready to act.

**Core Flow**: User speaks → Claude transcribes + evaluates → Dashboard ranks → User acts

See @docs/architecture.md for full system design.
See @docs/db-schema.md for database structure.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express (REST API)
- **Database**: SQLite (dev/local) → MongoDB Atlas (production)
- **AI**: Anthropic Claude API (claude-sonnet-4-6)
- **Voice**: Web Speech API (browser-native, no extra dependency)
- **Auth**: JWT (simple, no OAuth in MVP)
- **Hosting**: Vercel (frontend) + Railway (backend)

## Project Structure
```
ideaflow/
├── CLAUDE.md              # ← you are here
├── .mcp.json              # MCP server config (project-scoped)
├── .claude/
│   └── commands/          # Custom slash commands
├── frontend/              # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json
├── backend/               # Node.js + Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   │   └── claude.ts  # All Anthropic API calls go here
│   │   └── db/
│   └── package.json
├── docs/
│   ├── architecture.md
│   └── db-schema.md
└── scripts/               # Dev utility scripts
```

## Key Commands
```bash
# Dev
npm run dev:frontend       # Start React app (port 5173)
npm run dev:backend        # Start API server (port 3001)
npm run dev                # Both concurrently

# DB
npm run db:migrate         # Run DB migrations
npm run db:seed            # Seed dev data
npm run db:studio          # Open DB viewer

# Test
npm run test               # Run all tests
npm run test:watch         # Watch mode

# Build
npm run build              # Production build
```

## Code Conventions
- TypeScript strict mode — no `any` types
- Functional React components only, hooks preferred
- All Claude API calls go through `backend/src/services/claude.ts` — NEVER call Anthropic API directly from frontend
- Database access only through model layer — no raw queries in routes
- Use `zod` for all input validation at API boundaries
- Error responses always follow `{ error: string, code: string }` format

## Database Rules
- SQLite for local dev (`./data/ideaflow.db`)
- MongoDB Atlas for production (connection string in env)
- NEVER commit `.db` files or any file with real user data
- See @docs/db-schema.md for all collections/tables

## Environment Variables
Required in `.env` (never commit):
```
ANTHROPIC_API_KEY=
MONGODB_URI=           # production only
JWT_SECRET=
NODE_ENV=development
```

## What Claude Gets Wrong (Learned)
- DON'T import from `../../../` — always use `@/` path alias
- DON'T add new npm packages without checking if a native Web API exists first
- Voice capture uses Web Speech API, NOT a third-party library
- ALWAYS handle microphone permission denied error gracefully
- The idea scoring (1-10) must come from Claude API, not hardcoded logic

## Git Workflow
- `main` — production only, never commit directly
- `dev` — integration branch
- `feature/[name]` — all work happens here
- Commit messages: `feat:`, `fix:`, `refactor:`, `docs:`
