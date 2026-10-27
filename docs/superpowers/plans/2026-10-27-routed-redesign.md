# Final routed portfolio implementation plan

Approved baseline: user's final UI/UX redesign request, October 27, 2026. Work in this repository on main; no commits, pushes or deployment. Preserve backend and verified content. Follow public Minimau personal home, About, Services, Contact and three-column gallery compositions, with original React/plain CSS implementation and no template assets/source.

## Design and decisions
Flat horizontal uppercase navigation; white header/footer, pale gray pages, broad whitespace, restrained font hierarchy. Home uses introduction left and grayscale approved portrait right. About uses portrait left, introduction/details/skills/education right. Services and Contact use two text columns. Portfolio uses a three-column-capable grid with one real WISDOM entry; assets pending rather than fabricated screenshots. Clicking the entry opens /portfolio/wisdom with overview, features, contributions, technology confirmation status and screenshot pending state. No résumé, forms, maps or fake metrics.

React Router handles /, /about, /portfolio, /portfolio/wisdom, /services, /github, /contact and a 404 page. Route changes restore scroll/focus and set page titles. GitHub keeps the same API/service and shows a clearly labeled primary-language count for the displayed repositories, not byte-based language percentages. Skills source contains 14 verified entries, all preserved; user references 16 but two additional names were never supplied. WISDOM technology names were not explicitly supplied; do not infer its complete stack from this portfolio's stack.

## Execution
1. Inspect source, asset inventory and reference visually; snapshot existing source hashes. Install only requested React Router dependency.
2. Refactor shell and sections into accessible routed pages, retain existing GitHub request/error/retry lifecycle and backend unchanged. Replace CSS with shared monochrome page system and responsive layout rules.
3. Browser-test every route at desktop/tablet/mobile widths, active navigation, client navigation/history, refresh, unknown routes, project detail navigation, themes, image loading, GitHub success/error/empty states and zero runtime errors. Run production build and backend tests. Review source hashes, Git status and diff checks; report limitations.

## Ledger
- Reference reviewed using public publisher demo screenshots in local ignored QA cache. No template assets copied into application.
- Source hash snapshot stored in ignored QA cache because initial repository is still untracked; ordinary Git diff cannot show pre/post changes.
- User explicitly authorizes implementation in place; no worktree or integration actions.
- Implementation complete: all routes and detail/pending states added. Browser checks passed for 56 route/theme combinations, navigation/history/menu/focus, theme persistence, GitHub states and title normalization. Independent source review completed; keyboard focus and title edge cases corrected.
- Final build passed with two non-blocking dependency directive notices; backend tests 8/8. Backend and portrait hashes unchanged. Full file inventory, results and content limitations: `docs/final-redesign-report.md`.
