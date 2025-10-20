# Architecture Documentation

**Version:** 2.0  
**Last Updated:** 2025-01-20  
**Status:** Phase 1 Documentation Foundation Complete

---

## 📚 Documentation Index

### Core Documentation
- [Project Requirements Document (PRD)](/docs/PRD.md) — Project objectives, scope, success metrics
- [Master Execution Plan](/docs/tasks.md) — Complete task breakdown and timeline
- [Content Mapping](/docs/content-map.md) — Niotech → VZ content replacement map

### Backend Documentation
- [Backend System Overview](/docs/backend.md) — System components and technology stack
- [Backend Architecture](/docs/backend-architecture.md) — Database schema, RLS policies, Edge Functions
- [Wizard Logic](/docs/wizard-logic.md) — Decision tree structure and conditional logic
- [API Reference](/docs/api-reference.md) — Edge Functions and REST endpoints
- [Document Reference Index](/docs/DocumentReferenceIndex.md) — Complete document type registry

### User Guides
- [Admin User Guide](/docs/admin-user-guide.md) — Admin panel usage and workflows

### Style Guides
- [Frontend Style Guide](/docs/StyleGuideUniformity.md) — Niotech template standards
- [Admin Style Guide](/docs/AdminStyleGuideUniformity.md) — Darkone admin standards

---

## Frontend Standards

For complete style guide and component documentation, see [Style Guide Uniformity](/docs/StyleGuideUniformity.md).

---

## Backend Standards

For complete admin style guide and component documentation, see [Admin Style Guide Uniformity](/docs/AdminStyleGuideUniformity.md).

### Admin Interface Overview
- **Layout:** AdminLayout with Darkone Bootstrap 5 theme
- **Components:** VerticalNavigationBar (Sidebar), TopNavigationBar (Topbar with search/theme toggle), Footer
- **Theme System:** Dual light/dark mode controlled via `data-bs-theme` attribute
- **Primary Color:** #7e67fe (Purple)
- **Typography:** Play, sans-serif
- **Sidebar:** 250px (full) / 75px (collapsed), fixed left positioning
- **Topbar:** 70px height, sticky positioning, responsive search bar
- **Footer:** 60px height, animated gradient text effect

---

## Header Position & Spacing

### Current Configuration
- **Layout:** Header4 with `header_style_2` variant
- **Height:** 106px (desktop), 90px (mobile/tablet)
- **Top Position:** 40px from viewport top (absolute positioning)
- **Sticky Behavior:** Slides up on scroll down, slides back down on scroll up
- **Background:** White with rounded corner overlay effect

### Responsive Breakpoints
- **Desktop (≥1200px):** Full header with horizontal padding
- **Tablet (768-1199px):** Adjusted padding, same height
- **Mobile (<768px):** Reduced height (90px), hamburger menu

### Alignment Strategy
- Logo: Left-aligned, vertically centered
- Navigation: Absolutely positioned center (50% left, 50% top with transform)
- CTA Button: Right-aligned with search icon

### Phase Adjustment Note
**Header Position Fix** - Removed `header-area-5` class from Header4.jsx to restore default `top: 40px` positioning, matching the original Niotech template alignment.

---

## Routing Structure

### Active Routes (Layout4)
All routes use `Layout4` as the primary layout wrapper:

```
/ → Home (index)
/about → About Page
/service → Services Page
/service/service-details → Service Details Page
/faq → FAQ Page
/blog → Blog Page
/blog/blog-details → Blog Details Page
/contact → Contact Page
```

### Admin Routes (Protected)
```
/admin/auth/sign-in → Sign In Page
/admin/auth/sign-up → Sign Up Page
/admin/dashboard → Dashboard (Protected)
```

---

## Layout System

### Layout4
- **Components:** Header4 + Footer + Content Area
- **Used By:** All public-facing pages
- **Characteristics:**
  - Sticky header with scroll behavior
  - Unified footer across all pages
  - Consistent spacing and alignment

---

## Component Organization

### Core Components (Active)
- **Header:** `Header4.jsx`, `Nav.jsx`, `DropDown.jsx`
- **Footer:** `Footer.jsx`
- **Hero:** `HeroBanner1.jsx`
- **About:** `About1.jsx`
- **Features:** `Feature1.jsx`, `Feature2.jsx`
- **Services:** `Service1.jsx`, `Service2.jsx`, `ServiceDetails.jsx`
- **Blog:** `Blog1.jsx`, `BlogStandard.jsx`, `BlogDetails.jsx`
- **FAQ:** `Faq1.jsx`
- **CTA:** `Cta1.jsx`
- **Brand:** `Brand1.jsx`
- **Counter:** `Counter1.jsx`
- **Testimonial:** `Testimonial.jsx`
- **HowWork:** `HowWork.jsx`
- **Choose:** `Choose1.jsx`

### Removed Components
- Team components (Team1, Team2, TeamDetails)
- Pricing components (Pricing1)
- Project components (Project1, Project2, ProjectDetails)
- Unused blog variants (BlogLeftSidebar)
- Unused layouts (Main, Layout2, Layout3)

---

## Data Structure

### Active JSON Files
- `blog.json` - Blog posts data
- `services1.json` - Services data
- `faq1.json`, `faq2.json` - FAQ data
- `counter.json` - Counter statistics
- `brand1.json` - Brand logos
- `feature1.json` - Feature list
- `testimonial1.json`, `testimonial2.json` - Client testimonials
- `work.json` - How it works steps

### Removed JSON Files
- `team1.json`
- `project1.json`
- `project2.json`

---

## Navigation Structure

### Simplified Navigation (No Dropdowns)
```
Home | About | Services | Blog | FAQ | Contact
```

All navigation links are top-level only. Subpages (like Service Details, Blog Details) are accessed via contextual links within their respective parent pages.

---

## Authentication Integration

### Supabase Auth
- **Provider:** Lovable Cloud (Supabase backend)
- **Protected Routes:** `/admin/dashboard` and future admin pages
- **Auth Components:** `ProtectedRoute.tsx`, `AuthProvider` from `@/integrations/supabase/auth`
- **Auth Pages:** Sign In, Sign Up

### Auth Flow
1. User navigates to protected route
2. `ProtectedRoute` checks auth state via `useAuth()` hook
3. If not authenticated → redirect to `/admin/auth/sign-in`
4. If authenticated → render protected content

---

## Performance Considerations

### Code Splitting
- Vite configured with manual chunks disabled for optimal bundle size
- Components loaded on-demand via React Router

### Asset Optimization
- Images stored in `/public/assets/images/`
- Slick carousel for optimized image sliders
- Bootstrap Icons for consistent iconography

---

## Development Status

### ✅ Phase 1: Documentation Foundation (Complete)
- PRD.md created with full project scope
- tasks.md created with complete task breakdown
- backend.md created with system overview
- backend-architecture.md created with database schema
- wizard-logic.md created with decision tree
- api-reference.md created with endpoint documentation
- admin-user-guide.md created with user workflows
- DocumentReferenceIndex.md created with document registry
- content-map.md created with content mapping

**Next Phase:** Phase 1.2 — Home Page Content Replacement

---

## Future Enhancements
- Dynamic data integration with Supabase
- CMS-like content management
- Advanced search functionality
- User dashboard features
- Multi-language interface (i18n)
- SMS notifications
- Payment processing integration
