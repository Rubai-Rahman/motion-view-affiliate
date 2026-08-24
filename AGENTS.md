# Motion View Affiliate Program - Development Guide

## Project Overview

This is a Next.js 16 affiliate program application built with modern React patterns and best practices.

## Design Patterns Implemented

### 1. React Compound UI Pattern

The navigation components follow the Compound UI pattern, allowing flexible composition of related components:

**Location:** `src/components/navigation/`

- **Sidebar Compound Components:**
  - `Sidebar` - Main container with state management
  - `SidebarHeader` - Header section
  - `SidebarContent` - Scrollable content area
  - `SidebarFooter` - Footer section
  - `SidebarLogo` - Logo with icon support
  - `SidebarNav` - Navigation container
  - `SidebarNavItem` - Individual navigation items
  - `SidebarOverlay` - Mobile overlay

**Usage Example:**

```tsx
<Sidebar state={mobileOpen ? 'open' : 'closed'}>
  <SidebarHeader>
    <SidebarLogo icon={logoIcon}>
      <h1>Motion View</h1>
    </SidebarLogo>
  </SidebarHeader>
  <SidebarContent>
    <SidebarNav>
      <SidebarNavItem isActive>Dashboard</SidebarNavItem>
    </SidebarNav>
  </SidebarContent>
  <SidebarFooter>{/* User info */}</SidebarFooter>
</Sidebar>
```

### 2. Container/Presentational Pattern

Components are separated into container (logic) and presentational (UI) components:

**Auth Components:**

- **Container:** `src/components/auth/login-container.tsx`, `signup-container.tsx`
- **Presentational:** `src/components/auth/auth-card.tsx`

**Navigation Components:**

- **Container:** `src/components/navigation/dashboard-sidebar-container.tsx`
- **Presentational:** `src/components/navigation/sidebar.tsx`

**Benefits:**

- Separation of concerns
- Reusable presentational components
- Easier testing
- Better maintainability

## Component Structure

### Navigation Folder (`src/components/navigation/`)

```
navigation/
├── index.ts                    # Exports
├── sidebar.tsx                 # Compound UI components
└── dashboard-sidebar-container.tsx  # Container component
```

### Auth Folder (`src/components/auth/`)

```
auth/
├── index.ts                    # Exports
├── auth-card.tsx               # Presentational auth card
├── login-container.tsx         # Login container
└── signup-container.tsx        # Signup container
```

## Fixed Issues

### 1. Tailwind CSS v4 Gradient Syntax

**Issue:** `bg-linear-to-*` deprecated in Tailwind v4
**Fix:** Changed to `-linear-to-*` across all files
**Files Affected:** All page files and components with gradients

### 2. TypeScript Error in layout.tsx

**Issue:** Invalid `LayoutProps<'/'>` type
**Fix:** Changed to standard `{ children: React.ReactNode }` type

## Project Structure

### Pages

- `/` - Landing page
- `/auth/login` - Login page (Container pattern)
- `/auth/signup` - Signup page (Container pattern)
- `/auth/forgot-password` - Password reset
- `/dashboard` - Main dashboard
- `/dashboard/leaderboard` - Affiliate rankings
- `/dashboard/payment-report` - Payment history
- `/dashboard/reports` - Performance analytics
- `/dashboard/terms` - Terms & conditions
- `/dashboard/account` - Account settings
- `/dashboard/help` - Help & support
- `/dashboard/affiliate-link` - Link management

### Key Technologies

- **Next.js 16** - React framework
- **React Query** - Data fetching and state management
- **Next Themes** - Dark mode support
- **Tailwind CSS v4** - Styling
- **Shadcn UI** - Component library
- **TypeScript** - Type safety

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Run linter
pnpm lint
```

## UI Features

- ✅ Stunning gradient designs
- ✅ Full dark mode support
- ✅ Responsive design
- ✅ Modern card-based layouts
- ✅ Interactive components
- ✅ Data visualization
- ✅ Form validation
- ✅ Compound UI patterns
- ✅ Container/Presentational separation

## Best Practices

1. **Use Compound UI** for complex, related components
2. **Separate Container/Presentational** components
3. **Follow TypeScript** strict typing
4. **Use React Query** for data fetching
5. **Implement dark mode** with next-themes
6. **Use shadcn/ui** for consistent UI components
7. **Follow Tailwind v4** syntax for styling
