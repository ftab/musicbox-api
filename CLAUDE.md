# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm start          # run the server (port 5000)
npm test           # run all tests (mocha)
npx mocha --exit tests/server.test.js  # run a single test file
```

## Configuration

Copy `config.js.example` → `config.js` and fill in MySQL credentials. The database name is `ircbot`. Each request opens and closes its own connection (no pool) — see `services/db.js`.

## Architecture

Express app in `server.js` with two layers:

**Routes** (`routes/`) — thin: parse request, call service, render or return JSON.
- `routes/home.js` → renders `views/home.pug` (top-50 leaderboard)
- `routes/links.js` → renders `views/links.pug` (one user's video list, resolved by nickname)
- `routes/api/` → JSON endpoints for leaderboard, users, videos

**Services** (`services/`) — all SQL lives here.
- `leaderboard.js` — groups aliased nicks under their primary, used by both the HTML home page and the JSON API
- `users.js` — `getByNickname` resolves any nick (primary or alias) to a canonical user
- `videos.js` — `getMultiple` fetches videos for all user IDs sharing the same primary nick
- `db.js` — single `query(sql, params)` helper

## Alias System

The `aliases` table (normalized in migration V3 of IRCMusicBot) maps secondary nicks to a primary nick:

```
aliases(aliasId, primaryNick, aliasNick)   -- one row per alias
```

Key pattern used throughout: `COALESCE(a.primaryNick, u.nickname)` after a `LEFT JOIN aliases a ON LOWER(u.nickname) = LOWER(a.aliasNick)` resolves any nick to its primary. `getByNickname` also handles the case where the lookup term is itself a `primaryNick` (i.e., not a user account) via a third `OR LOWER(a.primaryNick) = LOWER(?)` clause.

## Deployment

CI/CD via `.github/workflows/node.js.yml`: rsync to server, then `pm2 restart API`. The PM2 process **must be named `API`** (case-sensitive). To register it the first time on the server:

```sh
cd /home/musicbox/api/production
pm2 start server.js --name API
pm2 save
```
