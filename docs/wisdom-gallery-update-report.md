# Targeted WISDOM gallery update — October 27, 2026

Page: `/portfolio/wisdom`. Existing layout, routing, backend, personal content and WISDOM source project are unchanged.

## Final gallery changes

- Removed only the standalone `template-wardrobe.png` gallery entry. The legitimate `blueprint-editor.png` and `furniture-templates.png` entries remain intact. Existing table/chair entries remain.
- Customer Customization now contains exactly two entries: `customer-designs.png` and `customer-editor.png`. Removed the four `customer-tutorial-*` entries, including their captions/provenance, from the active configuration.
- Inventory Management now has three sanitized interface previews in Raw Materials / Build Materials / Inventory Report order.
- Sales Management now has one sanitized Sales Report preview.
- Preview labels handle singular/plural correctly. Gallery state keys include media paths, resetting the selected image when a feature's media list changes.
- Removed entries' original files were preserved, as requested; they cannot be reached through the gallery. No asset files were deleted.

## Exact modified/created files

Modified:

1. `frontend/src/data/wisdomFeatures.js` — gallery removals, new sanitized media/captions/alt text, inventory description/workflow matching the supplied modules, visible redaction notes.
2. `frontend/src/components/WisdomFeatureShowcase.jsx` — singular/plural preview counts and media-list-aware gallery reset.

Created:

1. `frontend/public/images/projects/wisdom/inventory-raw-materials-sanitized.png`
2. `frontend/public/images/projects/wisdom/inventory-build-materials-sanitized.png`
3. `frontend/public/images/projects/wisdom/inventory-report-sanitized.png`
4. `frontend/public/images/projects/wisdom/sales-report-sanitized.png`
5. `docs/wisdom-gallery-update-report.md`

No CSS, backend logic, dependencies, unrelated sections or WISDOM source files changed.

## Screenshot sources

All four supplied images were visually matched to their original local files in `C:\Users\User\Pictures\Screenshots\`:

| Public sanitized copy | Original source | Caption |
| --- | --- | --- |
| `inventory-raw-materials-sanitized.png` | `Screenshot 2026-10-27 114645.png` | Raw Materials Management |
| `inventory-build-materials-sanitized.png` | `Screenshot 2026-10-27 114704.png` | Build Materials Management |
| `inventory-report-sanitized.png` | `Screenshot 2026-10-27 114723.png` | Inventory Reporting |
| `sales-report-sanitized.png` | `Screenshot 2026-10-27 114853.png` | Sales Management and Reporting |

The three pasted-text attachments contain identical request text. The direct chat request determined the implementation scope. No attachment instructions expanded that scope.

## Screenshot security

Inspected all originals before using them. Sales contains customer identities, order references and financial figures. Inventory contains stock records, quantities, suppliers, costs, prices and profit information. These records were treated as private rather than assumed to be demo data.

Created deterministic opaque redacted PNG copies. No generative image model, sample replacement values, artificial interface or fabricated data was used. Record-table bodies, sensitive summary values, counts and account metadata are permanently overwritten in the public copies. Public copies retain the real headings, filters, column labels, tabs, controls and original colors outside redacted regions. The source screenshots remain unchanged, verified using SHA-256 checks.

The redactions are baked into image pixels, not removable CSS overlays or blur filters. PNGs were rendered from decoded pixels, without retaining original image metadata or embedded source layers. Originals were not copied into public assets. All screenshots were safely sanitizable; none was blocked.

The public previews intentionally hide substantial record areas. They demonstrate the genuine interface structure without exposing actual business values. Clear captions/provenance and per-feature notes identify them as sanitized copies.

## Validation

- Customer Customization: exactly **2** valid entries.
- Inventory Management: exactly **3** entries.
- Sales Management: exactly **1** entry.
- No active `template-wardrobe.png` or `customer-tutorial-*` media references remain.
- Blueprint Editor, Manual Furniture Creation and AR feature data unchanged from the pre-update snapshot; legitimate templates screenshot preserved.
- Every active media path exists.
- Browser checks passed: **56 feature selections and 88 image loads** at 1440, 768, 390 and 320px in both light and dark themes.
- Previous/Next, first/last boundaries, clickable enlarged previews, arrow-key navigation, Escape, focus restoration and partial-media notes passed.
- No horizontal overflow or browser runtime errors detected.
- Frontend production build passed. Two existing non-blocking React Router `use client` directive notices remain.
- `git diff --check` clean; no staged changes. Repository files remain untracked before the initial commit, so a saved pre-change data snapshot was used for the targeted content comparison.

No commits, pushes or deployment. Local review URL: `http://127.0.0.1:5173/portfolio/wisdom`.

Manual Furniture Creation still has no approved media, and the AR entry still demonstrates desktop handoff only, not an on-device AR recording. Those unrelated feature states were preserved.
