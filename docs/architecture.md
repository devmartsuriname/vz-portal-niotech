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
Reusable React components organized by feature:
- **About**: About section variations
- **Blog**: Blog cards and listing components
- **Brand**: Brand/logo showcases
- **Card**: Reusable card components (Feature, Pricing, Project, Team)
- **Choose**: "Why Choose Us" sections
- **Common**: Shared utilities (BreadCumb, SectionTitle, etc.)
- **ContactInfo**: Contact forms and information
- **Counter**: Animated counter components
- **Cta**: Call-to-action sections
- **Faq**: FAQ accordion components
- **Feature**: Feature showcases
- **Footer**: Footer component
- **Header**: Header with navigation (4 variants)
- **HeroBanner**: Hero/banner sections
- **HowWork**: Process/workflow sections
- **Pricing**: Pricing table components
- **Project**: Project portfolio components
- **Services**: Service cards and sections
- **Team**: Team member cards
- **Testimonial**: Testimonial sliders
- **VideoModal**: Video popup modals

#### `/src/Pages`
Page-level components (one per route):
- Home variations (Home, Home2, Home3)
- About, Services, Pricing
- Projects (Project1, Project2, ProjectDetails)
- Team (Team, TeamDetails)
- Blog variations (Blog, BlogStandard, BlogLeft, BlogDetails)
- Contact, FAQ

#### `/src/Layout`
Layout wrapper components:
- **Main.jsx**: Default layout (Header1 + Footer)
- **Layout2.jsx**: Alternative layout (Header2 + Footer)
- **Layout3.jsx**: Third layout variant (Header3 + Footer)
- **Layout4.jsx**: Fourth layout variant (Header4 + Footer)

#### `/src/Routes`
- **Routes.jsx**: Centralized routing configuration using React Router

#### `/src/Data`
JSON files for content management:
- Enables easy content updates without code changes
- Supports multiple data variations (e.g., brand1, hero, testimonial1/2)

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

## Routing Structure

### Route Organization
```javascript
Main Routes (Layout4):
- /about
- /service, /service/service-details
- /pricing
- /project, /project2, /project/project-details
- /team, /team/team-details
- /faq
- /blog, /blog-sidebar, /blog-left-sidebar, /blog/blog-details
- /contact

Home Variants:
- / (Main layout with Home)
- /home2 (Layout2 with Home2)
- /home3 (Layout3 with Home3)
```

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

**Architecture Version**: 1.0
**Last Updated**: 2025-10-20
