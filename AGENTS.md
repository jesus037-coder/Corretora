# Base44 Dev Environment

## What this app is
A Brazilian brokerage/investment dashboard ("Corretora do Zé"). Originally a single static `index.html` (still in repo root as reference). The new version is a React+Vite frontend with an Express+PostgreSQL backend, designed to replace the static app.

## Architecture
- **`app/`** — React + Vite frontend (Vite 6, dev server on port 5173 → host 3000). Proxies `/api` to the backend.
- **`server/`** — Node + Express API (port 8000, internal). JWT auth. Dashboard computation (portfolio consolidation, KPIs, proventos) ported from the original index.html.
- **`db`** — PostgreSQL 16. Tables: users, ativos, movimentacoes, proventos, metas.
- Single-origin: only port 3000 is public; API calls go through Vite's proxy.

## Running it
```
docker compose -f docker-compose.base44.yml up -d
```
The `api` service runs `npm install && node seed.js && nodemon server.js` on start — seeds the DB from the public Google Sheets on every boot. The `web` service runs Vite dev with live reload.

## Data source
Clients (users), metas and movimentacoes are now managed locally in PostgreSQL — no longer seeded or synced from Google Sheets. They persist across restarts.
Other data (ativos, proventos) still fetches from public Google Sheets (published-as-CSV URLs in `server/seed.js` and `sync.js`). No credentials needed — these are public URLs.

## Login credentials (from Google Sheets)
- Admin: `gabriel.321jesus@gmail.com` / `123126`
- Demo: `Teste` / `t@2026`
- Regular user: `Kaue.rogerio@outlook.com` / `7259034`

## No external secrets needed
JWT_SECRET and DB credentials are internal dev values, set inline in compose. All Google Sheets URLs are public.

## Original static app
`index.html` (repo root) + `nginx.base44.conf` are from the original setup. The new React app supersedes them on port 3000.

## Verifying
- `curl -sf http://localhost:3000/` returns the React app HTML.
- `curl -sf http://localhost:8000/api/auth/login -X POST -H 'Content-Type: application/json' -d '{"email":"Teste","senha":"t@2026"}'` returns a JWT token.
