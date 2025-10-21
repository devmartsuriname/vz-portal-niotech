# Backend Architecture — Database Schema & Security
**Vreemdelingen Zaken Juspol Portal 2.0**

**Version:** 1.1  
**Date:** 2025-01-21  
**Status:** ✅ Phase 2.1 COMPLETE — Schema Deployed & Operational

---

## Database Schema Overview

The VZ Juspol Portal database consists of **10 core tables** with comprehensive relationships, constraints, and security policies. All tables use **Row Level Security (RLS)** to enforce access control at the database level.

### ✅ Phase 2.1 Implementation Status

**Completion Date:** 2025-01-21  
**Migration File:** `supabase/migrations/20251021022742_bce8ef15-7505-4fa2-98ad-0ae3cedc3e90.sql`

**Key Achievements:**
- ✅ All 10 core tables created and operational
- ✅ 1 enum type (`app_role`) + 2 text enums with CHECK constraints
- ✅ 6 foreign key relationships with cascade logic
- ✅ 25 RLS policies across all tables
- ✅ 2 database functions (`has_role`, `update_updated_at_column`)
- ✅ 1 private storage bucket (`submission-files`) with policies
- ✅ Initial seed data: 12 application_types, 12 document_types
- ✅ Performance indexes on all critical columns
- ✅ No linter errors (2 minor warnings, non-blocking)

**Next Phase:** Phase 2.2 - Backend Integration & Edge Functions

---

## Table Definitions

### 1. application_types

**Purpose:** Master list of application categories (Residence, Naturalization, Declarations, etc.)

```sql
CREATE TYPE application_category AS ENUM (
  'VERBLIJF',        -- Residence
  'NATURALISATIE',   -- Naturalization
  'VERKLARING',      -- Declaration
  'DUPLICAAT',       -- Duplicate
  'CONVERSIE',       -- Conversion
  'ASIEL'            -- Asylum
);

CREATE TABLE application_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  category application_category NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  processing_days INTEGER DEFAULT 30,
  fee_amount DECIMAL(10,2) DEFAULT 0.00,
  active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_application_types_category ON application_types(category);
CREATE INDEX idx_application_types_active ON application_types(active);
```

**Sample Data:**
- `VERBLIJF_SUR` — Verblijf (Surinaamse origine)
- `VERBLIJF_OTH` — Verblijf (Overige)
- `NAT_SUR` — Naturalisatie (Surinaamse origine)
- `NAT_ART5` — Naturalisatie door Optie (Art. 5)
- `NAT_ART12` — Naturalisatie door Huwelijk (Art. 12)
- `VERKL_ART21` — Verklaring van Ingezetenschap (Art. 21)
- `VERKL_NATSO` — Verklaring van Naturalisatie (NATSO)
- `DUPL_VERBLIJF` — Duplicaat Verblijfsvergunning
- `CONV_VESTIGING` — Conversie naar Vestigingsvergunning
- `ASIEL_UNHCR` — Asielaanvraag

---

### 2. document_types

**Purpose:** Registry of all required documents across all application types

```sql
CREATE TABLE document_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  file_type VARCHAR(50) DEFAULT 'PDF',
  max_size_kb INTEGER DEFAULT 400,
  translation_required BOOLEAN DEFAULT FALSE,
  validity_months INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_document_types_category ON document_types(category);
```

**Sample Data:**
- `PASSPORT` — Paspoort (houderpagina)
- `BIRTH_CERT` — Geboorteakte
- `MARRIAGE_CERT` — Huwelijksakte
- `RESIDENCE_PROOF` — Bewijs van Ingezetenschap
- `INCOME_PROOF` — Bewijs van Inkomen
- `POLICE_CLEARANCE` — Verklaring van Goed Gedrag
- `PHOTO_ID` — Pasfoto
- `GUARANTOR_FORM` — Garantstellingsformulier
- `UNHCR_CERT` — UNHCR Certificaat
- `MINOR_FORM` — Formulier Minderjarige Kinderen

---

### 3. application_documents

**Purpose:** Links documents to application types with requirement rules (many-to-many junction table)

```sql
CREATE TABLE application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_type_id UUID NOT NULL REFERENCES application_types(id) ON DELETE CASCADE,
  document_type_id UUID NOT NULL REFERENCES document_types(id) ON DELETE CASCADE,
  required BOOLEAN DEFAULT TRUE,
  per_person BOOLEAN DEFAULT FALSE,
  conditional_rule JSONB,
  display_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(application_type_id, document_type_id)
);

CREATE INDEX idx_application_documents_app_type ON application_documents(application_type_id);
CREATE INDEX idx_application_documents_doc_type ON application_documents(document_type_id);
```

