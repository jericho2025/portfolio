# WISDOM feature media inventory — October 27, 2026

## Outcome

Seven feature cards are now available, including Furniture Template Creation. Ten genuine existing/captured images are linked to their corresponding features. **This gallery is not complete.** Four admin features still have no safe interface screenshots. Template creation has library thumbnails only; AR has a desktop handoff screenshot only.

The earlier empty cards were intentional `media: []` entries in `frontend/src/data/wisdomFeatures.js`, not broken image paths. The original asset search had yielded only safe public customer captures. This pass extends the inventory with existing public template thumbnails, reviewed customer tutorial captures, and a new public AR launch capture.

## Exact image filenames

All files are under `frontend/public/images/projects/wisdom/`.

| Filename | Feature | Source and limitations |
| --- | --- | --- |
| `template-dining-table.png` | Furniture Template Creation | Unchanged WISDOM `frontend/public/library-thumbs/wooden-dining-table.png`; library thumbnail, not creation UI |
| `template-dining-chair.png` | Furniture Template Creation | Unchanged WISDOM `frontend/public/library-thumbs/dining-chair-template.png`; library thumbnail, not creation UI |
| `template-wardrobe.png` | Furniture Template Creation | Unchanged WISDOM `frontend/public/library-thumbs/closet-wardrobe-cabinet.png`; library thumbnail, not creation UI |
| `ar-desktop-handoff.png` | AR Furniture Preview | Fresh public WISDOM customer-preview AR launch dialog capture, 1440×900; QR/mobile handoff only, not room placement |
| `customer-designs.png` | Customer Customization | Existing 1440×900 public customization catalogue capture retained |
| `customer-editor.png` | Customer Customization | Existing 1440×900 public customer 3D preview capture retained |
| `customer-tutorial-size.png` | Customer Customization | Unchanged `home-tutorial-step-2-set-size.png`; earlier customer UI |
| `customer-tutorial-parts.png` | Customer Customization | Unchanged `home-tutorial-step-3-edit-parts.png`; customer part-editing UI, not staff manual construction |
| `customer-tutorial-finish.png` | Customer Customization | Unchanged `home-tutorial-step-4-choose-finish.png`; earlier customer UI |
| `customer-tutorial-review.png` | Customer Customization | Unchanged `home-tutorial-step-5-review-design.png`; earlier customer UI |

Tutorial files originate in `C:\Users\User\spiralwood\admin\frontend\src\pages\assets\home-tutorial\`. All copied source files retain their original colors and bytes. No new imagery, mockups or fabricated interface captures were generated. The template assets are referenced by the actual WISDOM blueprint template library source (`furnitureTypes.js`); they are labeled as existing thumbnails, not represented as proof of the creation workflow. Gallery captions distinguish current public captures from earlier tutorial UI.

The AR capture came from `https://spiralwoodservice.com/customize`, redirected to `www.spiralwoodservice.com`: open a public design, then its AR action. That public action created a temporary model-viewing link. No account, cart, order or customer data was involved. The QR/session link expires after approximately two hours; a prominent media note explains that it is a static historical capture, not a live AR session or on-device recording.

## Missing images and reasons

| Feature | Still required | Reason |
| --- | --- | --- |
| Admin 3D Blueprint Editor | Actual authorized editor screenshots/recording | No existing safe captures found; public `/admin/blueprints` redirects to login |
| Furniture Template Creation | Actual template creation/import interface screenshots | Existing files are library thumbnails only; authoring UI requires an authorized demo |
| Manual Furniture Creation | Actual staff manual construction/review interface screenshots | No safe existing captures; customer part editing is a different workflow and is not substituted |
| AR Furniture Preview | Real on-device room-placement video/screenshots | Desktop capture shows QR handoff only; no mobile AR recording found |
| Sales Management | Actual reports using anonymized demo data | No safe existing captures; public `/admin/sales` redirects to login |
| Inventory Management | Actual material/inventory interfaces using anonymized demo data | No safe existing captures or authorized local session; attempted `/admin/inventory` resolves to public catalogue, not an inventory module |

Read-only asset search included hidden/ignored files while excluding dependency, Git, build, upload and coverage trees. It found no MP4/WebM/MOV/AVI/M4V recordings. Logos, payment QR assets, unrelated furniture imagery and the tutorial checkout image containing personal/contact information were excluded. No environment files, database contents, credentials or private accounts were read or used.

Local listener inspection found only the portfolio Node processes on `127.0.0.1:5173` and `127.0.0.1:3001`. There was no local WISDOM Node/web server or authorized demo session. WISDOM was not started, installed or modified; starting it could write cache/runtime files contrary to the read-only requirement.

Remaining staff captures require an authorized demo session with anonymized business data or approved existing screenshots. No authentication was bypassed and no unknown credentials were tried.

## Code changes

- `frontend/src/data/wisdomFeatures.js`: added template feature, image entries, provenance captions and partial-availability notes.
- `frontend/src/components/WisdomFeatureShowcase.jsx`: displays media availability notes and labels asset counts as previews.
- `frontend/src/components/FeatureMediaGallery.jsx`: images themselves are accessible click-to-enlarge buttons; existing enlarged viewer and navigation retained.
- `frontend/src/styles/global.css`: styles clickable images and media notes while preserving monochrome controls and unfiltered original-color media.
- Added eight image files listed above; retained the two original customer captures.
- Added this report and linked it from the earlier showcase documentation.

No routing, backend, dependencies, project contributions, personal information or WISDOM source files were changed.

## Validation

- Frontend production build passed, 59 modules. Two pre-existing non-blocking React Router `use client` notices remain.
- All seven feature cards tested at 1440, 768, 390 and 320px in light/dark themes: **56 selections passed**.
- All ten available images loaded in each configuration: **80 image-load checks passed**.
- Original-color/no-filter checks, correct feature/image association, visible partial-media notes, previous/next boundaries, click-to-enlarge, enlarged viewer arrows, Escape and focus restoration passed.
- No horizontal overflow or browser runtime errors detected.
- Git whitespace checks passed. Existing repository files remain untracked before their first commit; no staged changes, commits, pushes or deployment.

Local browser scripts/captures remain in ignored `frontend/node_modules/.cache/`. Production images are local static files, not an iframe or external embeds.
