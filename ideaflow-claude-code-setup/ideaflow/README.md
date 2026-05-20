# IdeaFlow — Setup Guide

> Voice-first Idea Management Dashboard for Axionea
> *"Pursue your ideas. Later on."*

## Prerequisites
- Node.js 20+
- npm or pnpm
- Claude Code installed (`npm install -g @anthropic-ai/claude-code`)
- Anthropic API key

## Quick Start

```bash
# 1. Clone and install
git clone [repo-url]
cd ideaflow
npm install

# 2. Environment setup
cp .env.example .env
# → Fill in ANTHROPIC_API_KEY and JWT_SECRET in .env

# 3. Init SQLite database
mkdir -p data
sqlite3 ./data/ideaflow.db < scripts/init-sqlite.sql

# 4. Start development
npm run dev
# Frontend: http://localhost:5173
# Backend:  http://localhost:3001
```

## Claude Code Setup

```bash
# Open project in Claude Code
cd ideaflow
claude

# Verify MCP servers loaded
/mcp

# Expected output:
# ✓ github
# ✓ filesystem
# ✓ sqlite
# ✓ sequential-thinking
# ✓ context7
```

## MCP Server Setup (one-time)

```bash
# Set GitHub PAT as env variable
export GITHUB_PAT=ghp_your_token_here

# Verify config
cat .mcp.json
```

## Available Custom Commands

| Command | Purpose |
|---|---|
| `/new-feature [name]` | Create feature branch + plan |
| `/security-check` | Audit before committing |
| `/db-check` | Validate dev database state |
| `/sync-docs` | Keep API docs in sync with code |

## Database

**Dev**: SQLite (auto-created at `./data/ideaflow.db`)
**Prod**: MongoDB Atlas — set `MONGODB_URI` in `.env`

See `docs/db-schema.md` for full schema.

## Architecture

See `docs/architecture.md` for system design and data flow.

---
Built by Axionea — Maximilian Zvada & Nico Fisseler
