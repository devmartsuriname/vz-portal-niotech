# Project Architecture

## Overview
This project uses the **Niotech React Template** as the frontend foundation, providing a modern, responsive SaaS/Software landing page experience.

## Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite
- **Routing**: React Router DOM 6.30.1
- **Styling**: Bootstrap 5+ & Custom CSS
- **Icons**: Bootstrap Icons
- **Carousel**: Slick Carousel
- **Animations**: WOW.js (CSS-based)

### Architecture Pattern
The project follows a **component-based architecture** with clear separation of concerns:

```
Component Architecture
├── Pages (Route Components)
│   └── Composition of multiple feature components
├── Components (Feature Components)
│   └── Reusable UI elements
├── Layouts (Layout Wrappers)
│   └── Header, Footer, and page structure
└── Data (JSON Configuration)
    └── Content management via JSON files
```

## Directory Structure

### `/src`
Main application source code

#### `/src/Components`
Reusable React components organized by feature - **Production Components**:
- **About**: About section variations
- **Blog**: Blog cards and listing components (BlogStandard retained)
- **Brand**: Brand/logo showcases
- **Card**: Reusable card components (Feature cards)
- **Choose**: "Why Choose Us" sections
- **Common**: Shared utilities (BreadCumb, SectionTitle, etc.)
- **ContactInfo**: Contact forms and information
- **Counter**: Animated counter components
- **Cta**: Call-to-action sections
- **Faq**: FAQ accordion components
- **Feature**: Feature showcases
- **Footer**: Footer component
- **Header**: Header with navigation (Header4 used)
- **HeroBanner**: Hero/banner sections
- **HowWork**: Process/workflow sections
- **Services**: Service cards and sections
- **Testimonial**: Testimonial sliders
- **VideoModal**: Video popup modals

**Removed During Cleanup**:
- ~~Team components~~ (Team1, Team2, TeamDetails)
- ~~Pricing components~~ (Pricing1-4, PricingCard)
- ~~Project components~~ (Project1, Project2, ProjectCard, ProjectDetails)
- ~~Blog variants~~ (BlogLeftSidebar)

#### `/src/Pages`
Page-level components (one per route) - **Production Only**:
- **Home.jsx** - Main landing page
- **AboutPage.jsx** - About page
- **ServicePage.jsx** - Services listing
- **ServiceDetailPage.jsx** - Individual service details
- **FaqPage.jsx** - FAQ page
- **BlogStandardPage.jsx** - Blog with sidebar
- **BlogDetaillsPage.jsx** - Blog post details
- **ContactPage.jsx** - Contact page

**Note**: Demo pages (Home2, Home3, Team, Pricing, Projects) removed during cleanup.

#### `/src/Layout`
Layout wrapper components:
- **Layout4.jsx**: Production layout (Header4 + Footer) - **Used for all public routes**

**Note**: Main, Layout2, and Layout3 removed during cleanup. System now uses single layout.

#### `/src/Routes`
- **Routes.jsx**: Centralized routing configuration using React Router

#### `/src/Data`
JSON files for content management - **Production Data**:
- ✅ `blog.json` - Blog posts
- ✅ `services1.json` - Service offerings
- ✅ `faq1.json`, `faq2.json` - FAQ content
- ✅ `counter.json` - Statistics
- ✅ `brand1.json` - Partner logos
- ✅ `feature1.json` - Features
- ✅ `testimonial1.json`, `testimonial2.json` - Testimonials
- ✅ `work.json` - How it works

**Removed**: ~~team1.json, project1.json, project2.json~~

#### `/src/assets`
- **main.css**: Complete Niotech design system (11,000+ lines)

### `/public`
Static assets served directly:
- **assets/images**: All images, icons, logos, shapes, backgrounds

## Component Communication

### Props-Based
Components receive configuration via props:
```jsx
<About1
  img1="/path/to/image"
  subtitle="About Our App"
  title="Section Title"
  content="Description text"
  FeatureList={[...]}
  btnname="Button Text"
  btnurl="/link"
/>
```

