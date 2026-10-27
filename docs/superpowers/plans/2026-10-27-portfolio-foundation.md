# Portfolio Foundation Implementation Plan

**Goal:** Build the locally runnable Phase 1 portfolio.
**Architecture:** Separate Vite frontend and Express backend, connected by a development /api proxy. GitHub service retrieves allowlisted public fields; React renders supplied personal content and live public repositories.
**Tech Stack:** React, Vite, JavaScript/JSX, plain CSS, Node, Express.
**Spec:** ../specs/2026-10-27-portfolio-design.md

## Global constraints
Only this repository; preserve existing work; work on requested main; no commits, pushes or deployment. No fabricated personal claims. No prohibited frameworks or database.

## Review focus
GitHub failure/rate limits produce safe API errors and visible retry UI. Empty repositories produce an honest empty state. Mobile menu works by keyboard and closes on Escape. Theme works with unavailable storage. Motion follows reduced-motion preferences.

## Tasks
1. Backend: write Node tests for health, public-field projection, empty lists, upstream errors and unknown routes; observe failure; implement app factory, routes, controllers, cached GitHub service and environment-based server; install and run tests.
2. Frontend: create Vite configuration, reusable navigation/section components, theme and GitHub hooks, all requested sections and responsive CSS. Verify with production build and local HTTP check; manually review keyboard semantics and responsive CSS.
3. Document environment, endpoints, startup, source boundaries and limitations. Start actual backend, request health and live GitHub data, inspect status/diff and record verification.

## Execution ledger
- Baseline: repository empty; origin verified; Node v24.14.0. npm.ps1 is blocked by PowerShell policy; use npm.cmd.
- Ruling: work directly in requested checkout/main, as explicitly authorized; no worktree or commit.
- Ruling: use native Node tests for backend behavior; no extra testing framework for static presentation.
- Task 1 complete: observed missing-module failure before implementation, then 8/8 backend tests passed.
- Task 2 complete: all requested sections implemented; Vite production build passed after approved sandbox escalation.
- Review: independent reviewer found contact focus outline used the same theme variable as its background. Confirmed in both theme definitions; changed outline to currentColor so it follows the inverted contact foreground.
- Ruling: no browser automation tool is available; report visual/interactive verification as outstanding instead of claiming it.
- Task 3 complete: actual backend health, live GitHub response, frontend HTTP 200, and both API proxy checks passed. Final build and all eight tests passed. Source inventory and ignore rules reviewed. Full results: docs/phase-1-report.md. User instruction already chooses keeping all changes local and uncommitted; no integration menu is needed.
