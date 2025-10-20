# VZ2 Portal - Niotech Template Integration

## 🎯 Project Overview
Full-stack portal application using the **Niotech React Template** for the frontend with planned Darkone backend integration.

**Repository**: https://github.com/devmartsuriname/vz2-portal-niotech

## ✅ Integration Status
- **Phase 1 Complete**: Niotech React Template fully integrated (1:1 parity achieved)
- **Phase 2 Pending**: Darkone Backend Integration (awaiting instructions)

## 🚀 Quick Start

```sh
# Clone the repository
git clone https://github.com/devmartsuriname/vz2-portal-niotech.git

# Navigate to project
cd vz2-portal-niotech

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
├── src/
│   ├── Components/      # React components (About, Blog, Brand, etc.)
│   ├── Pages/          # Page components (Home, About, Services, etc.)
│   ├── Layout/         # Layout wrappers (Main, Layout2-4)
│   ├── Routes/         # Routing configuration
│   ├── Data/           # JSON data files
│   └── assets/         # CSS and assets (main.css)
├── public/
│   └── assets/         # Static images, icons, logos
├── docs/               # Documentation
│   ├── template-integration.md
│   ├── architecture.md
│   └── backend.md
└── README.md
```

## 🎨 Features
- ✅ Fully responsive design
- ✅ Multiple home page variants (3 layouts)
- ✅ Complete blog system with sidebar options
- ✅ Project portfolio with 2 layout styles
- ✅ Team showcase with detail pages
- ✅ Pricing tables
- ✅ Contact forms and info
- ✅ FAQ sections with accordions
- ✅ Animated components (WOW.js)
- ✅ Mobile navigation
- ✅ Search functionality

## 📄 Available Pages
- **Home**: 3 variants (`/`, `/home2`, `/home3`)
- **About**: `/about`
- **Services**: `/service`, `/service/service-details`
- **Projects**: `/project`, `/project2`, `/project/project-details`
- **Team**: `/team`, `/team/team-details`
- **Blog**: `/blog`, `/blog-sidebar`, `/blog-left-sidebar`, `/blog/blog-details`
- **Other**: `/pricing`, `/faq`, `/contact`

## 🛠️ Tech Stack

### Current (Phase 1)
- **Framework**: React 18.3.1
- **Build Tool**: Vite
- **Routing**: React Router DOM 6.30.1
- **Styling**: Bootstrap 5+ & Custom CSS
- **Icons**: Bootstrap Icons
- **Carousel**: Slick Carousel / React Slick
- **Animations**: WOW.js (CSS-based)
- **Content**: JSON-based data management

### Planned (Phase 2)
- Darkone Admin Dashboard
- Backend API (TBD)
- Database (TBD)
- Authentication System (TBD)

## 📚 Documentation
- **[Template Integration](docs/template-integration.md)** - Complete integration details and verification
- **[Architecture](docs/architecture.md)** - System architecture and component structure
- **[Backend Plan](docs/backend.md)** - Backend integration roadmap (Darkone)

## 🎨 Design System
The template includes a comprehensive CSS design system:
- Custom CSS Variables for theming
- Typography (Urbanist & Nunito fonts from Google Fonts)
- Component-based styling
- Responsive breakpoints (mobile-first)
- Animation utilities

### Color Palette
- **Primary**: `#7444FD` (Purple)
- **Title**: `#282C32` (Dark Gray)
- **Text**: `#858585` (Gray)
- **Border**: `#E6E6E6` (Light Gray)
- **Background**: Multiple variations

## 🔧 Development

### Local Development
```bash
npm run dev
```
Access at: http://localhost:8080

### Production Build
```bash
npm run build
npm run preview
```

### Editing
- **Via Lovable**: Visit [project page](https://lovable.dev/projects/438764f3-e6e9-4438-9264-d73d4963c64c)
- **Local IDE**: Clone, edit, and push changes
- **GitHub**: Direct file editing or Codespaces

## 🚀 Deployment

Simply open [Lovable](https://lovable.dev/projects/438764f3-e6e9-4438-9264-d73d4963c64c) and click on Share -> Publish.

### Custom Domain

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📋 Verification Checklist

### ✅ Completed
- [x] All Niotech template files transferred
- [x] Folder structure matches original template  
- [x] All imports and paths functional
- [x] Assets (images, icons, fonts) loading correctly
- [x] Routing system configured properly
- [x] CSS properly imported
- [x] Application builds without errors
- [x] All 18 pages accessible and rendering
- [x] Navigation functional
- [x] Mobile responsive design working
- [x] Documentation created

### ⏳ Pending (Phase 2)
- [ ] Darkone backend integration
- [ ] Database setup
- [ ] Authentication system
- [ ] Admin dashboard
- [ ] API endpoints

## 📝 Next Steps
Ready for **Phase 2: Darkone Backend Integration** when you provide further instructions.

## 📄 License
Template by Themeservices

---

**Integration Completed**: 2025-10-20  
**Status**: ✅ Phase 1 Complete - Full 1:1 Parity Achieved  
**Commit**: `feat: integrate Niotech React frontend 1:1 — full parity achieved`
