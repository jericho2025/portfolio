# Phase 1 approved design

Baseline: user-approved requirements from October 27, 2026. Local implementation only, in the existing portfolio repository on main. No commits, pushes, deployment, database, or changes to WISDOM.

React/Vite JSX and plain CSS provide a responsive single-scroll portfolio. Express provides read-only health and GitHub endpoints. Prefer this separate frontend/backend approach over a static-only page (which misses the backend requirement) or an SSR framework (excluded by the stack).

Use a black-and-white editorial layout, large typography, generous spacing, sticky navigation, theme persistence, visible keyboard focus, mobile menu, skip link, and reduced-motion support. Sections: hero, about, skills, WISDOM, GitHub, contact, footer. No stock portrait or invented metrics. WISDOM is explicitly collaborative; contributions and capabilities use only supplied information. Contact uses email links, with no misleading submission form.

GitHub API exposes only selected public fields for fixed account jericho2025. Fetch public profile and repositories with timeout, short cache, and controlled error responses; never forward tokens or upstream headers. Frontend handles loading, retry, empty and failure states. No token is required; optional backend-only token increases GitHub rate allowance.

Validation: frontend production build, built-in Node HTTP tests for health, public data and upstream failures, live backend startup and health request, live public GitHub request where networking allows, Git status/diff review. Browser visual checks depend on available tooling and will be reported honestly.
