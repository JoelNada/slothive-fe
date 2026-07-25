# SlotHive — React + Vite

The React rebuild of SlotHive, migrating gradually from the static
HTML/CSS/JS version in `../slothive/`.

## Setup

This project's dependencies haven't been installed yet — run this once you
have the folder locally:

```bash
cd slothive-app
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## What's here

- **Vite** for the dev server and build (`npm run build` for production).
- **React Router** for navigation — every nav link is a real route.
- **CSS Modules** per component (`Component.module.css`), plus one global
  stylesheet (`src/styles/tokens.css`) for design tokens (colors, type,
  spacing) and base element resets, ported directly from the static site's
  `css/style.css`.

## Structure