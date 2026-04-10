# How the Navigation System Works

This document explains how the wireframe prototype simulates dynamic content navigation — letting users click through categories and subcategories to reach different "pages" — without any backend, API, or real asset content.

---

## The Short Version

The app uses **React state** instead of URL-based routing. A single `currentView` variable determines which screen is shown (`home`, `category`, or `assets`). All category and subcategory names come from one static data file. When you click a category, the app updates the state and React re-renders the appropriate view component. No page actually loads — the URL never changes.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────┐
│                     App.tsx                           │
│                                                      │
│  State:                                              │
│    currentView: 'home' | 'category' | 'assets'       │
│    selectedCategory: NavItem | null                   │
│    selectedSubcategory: NavItem | null                │
│                                                      │
│  Renders one of:                                     │
│    ├── HomeView        (when currentView = 'home')   │
│    ├── CategoryView    (when currentView = 'category')│
│    └── AssetView       (when currentView = 'assets') │
│                                                      │
│  + DesktopSidebar (on non-home views, desktop only)  │
│  + MobileDrawer (mobile only, toggled by bottom bar) │
└──────────────────────────────────────────────────────┘
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/data/navigation.ts` | The single source of truth — defines all categories and subcategories as a tree structure |
| `src/config.ts` | Controls navigation depth (2 or 3 levels) |
| `src/App.tsx` | Central state manager — decides which view to show based on user clicks |
| `src/components/HomeView.tsx` | Landing page with a grid of top-level category cards |
| `src/components/CategoryView.tsx` | Shows subcategories within a selected category |
| `src/components/AssetView.tsx` | Displays mock assets for a selected subcategory |
| `src/components/TreeView.tsx` | Recursive sidebar/drawer navigation tree |

---

## Step-by-Step: What Happens When You Click

### 1. Starting at Home

When the app loads, `currentView` is set to `'home'`. The `HomeView` component renders, which maps over all top-level items from `navigationData` and displays them as clickable cards in a grid.

### 2. Clicking a Category (e.g., "Products")

The click triggers `handleNavigate(item)` in `App.tsx`. This function checks:

- **Does the item have children?** If yes, it's a category with subcategories.
  - Sets `currentView = 'category'`
  - Sets `selectedCategory = item` (the "Products" object)
  - React re-renders, now showing `CategoryView`

`CategoryView` receives the selected category as a prop and maps over its `children` array to display subcategory cards (e.g., "New Products", "Bakeware", "Cookware", etc.).

### 3. Clicking a Subcategory (e.g., "Bakeware")

The click triggers `handleSubcategoryClick(item)`:

- Sets `selectedSubcategory = item` (the "Bakeware" object)
- Sets `currentView = 'assets'`
- React re-renders, now showing `AssetView`

`AssetView` receives `categoryName` ("Bakeware") and `parentName` ("Products") as props. These are used for breadcrumbs and the page title. The actual "assets" shown are **generated mock data** — 12 placeholder items with random file types and metadata that are the same regardless of which subcategory you selected.

### 4. Clicking a Leaf Item Directly (from Sidebar)

If a user clicks a leaf node (item with no children) from the sidebar `TreeView`, `handleNavigate` detects it has no children and uses the `findParent()` helper to locate its parent in the tree. It then sets both `selectedCategory` (parent) and `selectedSubcategory` (the clicked item), jumping directly to the `AssetView`.

### 5. Going Back

- **Back to Category:** `handleBackToCategory()` sets `currentView = 'category'` and clears `selectedSubcategory`
- **Back to Home:** `handleBackToHome()` resets everything to the initial state

---

## The Data Structure

All navigation content lives in `src/data/navigation.ts` as a recursive tree:

```typescript
export interface NavItem {
  id: string;        // Unique identifier (e.g., 'bakeware')
  label: string;     // Display name (e.g., 'Bakeware')
  children?: NavItem[];  // Optional nested items
}
```

Example:

```typescript
{
  id: 'products',
  label: 'Products',
  children: [
    { id: 'new-products', label: 'New Products' },
    { id: 'bakeware', label: 'Bakeware' },
    { id: 'cookware', label: 'Cookware' },
    // ...
  ]
}
```

There are **11 top-level categories**, some with subcategories (e.g., Products has 11 subcategories), and one ("Offers") has a third level of nesting (Offers > January 2026 > Customer Offers).

---

## The 2-Level vs. 3-Level Configuration

`src/config.ts` contains:

```typescript
export const APP_CONFIG = {
  maxNavLevels: 2, // Set to 2 or 3
};
```

When set to **2** (default), the app flattens the "Offers" category. Instead of showing:

```
Offers
  ├── January 2026
  │     ├── Customer Offers
  │     └── Host Offers
  └── February 2026
        ├── Customer Offers
        └── Host Offers
```

It promotes the months to top-level categories and renames them:

```
January Offers       ← was "January 2026" under "Offers"
  ├── Customer Offers
  └── Host Offers
February Offers      ← was "February 2026" under "Offers"
  ├── Customer Offers
  └── Host Offers
```

When set to **3**, the original 3-level hierarchy is preserved. This makes it easy to test different information architectures without changing the data.

---

## Why There's No Router

This is a wireframe prototype, not a production app. Using React state instead of a router (like React Router) keeps things simple:

- No URL changes = no routing configuration needed
- No need for route parameters, dynamic segments, or path matching
- The entire "routing" logic is a single `if/else` in `handleNavigate`

**Trade-off:** There's no browser history, so the back button doesn't work, and you can't bookmark or share a link to a specific category. A production version would add URL-based routing.

---

## How the "Asset Pages" Work Without Real Content

`AssetView` calls a `generateMockAssets()` function that creates 12 placeholder asset objects with:

- Random file types (Image, GIF, Video, Document)
- Random content types, usage categories, and orientations
- Placeholder thumbnails (gray boxes)
- Generic filenames

These are **identical regardless of which subcategory you navigate to**. Only the breadcrumb labels and page title change based on the `categoryName` and `parentName` props passed from `App.tsx`.

The filtering toolbar (file type, content type, usage, orientation, sort order) works client-side against these mock assets, so you can interact with the filters even though the underlying data is synthetic.

---

## Visual Flow Diagram

```
┌─────────┐    click category    ┌──────────────┐    click subcategory    ┌───────────┐
│  HOME   │ ──────────────────► │ CATEGORY VIEW │ ──────────────────────► │ ASSET VIEW│
│         │                      │              │                          │           │
│ Grid of │  currentView=        │ Grid of      │  currentView=           │ Mock asset│
│ category│  'category'          │ subcategory  │  'assets'               │ grid +    │
│ cards   │                      │ cards        │                          │ filters   │
└─────────┘                      └──────────────┘                          └───────────┘
     ▲            ◄── back ──────────┘     ▲            ◄── back ──────────────┘
     │                                      │
     └───────────────── back to home ───────┘
```

---

## Summary

| Concept | Implementation |
|---------|---------------|
| Routing | React `useState` (`currentView`) — no URL router |
| Navigation data | Static TypeScript array in `src/data/navigation.ts` |
| "Dynamic" pages | Conditional rendering based on state; only labels change |
| Asset content | Mock data generated at render time, same for all categories |
| Navigation depth | Configurable via `APP_CONFIG.maxNavLevels` (2 or 3) |
| Desktop navigation | Persistent sidebar with collapsible tree (`TreeView`) |
| Mobile navigation | Bottom bar + full-screen drawer with same tree |