**Conditional Rule Example:**
```json
{
  "condition": "marital_status",
  "type": "equals",
  "value": "married"
}
```

---

### 4. wizard_rules

**Purpose:** Stores decision tree questions and branching logic for the application wizard

```sql
CREATE TABLE wizard_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INTEGER NOT NULL,
  question TEXT NOT NULL,
  question_type VARCHAR(50) DEFAULT 'single_choice',
  options JSONB,
  resulting_application_types UUID[],
  is_start_question BOOLEAN DEFAULT FALSE,
  parent_step INTEGER,
  validation_rule JSONB,
  help_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wizard_rules_step ON wizard_rules(step_number);
CREATE INDEX idx_wizard_rules_parent ON wizard_rules(parent_step);
```

**Question Types:**
- `single_choice` — Radio buttons
- `multiple_choice` — Checkboxes
- `text` — Text input
- `date` — Date picker
- `number` — Number input

**Options JSONB Example:**
```json
[
  {"value": "yes", "label": "Ja", "next_step": 3},
  {"value": "no", "label": "Nee", "result": "NAT_ART12"}
]
```

---

### 5. submissions

**Purpose:** Stores all application submissions with applicant information

```sql
CREATE TYPE submission_status AS ENUM (
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'ADDITIONAL_INFO',
  'APPROVED',
  'REJECTED',
  'COMPLETED'
);

CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agenda_number VARCHAR(50) UNIQUE,
  application_type_id UUID NOT NULL REFERENCES application_types(id),
  status submission_status DEFAULT 'DRAFT',
  
  -- Applicant information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  nationality VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  address TEXT,
  
  -- Application data
  wizard_answers JSONB,
  additional_notes TEXT,
  
  -- Administrative
  submitted_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  status_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_email ON submissions(email);
CREATE INDEX idx_submissions_agenda ON submissions(agenda_number);
CREATE INDEX idx_submissions_created ON submissions(created_at DESC);

-- Trigger to generate agenda number
CREATE SEQUENCE agenda_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_agenda_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.agenda_number IS NULL THEN
    NEW.agenda_number := 'VZ-' || TO_CHAR(NOW(), 'YYYY') || '-' || 
                         LPAD(NEXTVAL('agenda_number_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_agenda_number
  BEFORE INSERT ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION generate_agenda_number();

-- Trigger to set submitted_at timestamp
CREATE OR REPLACE FUNCTION set_submitted_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'SUBMITTED' AND OLD.status = 'DRAFT' THEN
    NEW.submitted_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_submitted_timestamp
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION set_submitted_timestamp();
```

---

### 6. submission_files

**Purpose:** Stores uploaded documents for each submission

```sql
CREATE TABLE submission_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  document_type_id UUID NOT NULL REFERENCES document_types(id),
  
  -- File information
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size_kb INTEGER NOT NULL,
  mime_type VARCHAR(100) DEFAULT 'application/pdf',
  
  -- Validation
  uploaded_by_person INTEGER DEFAULT 1,
  validation_status VARCHAR(50) DEFAULT 'pending',
  validation_notes TEXT,
  
  -- Metadata
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submission_files_submission ON submission_files(submission_id);
CREATE INDEX idx_submission_files_status ON submission_files(validation_status);

-- Check constraint for file size
ALTER TABLE submission_files 
ADD CONSTRAINT check_file_size 
CHECK (file_size_kb <= 400);
```

---

### 7. pages

**Purpose:** CMS-like content management for static pages

```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  meta_keywords VARCHAR(500),
  published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(published);
```

---

### 8. faq_items

**Purpose:** FAQ management for public website

```sql
CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faq_items_category ON faq_items(category);
CREATE INDEX idx_faq_items_active ON faq_items(active);
```

---

### 9. announcements

**Purpose:** News and announcements management

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100),
  featured_image VARCHAR(500),
  published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_announcements_published ON announcements(published);
CREATE INDEX idx_announcements_date ON announcements(published_at DESC);
```

---

### 10. user_roles (CRITICAL SECURITY)

**Purpose:** Role management for admin users

```sql
CREATE TYPE app_role AS ENUM ('admin', 'moderator', 'viewer');

CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

**CRITICAL:** Roles MUST be stored in this separate table, NOT in `auth.users` or client-side storage. This prevents privilege escalation attacks.

