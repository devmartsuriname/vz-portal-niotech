# 🧭 VZ Juspol Portal — Vreemdelingenzaken Portal 2.0

**Version:** 1.0.0  
**Author:** Devmart Suriname  
**Last Updated:** 2025-01-26

---

## 📘 Project Overview

The **VZ Juspol Portal** is a comprehensive full-stack web application designed for the Surinamese Immigration and Naturalization Service (Vreemdelingenzaken). The system provides:

- **Public-Facing Website** (Frontend) — Information, services, instructions, and document resources
- **Admin Dashboard** (Backend) — Secure portal for staff to manage applications, documents, and user data
- **Decision-Tree Wizard** — Interactive guided form system for application submissions

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18 + Vite
- **UI Library:** React Bootstrap + Bootstrap 5
- **Routing:** React Router DOM v6
- **Styling:** Custom CSS + Bootstrap
- **Icons:** Bootstrap Icons

### Backend
- **Framework:** React + TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Functions:** Supabase Edge Functions

### Tooling
- **Package Manager:** npm
- **Build Tool:** Vite
- **Linting:** ESLint
- **Version Control:** Git

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd vz-juspol-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - The project uses Lovable Cloud (Supabase) for backend services
   - Environment variables are auto-configured in `.env`
   - Required variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`

4. **Run development server:**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
vz-juspol-portal/
├── src/
│   ├── Components/          # Reusable UI components (Frontend)
│   ├── Pages/               # Page-level components (Frontend)
│   ├── Layout/              # Layout wrappers (Frontend)
│   ├── Data/                # Static JSON data files
│   ├── Routes/              # Routing configuration
│   ├── admin/               # Admin dashboard (Backend)
│   │   ├── components/      # Admin-specific components
│   │   ├── pages/           # Admin pages (auth, dashboard)
│   │   ├── layout/          # Admin layout structure
│   │   ├── assets/          # Admin-specific assets
│   │   └── helpers/         # Utility functions
│   ├── components/
│   │   ├── auth/            # Authentication components
│   │   └── common/          # Shared common components
│   ├── integrations/        # Supabase integration
│   └── assets/              # Global assets (CSS, images)
├── public/                  # Static public assets
├── docs/                    # Project documentation
│   ├── PRD.md               # Product Requirements Document
│   ├── tasks.md             # Task breakdown and tracking
│   ├── backend-architecture.md
│   ├── wizard-logic.md
│   └── content-map.md
└── supabase/                # Supabase configuration
    ├── functions/           # Edge functions
    └── migrations/          # Database migrations
```

---

## 🌐 Application Routes

### Public Frontend Routes
- `/` — Homepage
- `/about` — About VZ Department
- `/service` — Services Overview
- `/faq` — Frequently Asked Questions
- `/contact` — Contact Information
- `/instructies` — Application Instructions
- `/documenten-lijsten` — Required Documents Lists
- `/aanvraag-indienen` — Submit Application
- `/vergunningen` — Permit Information
- `/overzicht` — Application Status Overview
- `/feedback` — User Feedback

### Admin Backend Routes
- `/admin/auth/sign-in` — Admin Login
- `/admin/auth/sign-up` — Admin Registration
- `/admin/dashboard` — Admin Dashboard (Protected)

---

## 🔐 Authentication & Authorization

The system uses **Supabase Authentication** with:
- Email/password authentication
- Auto-confirm email signups (enabled for development)
- Protected routes for admin access
- Row-Level Security (RLS) policies on database tables

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs/` directory:

- **[PRD.md](./docs/PRD.md)** — Product Requirements & Objectives
- **[tasks.md](./docs/tasks.md)** — Development Task Breakdown
- **[backend-architecture.md](./docs/backend-architecture.md)** — Database Schema & RLS
- **[wizard-logic.md](./docs/wizard-logic.md)** — Decision-Tree Logic
- **[content-map.md](./docs/content-map.md)** — Content Mapping Reference
- **[frontend-cleanup.md](./docs/frontend-cleanup.md)** — Frontend Optimization Log

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] All public pages load without errors
- [ ] Navigation between routes works correctly
- [ ] Forms validate and submit properly
- [ ] Admin authentication flow works
- [ ] Dashboard loads with correct branding
- [ ] Dark mode compatibility (admin)
- [ ] Responsive design on mobile/tablet/desktop

### Running Tests
```bash
# Lint code
npm run lint

# Build test
npm run build
```

---

## 🚢 Deployment

The application can be deployed using:
- **Frontend:** Vercel, Netlify, or Lovable hosting
- **Backend:** Supabase (automatic deployment via Lovable Cloud)

Deploy command:
```bash
npm run build
# Upload dist/ folder to hosting service
```

---

## 🤝 Contributing

1. Follow the [12 Golden Vibe Coding Rules](./docs/coding-guidelines.md)
2. Create a restore point before major changes
3. Update documentation for all modifications
4. Test thoroughly before committing
5. Use descriptive commit messages

---

## 📋 Version History

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

---

## 📞 Support & Contact

**Developer:** Devmart Suriname  
**Project Lead:** VZ Juspol Department  
**Documentation:** `/docs/` directory

---

## 📄 License

Internal project — All rights reserved by Surinamese Government / VZ Juspol Department.

---

**🚀 Current Status:** Phase 1 Complete — Ready for Phase 2 Backend Integration
