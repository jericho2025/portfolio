# Jericho M. Flores — Portfolio

Professional portfolio built with React, Vite, JavaScript/JSX, React Router, plain CSS, Node.js and Express. No database. The monochrome interface supports light/dark modes; the actual portrait and approved WISDOM screenshots retain their original colors.

## Pages and content

- `/`: Home and actual profile portrait.
- `/about`: Introduction, technical skills and graduating BSIT education.
- `/portfolio`: WISDOM preview, Explore Project and official live website link.
- `/portfolio/wisdom`: Collaborative project overview, verified technologies, contributions, and eight interactive feature galleries using genuine screenshots. Private admin records are redacted. AR media shows desktop handoff, not an in-room demonstration.
- `/services`: Four development service areas.
- `/github`: Genuine public repositories from jericho2025, primary-language counts, loading/error/retry states.
- `/arcade`: Minesweeper, Pattern Match, Speed Typing, Developer Trivia, Endless Falling Blocks and Dino Runner. XP and records use versioned localStorage only; no account, database or global leaderboard.
- `/contact`: Email, GitHub, Facebook, Telegram, display-only Discord and non-clickable LinkedIn Coming Soon, plus location.
- Other paths show a not-found page.

WISDOM was collaboratively developed for Spiral Wood Services. Contributions include frontend development, backend APIs, 3D blueprint development, integration, debugging and testing. No sole authorship or personal PayMongo implementation is claimed.

## Requirements and local setup

Use Node.js >=22.12.0 (tested with 24.14.0), npm and Git. Each app has its own package.json and lockfile. In Windows PowerShell use npm.cmd if npm.ps1 is blocked.

Terminal one:

```powershell
cd C:\Users\User\portfolio\backend
npm.cmd ci
# Optional; never overwrite an existing .env:
# Copy-Item .env.example .env
npm.cmd run dev
```

Terminal two:

```powershell
cd C:\Users\User\portfolio\frontend
npm.cmd ci
# Optional: copy .env.example to .env only if it does not exist.
npm.cmd run dev
```

Open http://127.0.0.1:5173. With VITE_API_BASE_URL empty, Vite development proxies /api to http://127.0.0.1:3001. If changing the local backend port, update the proxy target in frontend/vite.config.js. `npm.cmd start` in backend starts without the watcher. Stop your own servers with Ctrl+C.

## Environment variables

| App | Variable | Value / behavior |
| --- | --- | --- |
| Frontend | VITE_API_BASE_URL | Public backend HTTPS origin, without /api or a trailing slash. Required for production. Empty in local development to use Vite's proxy. |
| Backend | PORT | Render supplies this. Local default 3001. |
| Backend | NODE_ENV | Set production on Render. Local example uses development. |
| Backend | HOST | Local default 127.0.0.1. Production/Render always binds 0.0.0.0, even if a local HOST was copied. |
| Backend | FRONTEND_ORIGINS | Comma-separated exact allowed frontend origins; include scheme and port where needed, no paths/trailing slash/wildcards. Set actual Static Site origin and custom domain origin if used. |
| Backend | GITHUB_TOKEN | Optional backend-only GitHub token. Leave absent for unauthenticated public GitHub access. |

VITE_ values are public and embedded at build time. Never use them for credentials. Set VITE_API_BASE_URL before the production build and rebuild after changing it. Production rejects missing, credential-bearing, non-HTTPS and localhost API bases and displays the existing GitHub fallback rather than silently requesting a wrong endpoint.

CORS permits GET/HEAD from explicitly configured origins and supports OPTIONS preflight. It does not allow credentials or reflect arbitrary origins. Requests without an Origin (health checks, CLI clients and the local same-origin proxy) remain supported; CORS is not authentication. GitHub access remains read-only and fixed to jericho2025.

.env files, node_modules, dist and logs are ignored. .env.example files are intentionally included and contain no secret values.

## Build and tests

