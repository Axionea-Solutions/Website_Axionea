-- IdeaFlow SQLite Init Script
-- Run: sqlite3 ./data/ideaflow.db < scripts/init-sqlite.sql

PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS users (
  id           TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email        TEXT UNIQUE NOT NULL,
  name         TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  language     TEXT DEFAULT 'de',
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ideas (
  id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id         TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  raw_transcript  TEXT NOT NULL,
  title           TEXT NOT NULL,
  score           INTEGER CHECK(score BETWEEN 1 AND 10),
  market_fit      TEXT,
  feasibility     TEXT,
  revenue_model   TEXT,
  next_step       TEXT,
  tags            TEXT DEFAULT '[]',       -- JSON array
  status          TEXT DEFAULT 'raw' CHECK(status IN ('raw','active','archived','shipped')),
  is_pinned       INTEGER DEFAULT 0,
  rank            INTEGER,
  dependencies    TEXT DEFAULT '[]',       -- JSON array of idea IDs
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Auto-update updated_at on change
CREATE TRIGGER IF NOT EXISTS ideas_updated_at
  AFTER UPDATE ON ideas
  FOR EACH ROW
BEGIN
  UPDATE ideas SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE INDEX IF NOT EXISTS idx_ideas_user_id ON ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_ideas_status  ON ideas(status);
CREATE INDEX IF NOT EXISTS idx_ideas_score   ON ideas(score DESC);
