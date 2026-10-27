# WISDOM interactive feature showcase

Latest media inventory: [wisdom-media-inventory.md](wisdom-media-inventory.md). The sections below record the initial six-card implementation; the subsequent pass adds a seventh template card, reviewed tutorial/library assets and an actual AR handoff capture. Remaining media gaps are listed in the latest inventory.

Route: `/portfolio/wisdom`. Existing overview, project information, contributions and technology section are preserved. The former blanket pending-screenshots block is now a feature selector with individual media availability.

## Implementation

- `frontend/src/data/wisdomFeatures.js`: six feature names, descriptions, source-backed workflow steps and media metadata.
- `frontend/src/components/WisdomFeatureShowcase.jsx`: accessible selectable buttons and selected feature state.
- `frontend/src/components/FeatureMediaGallery.jsx`: reusable screenshot/video gallery, next/previous controls, captions, load-failure handling and native modal image viewer. Native dialog provides focus containment and Escape dismissal; arrow keys navigate enlarged screenshots. Feature changes reset the gallery and close the previous viewer.
- `frontend/src/sections/ProjectDetails.jsx`: adds the showcase without changing existing project information.
- `frontend/src/styles/global.css`: scoped monochrome controls, responsive feature cards, gallery and enlarged viewer styling.
- `frontend/public/images/projects/wisdom/customer-designs.png`: public customization catalogue capture, 1440×900.
- `frontend/public/images/projects/wisdom/customer-editor.png`: public customer 3D preview capture, 1440×900.

No dependencies, routes, backend files, authentication settings or portfolio-wide content were changed.

## Media provenance and source review

Both included PNGs were captured on October 27, 2026 from `https://spiralwoodservice.com/customize`, which redirects to `https://www.spiralwoodservice.com/customize`. The first shows the public design catalogue. The second was captured after opening the first public Customize preview. No account was used, no cart action was taken, and no request was submitted. Captures remain in their original colors and were not altered or generated.

Read-only inspection of `C:\Users\User\spiralwood\admin\frontend` confirmed feature workflows in blueprint editor/header, manual construction review, public customer preview, AR device viewer, sales report and physical inventory source. No source in that project was modified. No database dumps, environment secrets or private accounts were accessed.

Existing tutorial media were inspected for suitability. A checkout image containing personal/contact details was excluded; no existing tutorial images were copied. Public furniture-only product pictures were not substituted for screenshots of missing admin features.

## Available and missing assets

| Feature | Media |
| --- | --- |
| 3D Blueprint Editor | Missing: approved staff editor screenshots or anonymized recording |
| Manual Furniture Creation | Missing: approved manual-build/review screenshots or anonymized recording |
| AR Furniture Preview | Missing: genuine on-device AR demonstration video |
| Sales Management | Missing: approved screenshots/recording using anonymized demo data |
| Inventory Management | Missing: approved screenshots/recording using anonymized demo data |
| Customer Customization | Available: two fresh public captures |

Missing assets have a dedicated visible pending message rather than fake media. Customer preview media is labeled as customer customization and is not presented as the staff blueprint editor or as an AR recording.

## Adding future media

Place approved public screenshots and recordings under `frontend/public/images/projects/wisdom/`. Add entries to the relevant feature's `media` array in `wisdomFeatures.js`:

```js
{
  type: 'image',
  src: '/images/projects/wisdom/approved-screenshot.png',
  alt: 'Describe the actual visible interface',
  caption: 'Explain the step shown',
  provenance: 'Approved demo capture and capture date',
}
```

For a real recording, use `type: 'video'`, an actual local `src`, `mimeType: 'video/mp4'` (or `video/webm`), accessible `alt`/caption/provenance and an optional `captions` WebVTT URL. Video uses native controls, inline playback and metadata preload, without autoplay. No video or AR simulation is shipped. Real video playback cannot be validated until an approved recording exists.

## Verification

- Production build passed, 59 modules. The same two non-blocking React Router `use client` notices remain.
- 48 browser feature selections passed: all six features at 1440, 768, 390 and 320px in light/dark themes.
- Screenshot loads, next/previous boundaries, gallery reset on feature change, enlarged-image navigation using arrow keys, Escape, initial modal focus and focus restoration passed.
- No horizontal overflow or runtime errors detected; desktop/mobile screenshots reviewed.
- Backend tests: 8 passed, 0 failed.
- Git whitespace check clean. All project work remains local and uncommitted; no push or deployment.

Browser capture/test scripts and QA screenshots remain in ignored `frontend/node_modules/.cache/`. Existing local servers were reused. These scripts are test utilities, not production dependencies.
