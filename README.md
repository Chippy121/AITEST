
# AITEST

Small single-page calculator web app (client-side only) with UI in `index.html`, behavior in `js/main.js`, and styles built with Tailwind into `css/styles.css`.

## Features
- Vanilla JavaScript calculator logic (append, choose operation, compute).
- Keyboard support.
- Tailwind-based styles (built as part of a CSS build step).
- Simple, reproducible dev workflow for building styles and serving the app locally.

## Prerequisites
- Node.js (recommend latest LTS)
- npm

## Install
From the repository root:
```bash
npm install
```

## Build styles
Tailwind CSS is built into `css/styles.css`. Do not edit `css/styles.css` directly — it is generated.

- Build once:
```bash
npm run build:css
```

- Watch for development:
```bash
npm run watch:css
```

## Serve locally
Serve the static site and open it in a browser:

- Example (port 5000):
```bash
npx serve -l 5000 .
# then open http://localhost:5000
```

You can also use VS Code Live Server or any static file server.

## Project structure
- index.html — main UI (buttons use data-* attributes: `data-number`, `data-operation`, `data-action`)
- js/main.js — calculator logic (variables: `current`, `previous`, `operation`; functions: `appendNumber`, `chooseOperation`, `compute`, etc.)
- src/input.css — Tailwind entry file and custom component layers (edit here for design changes)
- css/styles.css — generated Tailwind output (do not edit)
- tailwind.config.js — theme and color configuration
- package.json — build scripts for Tailwind/PostCSS

## Conventions & important notes
- UI elements are wired by data-* attributes. Do not rename `data-number`, `data-operation`, or `data-action` without updating `js/main.js`.
- Display IDs are `previous` and `current`. `updateDisplay()` writes directly to these IDs.
- To add buttons, copy an existing button and keep appropriate data-* attributes so JS hooks it automatically.
- Change primary accent color in `tailwind.config.js` -> `theme.extend.colors.primary`, then rebuild CSS.

## Running tests (optional)
If Playwright tests exist in the repo, run:
```bash
npx playwright test
```
If Playwright fails to discover tests, ensure test files match `*.spec.ts` or `*.test.ts`, or run a specific file:
```bash
npx playwright test path/to/test.spec.ts --headed
```

## Contributing
- Keep UI data attributes intact.
- Run `npm run build:css` after editing Tailwind sources.
- Open a PR and describe any behavior or visual changes; manual QA for edge cases (divide by zero, large numbers) is recommended.

## License
Specify project license here (add a LICENSE file as needed).