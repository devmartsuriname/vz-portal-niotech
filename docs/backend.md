# Backend System Overview
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.0  
**Date:** 2025-01-20  
**Status:** Design Complete — Implementation Pending  

---

## Purpose

The VZ Juspol Portal backend provides digital application management, document processing, workflow automation, admin interface, content management, and analytics for residence, naturalization, and asylum services.

---

## System Components

1. **Dashboard** — Real-time statistics and monitoring
2. **Applications Module** — Submission management with search, filter, status updates
3. **Documents Module** — Document type registry and validation rules
4. **Wizard Module** — Multi-step application logic configuration
5. **Users Module** — Admin user and role management
6. **Content Module** — CMS for pages, FAQs, announcements
7. **Reports Module** — Analytics and data export
8. **Settings Module** — System-wide configuration

---

## Database Overview

**10 Tables:**
1. application_types
2. document_types
3. application_documents
4. wizard_rules
5. submissions
6. submission_files
7. pages
8. faq_items
9. announcements
10. user_roles (CRITICAL SECURITY)

**Security:** Row Level Security (RLS) enabled on all tables

---

## Technology Stack

- Lovable Cloud (Supabase 2.76.0)
- PostgreSQL database
- Supabase Auth, Storage, Edge Functions, Realtime
- Darkone Admin (React 18.3.1, Bootstrap 5.3.8)

---

## Links

- [Backend Architecture](./backend-architecture.md)
- [Wizard Logic](./wizard-logic.md)
- [API Reference](./api-reference.md)
- [Admin User Guide](./admin-user-guide.md)