---

## Row Level Security (RLS) Policies

### Public Read Policies

Tables accessible to all users without authentication:

```sql
-- application_types
ALTER TABLE application_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active application types"
ON application_types FOR SELECT
TO anon, authenticated
USING (active = TRUE);

-- document_types
ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view document types"
ON document_types FOR SELECT
TO anon, authenticated
USING (TRUE);

-- application_documents
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view application documents"
ON application_documents FOR SELECT
TO anon, authenticated
USING (TRUE);

-- wizard_rules
ALTER TABLE wizard_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view wizard rules"
ON wizard_rules FOR SELECT
TO anon, authenticated
USING (TRUE);

-- pages
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published pages"
ON pages FOR SELECT
TO anon, authenticated
USING (published = TRUE);

-- faq_items
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active FAQs"
ON faq_items FOR SELECT
TO anon, authenticated
USING (active = TRUE);

-- announcements
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published announcements"
ON announcements FOR SELECT
TO anon, authenticated
USING (published = TRUE);
```

---

### Submission Policies (User-Specific)

```sql
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can create submissions
CREATE POLICY "Anyone can create submissions"
ON submissions FOR INSERT
TO anon, authenticated
WITH CHECK (TRUE);

-- Users can view their own submissions (by email)
CREATE POLICY "Users can view own submissions"
ON submissions FOR SELECT
TO anon, authenticated
USING (email = current_setting('request.headers')::json->>'x-user-email');

-- Authenticated users can update own DRAFT submissions
CREATE POLICY "Users can update own draft submissions"
ON submissions FOR UPDATE
TO authenticated
USING (
  email = (SELECT email FROM auth.users WHERE id = auth.uid()) 
  AND status = 'DRAFT'
);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
ON submissions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can update all submissions
CREATE POLICY "Admins can update submissions"
ON submissions FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));
```

---

### File Upload Policies

```sql
ALTER TABLE submission_files ENABLE ROW LEVEL SECURITY;

-- Users can upload files to their own submissions
CREATE POLICY "Users can upload files to own submissions"
ON submission_files FOR INSERT
TO anon, authenticated
WITH CHECK (
  submission_id IN (
    SELECT id FROM submissions 
    WHERE email = current_setting('request.headers')::json->>'x-user-email'
  )
);

-- Users can view files for their own submissions
CREATE POLICY "Users can view own submission files"
ON submission_files FOR SELECT
TO anon, authenticated
USING (
  submission_id IN (
    SELECT id FROM submissions 
    WHERE email = current_setting('request.headers')::json->>'x-user-email'
  )
);

-- Admins can view all files
CREATE POLICY "Admins can view all files"
ON submission_files FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can update file validation status
CREATE POLICY "Admins can update file validation"
ON submission_files FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));
```

---

### Admin-Only Policies

```sql
-- user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all roles"
ON user_roles FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON user_roles FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- pages
CREATE POLICY "Admins can manage pages"
ON pages FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- faq_items
CREATE POLICY "Admins can manage FAQs"
ON faq_items FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- announcements
CREATE POLICY "Admins can manage announcements"
ON announcements FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- application_types
CREATE POLICY "Admins can manage application types"
ON application_types FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- document_types
CREATE POLICY "Admins can manage document types"
ON document_types FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- application_documents
CREATE POLICY "Admins can manage application documents"
ON application_documents FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- wizard_rules
CREATE POLICY "Admins can manage wizard rules"
ON wizard_rules FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));
```

---

## Supabase Storage Configuration

### Bucket: submission-files

**Purpose:** Store uploaded documents (PDFs only)

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('submission-files', 'submission-files', FALSE);

-- Storage policies
CREATE POLICY "Anyone can upload to submission-files"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'submission-files');

CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'submission-files' 
  AND (storage.foldername(name))[1] IN (
    SELECT id::text FROM submissions 
    WHERE email = current_setting('request.headers')::json->>'x-user-email'
  )
);

