# Tanki Online

Реконструкция стартовой страницы Tanki Online на React и Vite.

## Run & Operate

- `pnpm --filter @workspace/tanki-online-clone run dev` — run the website
- `pnpm --filter @workspace/tanki-online-clone run build` — build the website
- `pnpm --filter @workspace/tanki-online-clone run typecheck` — typecheck the website

## Stack

- pnpm workspace, Node.js, TypeScript
- React + Vite
- Tailwind CSS

## Where things live

- `artifacts/tanki-online-clone/src/App.tsx` — page structure and interactions
- `artifacts/tanki-online-clone/src/index.css` — visual styling
- `artifacts/tanki-online-clone/public/images/` — page imagery

## Architecture decisions

- The app is a static frontend reconstruction and does not require a database or API server.

## Product

- Displays the Tanki Online landing page with navigation, server selection, language menu, help popover, and Fight button interaction.

## User preferences

_No additional preferences recorded._

## Gotchas

- Start the `artifacts/tanki-online-clone: web` workflow to preview the site.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
