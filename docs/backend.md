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
9. **Email System** — Dual-provider email delivery (SMTP/Resend)

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
- Supabase Auth, Storage, Edge Functions, Realtime, Vault
- Darkone Admin (React 18.3.1, Bootstrap 5.3.8)
- Nodemailer (SMTP client)
- Resend API (Email delivery fallback)

---

## Email System Architecture

### Provider Support
- **Primary:** Hostinger SMTP (smtp.hostinger.com)
- **Fallback:** Resend API (api.resend.com)
- **Selection:** Configured via `system_settings.smtp_provider`

### Security
- SMTP passwords stored encrypted in Supabase Vault
- Admin-only access via RLS policies
- Automatic audit logging for configuration changes

### Email Functions
1. **send-email** — Universal email sender with dual-provider support and automatic fallback
2. **test-smtp-connection** — Test SMTP credentials with Vault password retrieval

### Configuration Storage
All email settings stored in `system_settings` table:
- `smtp_provider` — 'smtp' or 'resend'
- `smtp_host`, `smtp_port`, `smtp_secure`, `smtp_username`
- `smtp_password` — Reference to Vault (empty string in table)
- `smtp_from_email`, `smtp_from_name`
- `wizard_result_recipient` — Destination for wizard submissions
- `resend_api_key` — Legacy Resend configuration

---

## Performance Optimization History

### Wizard Restoration (2025-10-27)
After Phase P1 code splitting optimizations, the Wizard system experienced duplicate React instance issues causing `useState null` errors on the Live URL.

**Resolution:** Updated `vite.config.ts` React bundling patterns to ensure single React instance consolidation. Added `scheduler` to `vendor-react` bundle and enhanced `assertSingleReact.ts` diagnostics.

**Key Finding:** Wizard logic was unchanged and identical to October 23 stable backups. Issue was purely bundling configuration.

**Documentation:** See [Rollback & Restoration Report](./rollback.md) for detailed investigation and validation steps.

---

## Links

- [Backend Architecture](./backend-architecture.md)
- [Wizard Logic](./wizard-logic.md)
- [API Reference](./api-reference.md)
- [Admin User Guide](./admin-user-guide.md)
- [Rollback & Restoration Report](./rollback.md)
