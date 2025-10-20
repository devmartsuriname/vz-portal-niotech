# Project Requirements Document (PRD)
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.0  
**Date:** 2025-01-20  
**Status:** Approved  
**Project Lead:** VZ Development Team  

---

## Executive Summary

The **Vreemdelingen Zaken Juspol Portal 2.0** is a secure, accessible government portal for residence, naturalization, and asylum services in Suriname. The portal replaces the existing Niotech template with official VZ content and implements a full backend system for digital application processing.

---

## Project Objectives

### Primary Goals
1. **Digital Transformation** — Enable citizens to submit residence, naturalization, and asylum applications digitally
2. **Process Efficiency** — Reduce processing time by 30% through automated document validation and workflow management
3. **Transparency** — Provide real-time application status tracking via agenda number lookup
4. **Accessibility** — Achieve WCAG 2.1 AA compliance for inclusive government services
5. **Security** — Implement Row Level Security (RLS) and role-based access control for data protection

### Success Metrics
- **User Adoption:** 500+ digital submissions within first 3 months
- **Processing Time:** Average 25% reduction in manual review time
- **Accessibility Score:** Lighthouse Accessibility ≥95
- **Performance:** Page load time ≤2.5s (LCP)
- **Security:** Zero data breaches, all security audits passed

---

## Scope

### In Scope

**Frontend (Public Portal)**
- Content replacement: Home, About, Services, FAQ, Contact, Blog/News
- New pages: Application Wizard, Instructions, Document Checklists, Permit Search, Asylum Info, Privacy
- Multi-step application wizard with conditional logic (6 main branches, 20+ questions)
- Dynamic document checklist generation
- Secure file upload (PDF only, max 400KB)
- Email notifications (confirmation, status updates)

**Backend (Admin System)**
- Admin dashboard with statistics and charts
- Submission management (search, filter, status updates, notes)
- User role management (admin, moderator, viewer)
- Content management (pages, FAQs, announcements)
- Wizard configuration interface
- Reporting and analytics
- Real-time data synchronization (Supabase Realtime)

**Database**
- 10 tables: application_types, document_types, application_documents, wizard_rules, submissions, submission_files, pages, faq_items, announcements, user_roles
- Comprehensive RLS policies
- Supabase Storage for file uploads
- 4 Edge Functions: submission notification, file validation, wizard evaluation, status updates

### Out of Scope (Future Enhancements)
- Payment processing integration
- SMS notifications
- Advanced analytics (predictive processing times)
- Multi-language interface (prepared for i18n, implementation Phase 3)
- Mobile native apps (web responsive only)

---

## Technical Specifications

### Technology Stack

**Frontend**
- React 18.3.1 + Vite
- React Router 6.30.1
- React Bootstrap 2.10.10
- React Hook Form 7.61.1 + Zod validation
- Sass 1.93.2

**Backend**
- Lovable Cloud (Supabase 2.76.0)
- PostgreSQL database
- Supabase Storage
- Supabase Edge Functions (Deno)
- Supabase Auth
- Supabase Realtime

**Admin**
- Darkone React Admin
- Bootstrap 5.3.8
- ApexCharts 3.54.1
- Iconify React 5.2.1

### Architecture
- **Frontend:** Niotech Template → Layout4 (Production Ready)
- **Admin:** Darkone Admin → AdminLayout (Fully Integrated)
- **Authentication:** Email/password via Supabase Auth
- **File Storage:** Supabase Storage with folder structure `[submission_id]/[document_type]-[person_id].pdf`

---

## Government Compliance

### Data Protection
- GDPR-aligned where applicable
- Data retention policy: Temporary storage during processing, deletion after completion
- User consent collected before submission
- Contact for privacy questions provided

### Accessibility Standards
- WCAG 2.1 AA compliance
- Keyboard navigation throughout
- Screen reader support (NVDA, JAWS, VoiceOver)
- Color contrast ≥4.5:1 for normal text
- Semantic HTML structure

### Security Requirements
- Row Level Security (RLS) on all tables
- User roles stored in separate table (prevents privilege escalation)
- HTTPS enforced in production
- File upload validation (type, size)
- Input validation (client + server)
- SQL injection prevention via parameterized queries

---

## User Personas

### Applicant (Primary User)
- **Name:** Maria Santos
- **Age:** 35
- **Occupation:** Teacher
- **Tech Proficiency:** Moderate
- **Goals:** Apply for residence permit, track application status
- **Pain Points:** Complex document requirements, unclear processing times

### Admin Staff (Secondary User)
- **Name:** Johan Doekhie
- **Role:** VZ Case Officer
- **Tech Proficiency:** High
- **Goals:** Review submissions efficiently, update statuses, generate reports
- **Pain Points:** Manual document verification, lack of analytics

---

## Constraints

### Technical Constraints
- File upload limit: 400KB per document
- Supported file types: PDF only
- Browser support: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Database query response time: ≤100ms

### Business Constraints
- Budget: Government-funded project
- Timeline: 10-12 weeks (52 days)
- Team: 5 members (2 developers, 1 QA, 1 designer, 1 PM)
- Office hours: Monday-Friday 08:00-15:00 (for support)

### Regulatory Constraints
- Must comply with Suriname data protection laws
- Official government branding required (colors: #0D4C92 blue, #C41E3A red)
- All official documents must be in Dutch (NL)

---

## Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Scope creep | High | High | Strict change control, phase-based approach |
| File upload service outage | Medium | High | Implement retry logic, queue system |
| Low user adoption | Medium | Medium | User training sessions, clear instructions |
| Security breach | Low | Critical | Security audits, penetration testing, RLS enforcement |
| Performance issues at scale | Medium | High | Load testing, database indexing, caching strategy |

---

## Dependencies

### Internal Dependencies
- Existing VZ official content (text, images, PDFs)
- Access to current VZ website for content migration
- Ministry approval for design and workflow

### External Dependencies
- Lovable Cloud (Supabase) availability
- Email delivery service (for notifications)
- SSL certificate provider
- Domain hosting service

---

## Project Phases

**Phase 1:** Content Swap Implementation (15 days)  
**Phase 2:** Backend & Database Structure (10 days)  
**Phase 3:** Wizard Logic & Document Mapping (12 days)  
**Phase 4:** Admin Dashboard & Data Sync (8 days)  
**Phase 5:** QA, Optimization & Deployment (7 days)  

**Total Duration:** 52 days (~10-12 weeks)

---

## Deliverables

1. **15 Updated/New Frontend Pages**
2. **8 Admin Pages**
3. **10-Table Database Schema**
4. **4 Edge Functions**
5. **Complete RLS Policies**
6. **8 Documentation Files**
7. **QA Report**
8. **Deployment Guide**
9. **User Manual**
10. **Production-Ready Application**

---

## Approval & Sign-Off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Ministry Representative | TBD | _________ | _____ |
| Technical Lead | TBD | _________ | _____ |
| Project Manager | TBD | _________ | _____ |

---

## References

- [Master Execution Plan](./execution-plan.md)
- [Backend Architecture](./backend-architecture.md)
- [Wizard Logic Documentation](./wizard-logic.md)
- [API Reference](./api-reference.md)
- [Frontend Style Guide](./StyleGuideUniformity.md)
- [Admin Style Guide](./AdminStyleGuideUniformity.md)

---

**Document Control:**  
- Version History: 1.0 (Initial Release - 2025-01-20)
- Next Review Date: 2025-02-20
- Owner: VZ Development Team
