# 📋 Changelog — VZ Juspol Portal 2.0

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2025-10-22

### ✅ Phase 4.1: QA & Documentation Update — COMPLETE

#### Fixed
- **Critical React Instance Bug:**
  - Resolved `Cannot read properties of null (reading 'useState')` error in wizard
  - Implemented React instance detection diagnostic in `src/utils/assertSingleReact.ts`
  - Added Vite dedupe configuration in `vite.config.ts`
  - Gated diagnostic logging behind `VITE_DIAG_LOGS` environment variable

#### Added
- **Documentation:**
  - Created `/docs/CHANGELOG.md` (this file)
  - Created `/docs/admin-user-guide.md` with comprehensive admin panel guide
  - Created `/docs/QA_Report.md` with structured test scenarios
  - Updated `/docs/tasks.md` with corrected completion statistics (80% complete)
  - Updated `/docs/qa-testing-checklist.md` with console warning documentation

- **Console Management:**
  - Added environment-controlled diagnostic logging system
  - Documented expected vs. critical console warnings
  - Improved developer experience with cleaner console output

#### Changed
- **Task Tracking:**
  - Updated Phase 1 completion: 6% → 100%
  - Updated Phase 2 completion: 0% → 100%
  - Updated Phase 3 completion: 0% → 100%
  - Updated Phase 4 progress: 0% → 70%
  - Total project completion: 0% → 80%

---

## [1.0.0] - 2025-01-26

### ✅ Phase 1-3: Initial System Implementation — COMPLETE

#### Added
- **Database Architecture (Phase 2):**
  - 16 production tables with full RLS policies
  - 4 database functions (`notify_admins_new_submission`, `log_submission_status_change`, `update_updated_at_column`, `has_role`)
  - 2 storage buckets (`submission-files`, `application-forms`)
  - Enum type `app_role` for role management
  - Complete Row Level Security on all tables

- **Wizard System (Phase 3):**
  - 31 active wizard rules with conditional navigation
  - 100 document type mappings across application types
  - Decision-tree logic implementation
  - Custom hooks: `useWizardState.ts`, `useWizardRules.js`
  - Multi-step form with local storage persistence

- **Admin Dashboard (Phase 4 — Partial):**
  - Dashboard with statistics cards and ApexCharts integration
  - Submissions management module with filtering and search
  - Vergunningen (Permits) management system
  - Email templates CRUD interface
  - Content management for Pages, FAQs, and Announcements
  - Settings module with system configuration
  - User management with role-based access control
  - Wizard rules configuration interface
  - Darkone theme integration (#7e67fe purple accent)

- **Edge Functions:**
  - `send-submission-notification` — Email alerts for new submissions
  - `update-submission-status` — Status change workflow
  - `validate-file-upload` — Document verification
  - `wizard-logic` — Server-side decision tree processing

- **Authentication & Security:**
  - Supabase Auth integration
  - Protected routes with `ProtectedRoute.tsx`
  - Role-based access control (admin, moderator, user)
  - RLS policies on all sensitive tables
  - Activity logging system

#### Changed
- **Frontend Structure:**
  - Replaced Niotech demo content with VZ Juspol official content
  - Updated navigation menus and routing
  - Integrated Layout4 as unified layout wrapper
  - Updated Footer with correct contact information and office hours
  - Changed admin dashboard title from "Darkone" to "VZ Juspol Admin Portal"

- **Content Mapping:**
  - Replaced all placeholder text with official VZ content
  - Updated services catalog with government application types
  - Integrated real FAQ items and instructional content

#### Removed
- **Demo Cleanup:**
  - Deleted `Darkone-React_v1.0/` reference template
  - Deleted `niotech-react-template/` reference template
  - Removed 9 demo pages and 13 unused components
  - Removed 3 demo layouts (kept only Layout4)
  - Eliminated demo-specific data files

---

## [0.1.0] - 2025-01-20

### Initial Project Setup

#### Added
- **Project Foundation:**
  - React 18.3.1 + Vite build system
  - TypeScript configuration
  - Tailwind CSS + Bootstrap 5.3.8 hybrid styling
  - Niotech frontend template integration
  - Darkone admin template integration
  
- **Documentation:**
  - `/docs/PRD.md` — Product Requirements Document
  - `/docs/tasks.md` — Task breakdown and tracking
  - `/docs/backend-architecture.md` — Database schema design
  - `/docs/wizard-logic.md` — Decision tree documentation
  - `/docs/content-map.md` — Content reference mapping
  - `/docs/testing-guide.md` — Phase 2.2 testing procedures
  - `/docs/accessibility-testing-guide.md` — WCAG compliance guide
  - `/docs/qa-testing-checklist.md` — Comprehensive QA checklist

- **Basic Routes:**
  - Home, About, Services, FAQ, Contact pages
  - Wizard placeholder
  - Admin auth (sign-in, sign-up)
  - Protected admin routes

---

## 🚀 Upcoming Features

### Phase 4.4 — Admin Enhancements (Planned)
- Reports module with analytics
- CSV export functionality
- DocumentPreviewModal component
- Advanced filtering and saved filters

### Phase 5 — QA & Deployment (Planned)
- Cross-browser compatibility testing
- Performance optimization (Lighthouse ≥90)
- Accessibility audit (WCAG 2.1 AA compliance)
- Production deployment
- Post-deployment verification

---

## 📝 Development Notes

### Version Numbering
- **Major (X.0.0):** Breaking changes or major milestones (Phase completions)
- **Minor (1.X.0):** New features and functionality (Sub-phase completions)
- **Patch (1.0.X):** Bug fixes and minor improvements

### Commit Message Format
```
[CATEGORY] Brief description

- Detailed change 1
- Detailed change 2

References: #task-id, /docs/file.md
```

**Categories:** `FEAT`, `FIX`, `DOCS`, `STYLE`, `REFACTOR`, `TEST`, `CHORE`

---

**Last Updated:** 2025-10-22  
**Current Version:** 1.1.0  
**Status:** ✅ Phase 4.1 Complete — Ready for Phase 4.4
