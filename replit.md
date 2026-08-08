# Tanki Online BR — Vite + TypeScript

A Brazilian Portuguese website for the Tanki Online browser tank game. The imported page keeps its original HTML, CSS, and local assets while its client behavior now runs from a typed Vite entry point.

## Stack

- Vite + TypeScript frontend
- Custom fonts (DINPro, Panton) and images bundled locally
- JSON data files in `br/posts/` for news/post listings

## How to run

The **Start application** workflow runs Vite with:

```bash
npm run dev
```

Open the preview pane to see it on port 5000.

## Project structure

- `index.html` — main entry point
- `src/main.ts` — typed DOM behavior: menus, carousels, news, server status, cookies, and parallax
- `vite.config.ts` — Vite dev/build configuration
- `tsconfig.json` — strict TypeScript configuration
- `css/` — stylesheets (normalize, colorbox, flags, local styles)
- `js/` — preserved legacy scripts and archived third-party assets
- `images/` — all image assets
- `fonts/` — custom font files
- `br/posts/` — JSON data files for news post listings

## Commands

- `npm run dev` — start the development server on port 5000
- `npm run build` — type-check and create a production build
- `npm run preview` — serve the production build on port 5000

## User preferences

<!-- Add any user-specific preferences here -->