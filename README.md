# Admin Panel

A modern, production-ready admin panel built with React 18, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Credentials

- **Email:** admin@example.com
- **Password:** admin123

## 📁 Folder Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.tsx   # Button with variants and loading state
│   │   ├── Input.tsx    # Input with icons and validation
│   │   ├── Table.tsx    # Table with pagination
│   │   ├── Modal.tsx    # Modal/dialog component
│   │   ├── Form.tsx     # Form wrapper components
│   │   ├── Card.tsx     # Card and StatCard components
│   │   ├── Badge.tsx    # Status badges
│   │   └── index.ts     # Barrel export
│   └── ui/              # shadcn/ui components
├── layouts/
│   └── AdminLayout.tsx  # Main admin layout with sidebar
├── pages/
│   ├── Login.tsx        # Authentication screen
│   ├── Dashboard.tsx    # Overview with charts
│   ├── FamilyManagement.tsx  # Family CRUD
│   ├── AIFeedback.tsx   # AI response review
│   └── AIControl.tsx    # AI configuration
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
├── services/            # API services (add as needed)
└── index.css            # Design system tokens
```

## 🎨 Theme Configuration

The design system is centralized in two files:

### 1. `src/index.css` - CSS Variables

All colors are defined as HSL values:

```css
:root {
  --primary: 222 47% 20%;           /* Deep slate blue */
  --accent: 173 58% 39%;            /* Teal accent */
  --status-success: 142 71% 45%;    /* Green */
  --status-warning: 38 92% 50%;     /* Orange */
  --status-error: 0 72% 51%;        /* Red */
  /* ... more tokens */
}
```

### 2. `tailwind.config.ts` - Tailwind Integration

Colors are mapped to Tailwind classes:

```typescript
colors: {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  // ...
}
```

### How to Change Theme Colors

1. Open `src/index.css`
2. Modify the HSL values in `:root` section
3. Changes apply globally to all components

**Example - Change primary color to purple:**
```css
--primary: 270 50% 40%;  /* Was: 222 47% 20% */
```

## ➕ Adding New Pages

1. Create a new file in `src/pages/`:

```tsx
// src/pages/NewPage.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/common";

const NewPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          Your content here
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPage;
```

2. Add route in `src/App.tsx`:

```tsx
import NewPage from "./pages/NewPage";

// Inside AdminLayout routes:
<Route path="/new-page" element={<NewPage />} />
```

3. Add navigation in `src/layouts/AdminLayout.tsx`:

```tsx
const navItems = [
  // ... existing items
  { to: "/new-page", icon: <YourIcon />, label: "New Page" },
];
```

## ➕ Adding New Components

1. Create component in `src/components/common/`:

```tsx
// src/components/common/MyComponent.tsx
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const myComponentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-styles",
      // Add more variants
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const MyComponent = ({ className, variant, ...props }) => (
  <div className={cn(myComponentVariants({ variant }), className)} {...props} />
);
```

2. Export from `src/components/common/index.ts`:

```tsx
export { MyComponent } from "./MyComponent";
```

3. Use in pages:

```tsx
import { MyComponent } from "@/components/common";
```

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component primitives
- **Radix UI** - Accessible components
- **React Router** - Navigation
- **Recharts** - Charts and graphs
- **Lucide React** - Icons
- **class-variance-authority** - Component variants

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Dark mode ready (tokens configured)
- ✅ Accessible components (Radix UI)
- ✅ Type-safe with TypeScript
- ✅ Centralized theming
- ✅ Reusable component library
- ✅ Clean folder structure