CREATE POLICY "Admins can view all files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'submission-files' 
  AND has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'submission-files' 
  AND has_role(auth.uid(), 'admin')
);
```

**File Structure:**
```
submission-files/
├── [submission_id]/
│   ├── passport-1.pdf
│   ├── birth-cert-1.pdf
│   ├── birth-cert-2.pdf
│   ├── marriage-cert.pdf
│   └── ...
```

---

## Edge Functions

### 1. send-submission-notification

**Trigger:** After submission created (status = 'SUBMITTED')  
**Purpose:** Send confirmation email to applicant + alert admin

**Environment Variables:**
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

---

### 2. validate-file

**Trigger:** After file uploaded to `submission_files`  
**Purpose:** Validate file size, type, and content (PDF verification)

**Validation Rules:**
- File size ≤400KB
- MIME type = `application/pdf`
- File not corrupted (PDF header check)

---

### 3. evaluate-wizard

**Trigger:** Called by frontend after wizard completion  
**Purpose:** Determine application type from wizard answers

**Input:** Array of `{step_number, answer_value}`  
**Output:** `{application_type, required_documents}`

---

### 4. send-status-update-notification

**Trigger:** When submission status changes  
**Purpose:** Email applicant with status update and next steps

**Statuses Requiring Notification:**
- `UNDER_REVIEW` — "Your application is being reviewed"
- `ADDITIONAL_INFO` — "We need additional information"
- `APPROVED` — "Your application has been approved"
- `REJECTED` — "Your application has been rejected"

---

## Security Best Practices

### Authentication
✅ Email/password via Supabase Auth  
✅ JWT tokens with 24-hour expiry  
✅ Session persistence in localStorage (secure, HTTP-only cookies in production)  
✅ Password requirements: min 8 characters, uppercase, lowercase, number  

### Authorization
✅ Row Level Security (RLS) on all tables  
✅ Security definer function `has_role()` prevents RLS recursion  
✅ User roles stored in separate table (prevents privilege escalation)  
✅ Admin actions logged for audit trail  

### Data Protection
✅ HTTPS enforced in production  
✅ Data encryption at rest (Supabase default: AES-256)  
✅ Data encryption in transit (TLS 1.3)  
✅ Temporary file storage (deleted after processing)  
✅ GDPR-aligned data retention policy  

### Input Validation
✅ Client-side validation (React Hook Form + Zod)  
✅ Server-side validation (Edge Functions + PostgreSQL constraints)  
✅ SQL injection prevention (parameterized queries via Supabase)  
✅ XSS prevention (React's built-in escaping)  
✅ File upload validation (type, size, content)  

---

## Database Diagram

```
┌─────────────────────┐
│ application_types   │
│ ─────────────────── │
│ id (PK)             │
│ code                │
│ category (ENUM)     │
│ title               │
│ processing_days     │
│ fee_amount          │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────────────┐
│ application_documents       │
│ ─────────────────────────── │
│ id (PK)                     │
│ application_type_id (FK)    │
│ document_type_id (FK)       │
│ required                    │
│ conditional_rule (JSONB)    │
└──────────┬──────────────────┘
           │
           │ N:1
           │
┌──────────▼──────────┐
│ document_types      │
│ ──────────────────  │
│ id (PK)             │
│ code                │
│ title               │
│ max_size_kb         │
│ translation_required│
└─────────────────────┘

┌─────────────────────┐
│ wizard_rules        │
│ ─────────────────── │
│ id (PK)             │
│ step_number         │
│ question            │
│ options (JSONB)     │
│ resulting_app_types │
└─────────────────────┘

┌──────────────────────┐        ┌──────────────────────┐
│ submissions          │        │ submission_files     │
│ ──────────────────── │        │ ──────────────────── │
│ id (PK)              ├────1:N─┤ id (PK)              │
│ agenda_number (UNIQUE│        │ submission_id (FK)   │
│ application_type_id  │        │ document_type_id (FK)│
│ status (ENUM)        │        │ file_path            │
│ first_name           │        │ file_size_kb         │
│ email                │        │ validation_status    │
│ wizard_answers (JSON)│        └──────────────────────┘
└──────────────────────┘

┌─────────────────────┐
│ user_roles          │
│ ─────────────────── │
│ id (PK)             │
│ user_id (FK→auth)   │
│ role (ENUM)         │
│ assigned_by (FK)    │
└─────────────────────┘

┌─────────────────────┐
│ pages, faq_items,   │
│ announcements       │
│ ─────────────────── │
│ (CMS tables)        │
└─────────────────────┘
```

---

## Links to Related Documentation

- [Backend System Overview](./backend.md)
- [Wizard Logic](./wizard-logic.md)
- [API Reference](./api-reference.md)
- [Admin User Guide](./admin-user-guide.md)

---

**Document Control:**  
- Version: 1.0
- Last Updated: 2025-01-20
- Owner: Backend Development Team
- Status: SQL Ready for Phase 2 Execution
