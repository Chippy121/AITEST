# Copilot instructions for AITEST (calculator)

Purpose
- Small single-page calculator app. Main UI is `index.html`, behavior in `js/main.js`, and styles are built into `css/styles.css` by Tailwind.

Big picture
- Client-side only web app (no server code). HTML + vanilla JS handle UI and logic.
- Tailwind is integrated as a build step: sources are in `src/input.css` and `tailwind.config.js`. The build outputs `css/styles.css` which is referenced by `index.html`.

Critical files to inspect
- `index.html` — layout, data-* attributes on buttons (`data-number`, `data-operation`, `data-action`), header and theme toggle. Keep data attributes intact when changing markup.
- `js/main.js` — core calculator logic: variables `current`, `previous`, `operation`, functions `appendNumber`, `chooseOperation`, `compute`, and event listeners that select elements by data attributes and IDs (`#previous`, `#current`). Keyboard support is implemented here.
- `src/input.css` — Tailwind entry file and custom component layers. Edit here for design or add `@layer components` styles.
- `tailwind.config.js` — theme extensions (colors, fonts). Change `theme.extend.colors.primary` to alter the accent color globally.
- `package.json` — build scripts: `npm run build:css` and `npm run watch:css`.
- `postcss.config.js` — PostCSS pipeline used by the Tailwind build.

Developer workflows (how to build / test / run locally)
- Install deps: `npm install` (from repo root).
- Produce production CSS: `npm run build:css` (writes `css/styles.css`).
- Dev mode (watch CSS): `npm run watch:css`.
- Serve the static site: use `npx serve -l 5000 .`, `npx http-server -p 8080` or VS Code Live Server extension. Open `http://localhost:5000` (or the port you choose).
- Note: the repo previously used Tailwind CDN; the current workflow expects a built `css/styles.css`. Avoid re-adding the CDN.

Project-specific conventions / patterns
- UI elements are wired via data-* attributes. Do not rename `data-number`, `data-operation`, or `data-action` without updating `js/main.js`.
- Display fields use IDs `previous` and `current`. `updateDisplay()` writes directly to these elements.
- Button layout is a simple grid in `index.html`. To add a new button keep data-* attributes so it automatically hooks into JS behavior.
- Styling changes should be made in `src/input.css` (Tailwind layers) or `tailwind.config.js`. Do not directly edit `css/styles.css` because it is generated and will be overwritten by the build.

Integration points / external deps
- Tailwind CSS (build step via `tailwindcss`, PostCSS and autoprefixer). See `package.json` devDependencies.
- Google Fonts (Inter) is referenced from `index.html`.
- No backend APIs or tests detected; the app is fully client-side.

Editing examples (copy/paste-ready)
- Change primary color: edit `tailwind.config.js` -> `theme.extend.colors.primary` then run `npm run build:css`.
- Add a reusable component class:
  - In `src/input.css` add under `@layer components`:
    .btn-accent { @apply bg-gradient-to-r from-primary to-accent text-slate-900 font-bold rounded-xl; }
  - Then run `npm run build:css` and use `class="btn-accent"` in `index.html`.
- Add a new calculator button that works out-of-the-box:
  - Copy an existing button and change its `data-number` or `data-operation` value. The event listeners in `js/main.js` pick it up automatically.

Known gaps / where to ask the human
- Node / npm versions are not pinned — if builds fail, ask which Node version to target.
- No automated tests or linting configured. For changes that affect logic, request a human review and manual QA on keyboard and edge cases (divide by zero, long numbers).
- Accessibility: keyboard support exists, but focus order and ARIA labeling could be improved. Confirm desired accessibility requirements before refactors.

If anything above is unclear or you want additional instructions (CI setup, tests, prettier/eslint, or converting Tailwind to a pure CDN approach), tell me which area to expand and I'll iterate.
