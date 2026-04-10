# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lo-fi black-and-white wireframe prototype for validating the navigation pattern of Marketing Imagery 2.0 (Pampered Chef). Not a production app — it's a clickable prototype for stakeholder review. No backend, no real data.

## Commands

- `npm run dev` — start Vite dev server (default: http://localhost:5174/)
- `npm run build` — type-check with `tsc -b` then Vite build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

Single-page React app with three views managed by state in `App.tsx` (no router):

- **HomeView** — grid of category cards (landing page)
- **CategoryView** — shows subcategories within a selected category
- **AssetView** — displays placeholder asset cards for a leaf subcategory

Navigation flow: Home → Category → Assets, controlled by `currentView` state (`'home' | 'category' | 'assets'`).

### Navigation Data

`src/data/navigation.ts` defines the full tree as `NavItem[]` (id, label, optional children). This mirrors `Content_Library_Sitemap.md`. The tree is up to 3 levels deep (e.g., Offers → January 2026 → Customer Offers).

`src/config.ts` has `APP_CONFIG.maxNavLevels` (2 or 3). When set to 2 (default), `App.tsx` flattens the Offers group so its children become top-level items.

### Responsive Layout

- **Desktop (≥768px / `md`)**: persistent left sidebar (`DesktopSidebar`) with collapsible `TreeView`; sidebar hidden on HomeView.
- **Mobile (<768px)**: fixed bottom bar opens a full-screen `MobileDrawer` with the same `TreeView`.

### Key Components

| Component | Role |
|---|---|
| `TreeView` | Recursive collapsible tree used by both sidebar and drawer |
| `DesktopSidebar` | Left sidebar wrapper (desktop only) |
| `MobileDrawer` | Full-screen overlay drawer (mobile only) |
| `CategoryCard` | Card with illustration for HomeView grid |
| `AssetCard` | Placeholder asset thumbnail |
| `FilterResultsBar` | Stub filter/search bar above asset grids |
| `AssetToolbar` | Toolbar stub shown in AssetView |
| `CategoryIcons` | SVG icon mapping per category |

### Assets

`src/assets/images/CategoryIllustrations/` contains per-category illustration PNGs keyed by slug (e.g., `products.png`, `recipes.png`). `default.png` is the fallback.

## Stack

React 19 + TypeScript + Vite 7 + Tailwind CSS 3. No routing library, no state management library, no test framework.

## Deployment

Deployed to Netlify. `netlify.toml` exists in the repo root. SPA redirect rule sends all routes to `index.html`.