```powershell
cd C:\Users\User\portfolio\backend
npm.cmd test
npm.cmd start
# In another terminal while the backend is running:
Invoke-RestMethod http://127.0.0.1:3001/api/health
Invoke-RestMethod http://127.0.0.1:3001/api/github

cd C:\Users\User\portfolio\frontend
npm.cmd run test:arcade
node --test tests/api-url.test.js
npm.cmd run build
npm.cmd run preview
```

Preview uses http://127.0.0.1:4173 and supports direct page loads. For GitHub data in a production preview, build with a valid public HTTPS VITE_API_BASE_URL and include the preview origin in that backend's FRONTEND_ORIGINS. Use the development server for the fully local API workflow.

## Render setup — configure only; no deployment performed

Use the personal Jericho workspace when you later approve deployment. No workspace or service has been created or modified by this change.

| Setting | Frontend Static Site | Backend Web Service |
| --- | --- | --- |
| Repository / branch | jericho2025/portfolio / main | jericho2025/portfolio / main |
| Root directory | frontend | backend |
| Build command | npm ci && npm run build | npm ci |
| Publish directory | dist | Not applicable |
| Start command | Not applicable | npm start |
| Health check | Not applicable | /api/health |
| Environment | VITE_API_BASE_URL = actual public backend HTTPS origin | NODE_ENV=production; FRONTEND_ORIGINS=actual frontend origin(s); optional GITHUB_TOKEN |
| Node version | Supported version satisfying engines, e.g. locally verified 24.14.0 | Same |

Do not set a local PORT/HOST from .env.example on Render. Render supplies PORT; the app selects 0.0.0.0. Configure frontend/backend environment values using actual assigned URLs, not guessed service names. Creating a service can trigger deployment; do that only after approval. See [Render web services](https://render.com/docs/web-services).

On the **frontend Static Site only**, add this Redirects/Rewrites rule:

| Source | Destination | Action |
| --- | --- | --- |
| /* | /index.html | Rewrite |

This supports direct access/refresh for every page above, including /arcade and /portfolio/wisdom. See [Render rewrites](https://render.com/docs/redirects-rewrites). The frontend calls the configured backend origin directly. Do not apply the SPA rule to the Express service or proxy API requests into index.html. Backend /api/missing must remain JSON 404; Express intentionally does not host the frontend.

## Images to retain and hold back

Keep src/assets/jericho-profile.png, public/images/projects/wisdom-preview.png and all 12 screenshot paths referenced in src/data/wisdomFeatures.js. Both the profile photo and screenshots are genuine approved assets. No source images were deleted, moved or modified.

These eight files under frontend/public/images/projects/wisdom/ have no current component/data references and may be excluded from the initial commit, pending your approval:

- customer-tutorial-finish.png
- customer-tutorial-parts.png
- customer-tutorial-review.png
- customer-tutorial-size.png
- furniture-templates.png
- template-dining-chair.png
- template-dining-table.png
- template-wardrobe.png

They remain on disk and are not newly ignored. Vite copies all public files, including unused ones, into dist. Do not blindly stage the entire tree or upload the current local dist; review an explicit initial-commit allowlist. A Render build from a commit excluding these eight files will exclude them from the deployed output. Historical audit manifests need regeneration after changes.

## Structure and API

frontend contains public assets, src/components (including arcade), src/sections, src/hooks, src/services, src/utils, src/data, styles, and Node built-in tests. backend contains config, middleware, routes, controllers, services, startup and tests.

- GET /api/health returns status ok.
- GET /api/github returns public profile identity and up to six recently updated public repositories. No fabricated metrics or contribution heatmap.
- GitHub responses are cached for five minutes; upstream errors return safe JSON 502. Tokens are never returned.
- Contact uses verified external links and mailto, with no nonfunctional form.

Browser checks should include phones/tablets, keyboard navigation, themes, virtual typing, Dino touch controls and enlarged WISDOM screenshots. A successful build does not substitute for real-device testing. No commit, push or deployment is authorized by these setup instructions.