### Data-Driven
Many components map over JSON data:
```jsx
import data from '../../Data/services1.json';

{data.map((item, index) => (
  <ServiceCard key={index} {...item} />
))}
```

## Routing Structure (Updated - Post Cleanup)

### Production Route Organization
```javascript
Public Routes (Layout4 only):
├── / → Home (index route)
├── /about → About
├── /service → Services
├── /service/service-details → Service Details
├── /faq → FAQ
├── /blog → Blog (with sidebar)
├── /blog/blog-details → Blog Details
└── /contact → Contact

Admin Routes (AdminLayout - separate):
├── /admin → Redirect to dashboard
├── /admin/auth/sign-in → Admin Sign In
├── /admin/auth/sign-up → Admin Sign Up
└── /admin/dashboard → Admin Dashboard
```

**Note**: Demo routes (home2, home3, team, pricing, projects) have been removed. See `docs/frontend-cleanup.md` for details.

## Styling Architecture

### Design System (main.css)
The template uses a comprehensive CSS design system:

#### Variables
```css
:root {
  --theme: #7444FD;
  --title: #282C32;
  --text: #858585;
  --border: #E6E6E6;
  /* ...and many more */
}
```

#### Component Styles
- Modular CSS classes for each component
- Responsive breakpoints for mobile-first design
- Animation utilities for smooth interactions
- Utility classes for spacing, colors, typography

#### Typography
- **Primary Font**: Urbanist (Google Fonts)
- **Secondary Font**: Nunito (Google Fonts)
- Defined heading hierarchy (h1-h6)
- Body text and utility text styles

## State Management
Currently uses **component-level state** with React hooks:
- `useState` for local component state
- `useEffect` for side effects (animations, scroll listeners)
- Props drilling for parent-child communication

## Build Configuration

### Vite Setup
```javascript
{
  server: { port: 8080 },
  plugins: [react(), componentTagger()],
  resolve: {
    alias: { "@": "./src" }
  }
}
```

### Entry Point
**index.html** → **src/main.jsx** → **RouterProvider** → Page Components

## Performance Considerations

### Code Splitting
- React Router handles route-based code splitting
- Components loaded on-demand per route

### Asset Optimization
- Images served from `/public` for optimal caching
- CSS bundled and minified in production

### Animation Performance
- CSS-based animations (WOW.js) for smooth 60fps
- Lazy loading for images and heavy components

## Responsive Design

### Breakpoints
```css
@media (max-width: 575px)  /* Mobile */
@media (max-width: 767px)  /* Small tablets */
@media (max-width: 991px)  /* Tablets */
@media (max-width: 1199px) /* Small desktop */
```

### Mobile Navigation
- Hamburger menu toggle
- Slide-out navigation drawer
- Touch-friendly interactions

## Extensibility

### Adding New Pages
1. Create component in `/src/Pages`
2. Add route in `/src/Routes/Routes.jsx`
3. Add navigation link in `/src/Components/Header/Nav.jsx`

### Adding New Components
1. Create in appropriate `/src/Components` subdirectory
2. Import and use in page components
3. Add any required JSON data to `/src/Data`

### Customizing Styles
- Modify CSS variables in `main.css` for global theme changes
- Override component-specific styles in respective CSS sections
- Use utility classes for quick adjustments

---

## Recent Updates

### Frontend Cleanup (January 2025)
✅ **Consolidated to single layout** (Layout4 only)  
✅ **Removed demo content** (Home2, Home3, Team, Pricing, Projects)  
✅ **Streamlined navigation** (8 production pages)  
✅ **Optimized routing** (eliminated duplicate routes)  
✅ **Cleaned codebase** (removed 25+ unused files)

📄 **Full cleanup details**: See `docs/frontend-cleanup.md`

---

**Architecture Version**: 2.0 (Post-Cleanup)  
**Last Updated**: 2025-01 (Cleanup Complete)
