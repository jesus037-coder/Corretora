# Base44 Dev Environment

## What this app is
A single static HTML file (`index.html`) — a Brazilian brokerage dashboard ("Corretora do Zé"). No build step, no backend, no framework. It loads Chart.js and Google Fonts from CDNs and reads data from public Google Sheets (published-as-CSV URLs) plus a Google Apps Script endpoint for writes. All endpoints are public and embedded in the HTML — no secrets required.

## Running it
```
docker compose -f docker-compose.base44.yml up -d
```
Serves `index.html` via nginx on host port 3000. The repo is bind-mounted read-only, so edits to `index.html` are live on the next request (refresh the preview).

## Verifying
- `curl -sf http://localhost:3000/` returns the HTML page.
- External hostname check: `curl -sf -H "Host: external-preview.example.com" http://localhost:3000/` must also return the page.

## No secrets
None needed. All external calls are to public Google Sheets / Apps Script URLs already hardcoded in `index.html`.
