# 📋 Changelog — VZ Juspol Portal

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.2] - 2025-10-23

### ✅ Phase 7: Hostinger SMTP Migration — COMPLETE

#### Added
- **SMTP Integration:**
  - Hostinger SMTP as primary email provider
  - Dual-provider architecture (SMTP + Resend fallback)
  - Supabase Vault encryption for SMTP passwords
  - Edge Function: `test-smtp-connection` for SMTP validation
  - Database functions: `store_smtp_password()`, `get_smtp_password()`

- **Admin UI Enhancements:**
  - Email provider toggle (Hostinger SMTP / Resend API)
  - SMTP configuration fields with validation
  - Password masking and secure storage
  - Helper tooltips for all email settings
  - Test email functionality for both providers

- **Email System:**
  - Universal `send-email` Edge Function with automatic fallback
  - Dynamic wizard result routing via `wizard_result_recipient`
  - HTML + plain text email support
  - Input validation for all email parameters
  - Comprehensive error handling and logging

#### Changed
- **Email Architecture:**
  - Migrated from Resend-only to SMTP-first architecture
  - Updated all notification functions to use universal `send-email`
  - Enhanced admin settings tab renamed to "Email Settings"
  - Improved error messages and user feedback

#### Security
- SMTP passwords encrypted in Supabase Vault
- Passwords masked in UI (displayed as `••••••••`)
- Admin-only access to email configuration
- Sanitized email inputs to prevent injection
- Audit logging for configuration changes

#### Documentation
- Created `email-system.md` with full architecture details
- Updated `backend.md` with email system overview
- Enhanced `api-reference.md` with edge function docs
- Updated `admin-user-guide.md` with SMTP setup guide
- Comprehensive troubleshooting section added

#### Fixed
- Input validation in `test-smtp-connection` and `send-email`
- Proper error handling for SMTP authentication failures
- Fallback mechanism for Resend when SMTP unavailable
- Password retrieval from Vault when not provided

---

## [1.0.1] - 2025-01-20

### Added
- Blog routes configured (`/blog`, `/blog/blog-details`, `/blog/blog-standard`)
- Full blog functionality restored and integrated with VZ content

### Removed
- `ServiceDetailPage.jsx` (unused Niotech demo page)

---

## [1.0.0] - 2025-01-26

### ✅ Phase 1: Frontend Development — COMPLETE

#### Added
- **Frontend Structure:**
  - 12 production pages with clean, focused routing
  - Layout4 as unified layout wrapper
  - Footer component with VZ Juspol official content
  - Header/Navigation with VZ branding
  - Service pages with dynamic content loading from JSON
  
- **VZ-Specific Pages:**
  - Home (landing page with hero and services overview)
  - About (departmental information)
  - Services (VZ services catalog)
  - FAQ (frequently asked questions)
  - Contact (contact information and office hours)
  - Instructies (application instructions)
  - Documenten Lijsten (required documents)
  - Aanvraag Indienen (application submission wizard)
  - Vergunningen (permit information)
  - Overzicht (application status overview)
  - Feedback (user feedback form)

- **Admin Dashboard:**
  - Admin layout with sidebar navigation
  - Dashboard page with statistics cards and charts
  - Authentication system (Sign In / Sign Up)
  - Protected routes for admin access
  - Dark mode support
  - Responsive design

- **Global Components:**
  - ErrorBoundary for graceful error handling
  - AuthProvider for authentication context
  - ProtectedRoute component for authorization
  - Reusable UI components (Cards, Charts, Forms)

- **Documentation:**
  - README.md with complete setup guide
  - CHANGELOG.md for version tracking
  - Comprehensive `/docs/` folder with:
    - PRD.md (Product Requirements)
    - tasks.md (Task breakdown)
    - frontend-cleanup.md (Optimization log)
    - content-map.md (Content reference)
    - backend-architecture.md (Schema design)
    - wizard-logic.md (Decision tree)

#### Changed
- **Content Swap:**
  - Replaced all Niotech demo content with VZ Juspol official content
  - Updated footer with correct contact info, opening hours, and links
  - Replaced placeholder text across all pages
  - Updated navigation menus with VZ-specific routes

- **Branding Updates:**
  - Changed admin dashboard title from "Darkone" to "VZ Juspol Admin Portal"
  - Updated admin footer copyright text
  - Maintained visual consistency with original design system

- **Route Optimization:**
  - Removed demo routes (service-details, blog routes)
  - Consolidated to 12 production-ready routes
  - Cleaned up unused imports and components

#### Removed
- **Demo Content Clean-Up:**
  - Deleted `Darkone-React_v1.0/` reference template
  - Deleted `niotech-react-template/` reference template
  - Removed 9 demo pages and 13 unused components
  - Removed 3 demo layouts (kept only Layout4)
  - Eliminated 3+ demo-specific data files
  - Removed unused blog and service-details routes

- **Code Quality:**
  - Removed orphaned components
  - Cleaned up duplicate code
  - Eliminated dead imports

#### Fixed
- **Build & Import Issues:**
  - Fixed incorrect import path in Footer.jsx (`../Data` → `../../Data`)
  - Resolved "Could not resolve services.json" build error
  - Ensured clean build with no console warnings
  
- **Routing:**
  - Fixed protected route logic for admin access
  - Corrected navigation paths throughout the app

#### Security
- Implemented Row-Level Security (RLS) foundation
- Added authentication system with Supabase Auth
- Protected admin routes with authorization checks
- Added ErrorBoundary for secure error handling

---

## 🚀 Upcoming — Phase 2: Backend & Supabase Integration

### Planned Features
- Database schema implementation
- User profiles and authentication flow
- Application submission system
- Document upload and management
- Admin CRUD operations
- Email notifications
- Real-time status tracking
- Decision-tree wizard logic

---

## 📝 Development Notes

### Version Numbering
- **Major (X.0.0):** Breaking changes or major milestones
- **Minor (1.X.0):** New features and functionality
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

**Last Updated:** 2025-01-26  
**Current Version:** 1.0.0  
**Status:** ✅ Phase 1 Complete — Ready for Phase 2
