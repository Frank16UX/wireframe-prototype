# Marketing Imagery 2.0 - Lo-Fi Wireframe Prototype

A black and white wireframe prototype to validate the navigation pattern for Marketing Imagery 2.0.

## Features

### Desktop View
- Left sidebar with collapsible tree navigation
- All library categories visible in the sidebar
- Click on folder chevron icon to expand/collapse subcategories
- Click on category name to navigate to that category's view

### Mobile View
- Bottom fixed menu with "Home" button
- Tapping the menu button opens a full-screen drawer
- Tree-view navigation pattern in the drawer
- Expandable/collapsible folders (click chevron to expand/collapse)
- Click on category name to navigate and close drawer

### Navigation Structure
Based on Content_Library_Sitemap.md with the following sections:
- For Me & My Team
- New This Month
- Offers (with January 2026 and February 2026 subfolders)
- Products
- Recipes
- Plan A Party
- Host & Guest Messaging System
- Featured Mealtime Inspiration
- Engagement & Conversation Starters
- Recruiting
- Live Events

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:5174/ to view the prototype.

## Configuration

You can configure the navigation structure depth in `src/config.ts`.

### Navigation Levels
The prototype supports toggling between 2 and 3 levels of navigation:
- **2 Levels (Default)**: Flattens the "Offers" grouping. "January Offers" and "February Offers" appear as top-level categories. This is the preferred structure to keep navigation simple.
- **3 Levels**: Keeps the "Offers" grouping as a top-level category, with "January 2026" and "February 2026" as its children.

To change this, edit `src/config.ts`:
```typescript
export const APP_CONFIG = {
  maxNavLevels: 2, // Set to 2 or 3
};
```

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Responsive design (mobile-first)

## Testing the Navigation

1. **Desktop**: Use the left sidebar to navigate through folders
2. **Mobile**: Tap the bottom "Home" button to open the navigation drawer
3. **Expand/Collapse**: Click only the chevron icon to expand/collapse folders
4. **Navigate**: Click on category names to view that category's content

## Design Notes

- Black and white wireframe aesthetic
- Simple geometric shapes for icons and images
- Focus on navigation pattern validation
- Responsive breakpoint at `md` (768px)
