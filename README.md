# Baking Project (React — Intermediate)

This repository contains a small intermediate-level React app for exploring simple baking recipes.

Features:
- Browse a list of sample recipes
- View recipe details (ingredients & steps)
- Add new recipes using a simple form
- Persist added recipes in browser `localStorage`

Tech:
- Vite + React

Getting started

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`).

Next steps and ideas
- Add routing with `react-router` to link to individual recipe pages
- Add unit/interaction tests (React Testing Library)
- Improve visuals and accessibility
 - Add an advanced control panel: search, filter, sort, favorites, export/import, and reset (implemented)

Files of interest
- `src/components` — UI components
- `src/data/recipes.js` — sample data
- `src/App.jsx` — app wiring

If you'd like, I can:
- Add routing and per-recipe URLs
- Persist data to `localStorage` automatically
- Add tests and CI
 - Expand the advanced controls (export options, shareable links, printable recipe cards)
