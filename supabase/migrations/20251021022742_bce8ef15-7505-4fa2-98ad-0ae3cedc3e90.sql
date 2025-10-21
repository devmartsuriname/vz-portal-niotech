-- =====================================================
-- Phase 2.1: Database Schema Design
-- VZ Juspol Portal 2.0
-- =====================================================

-- 1. Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- =====================================================
-- 2. Core Reference Tables
-- =====================================================

-- Application Types Table
CREATE TABLE public.application_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  base_fee DECIMAL(10,2),
  processing_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Document Types Table
CREATE TABLE public.document_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_required BOOLEAN DEFAULT true,
  max_file_size_mb INTEGER DEFAULT 5,
  allowed_formats TEXT[] DEFAULT ARRAY['pdf', 'jpg', 'png'],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Application Documents (Junction Table)
CREATE TABLE public.application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_type_id UUID NOT NULL REFERENCES public.application_types(id) ON DELETE CASCADE,
  document_type_id UUID NOT NULL REFERENCES public.document_types(id) ON DELETE CASCADE,
  is_mandatory BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(application_type_id, document_type_id)
);

-- Wizard Rules Table
CREATE TABLE public.wizard_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_key TEXT NOT NULL UNIQUE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL CHECK (question_type IN ('single-choice', 'multiple-choice', 'text', 'number', 'date')),
  options JSONB,
  next_question_map JSONB,
  result_application_type_id UUID REFERENCES public.application_types(id) ON DELETE SET NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 3. User-Facing Tables
-- =====================================================

-- User Roles Table (CRITICAL SECURITY)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Submissions Table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_type_id UUID NOT NULL REFERENCES public.application_types(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'in_review', 'approved', 'rejected', 'pending_documents')),
  wizard_answers JSONB,
  applicant_data JSONB,
  admin_notes TEXT,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Submission Files Table
CREATE TABLE public.submission_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  document_type_id UUID NOT NULL REFERENCES public.document_types(id) ON DELETE RESTRICT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  is_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- =====================================================
-- 4. CMS Tables
-- =====================================================

-- Pages Table (CMS)
CREATE TABLE public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ Items Table
CREATE TABLE public.faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Announcements Table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 5. Indexes for Performance
-- =====================================================

CREATE INDEX idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_submissions_application_type ON public.submissions(application_type_id);
CREATE INDEX idx_submission_files_submission_id ON public.submission_files(submission_id);
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_pages_slug ON public.pages(slug);
CREATE INDEX idx_faq_items_category ON public.faq_items(category);

-- =====================================================
-- 6. Updated_at Triggers
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_application_types_updated_at BEFORE UPDATE ON public.application_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_document_types_updated_at BEFORE UPDATE ON public.document_types FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_wizard_rules_updated_at BEFORE UPDATE ON public.wizard_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON public.user_roles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON public.pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON public.faq_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 7. Security Definer Function for Role Checking
-- =====================================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
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

-- =====================================================
-- 8. Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.application_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wizard_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Application Types Policies (Public Read)
CREATE POLICY "Anyone can view active application types"
  ON public.application_types FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage application types"
  ON public.application_types FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Document Types Policies (Public Read)
CREATE POLICY "Anyone can view document types"
  ON public.document_types FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage document types"
  ON public.document_types FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Application Documents Policies (Public Read)
CREATE POLICY "Anyone can view application documents"
  ON public.application_documents FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage application documents"
  ON public.application_documents FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Wizard Rules Policies (Public Read for Active)
CREATE POLICY "Anyone can view active wizard rules"
  ON public.wizard_rules FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage wizard rules"
  ON public.wizard_rules FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- User Roles Policies (CRITICAL SECURITY)
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Submissions Policies (User-Specific)
CREATE POLICY "Users can view own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own draft submissions"
  ON public.submissions FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft')
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions"
  ON public.submissions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all submissions"
  ON public.submissions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Submission Files Policies (User-Specific)
CREATE POLICY "Users can view own submission files"
  ON public.submission_files FOR SELECT
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can upload files to own submissions"
  ON public.submission_files FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.submissions
      WHERE id = submission_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all submission files"
  ON public.submission_files FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can verify submission files"
  ON public.submission_files FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Pages Policies (Public Read for Published)
CREATE POLICY "Anyone can view published pages"
  ON public.pages FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage all pages"
  ON public.pages FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- FAQ Items Policies (Public Read for Published)
CREATE POLICY "Anyone can view published FAQ items"
  ON public.faq_items FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage FAQ items"
  ON public.faq_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Announcements Policies (Public Read for Active)
CREATE POLICY "Anyone can view active announcements"
  ON public.announcements FOR SELECT
  USING (
    is_active = true AND
    (starts_at IS NULL OR starts_at <= now()) AND
    (ends_at IS NULL OR ends_at >= now())
  );

CREATE POLICY "Admins can manage announcements"
  ON public.announcements FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- 9. Storage Bucket Configuration
-- =====================================================

-- Create submission-files bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'submission-files',
  'submission-files',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
);

-- Storage Policies for submission-files bucket
CREATE POLICY "Users can view own submission files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'submission-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload files to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'submission-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Admins can view all submission files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'submission-files' AND
    public.has_role(auth.uid(), 'admin')
  );

-- =====================================================
-- 10. Seed Data - Initial Application Types
-- =====================================================

INSERT INTO public.application_types (name, description, base_fee, processing_days) VALUES
  ('Verblijfsvergunning - Regulier', 'Tijdelijk of permanent verblijf in Suriname', 150.00, 30),
  ('Verblijfsvergunning - Gezinshereniging', 'Verblijf voor gezinsleden van Surinaamse burgers of verblijfsvergunninghouders', 150.00, 45),
  ('Verblijfsvergunning - Arbeidsvergunning', 'Verblijf met recht op arbeid in Suriname', 200.00, 45),
  ('Naturalisatie - Surinaamse Origine (Art. 4)', 'Verkrijging staatsburgerschap voor personen van Surinaamse afkomst', 250.00, 90),
  ('Naturalisatie - Optie (Art. 5)', 'Verkrijging staatsburgerschap door optie', 250.00, 90),
  ('Naturalisatie - Huwelijk (Art. 12)', 'Verkrijging staatsburgerschap via huwelijk met Surinaamse burger', 250.00, 120),
  ('Verklaring - Ingezetenschap (Art. 21)', 'Officiële verklaring van ingezetenschap', 50.00, 14),
  ('Verklaring - Naturalisatie (NATSO)', 'Officiële verklaring van naturalisatie', 50.00, 14),
  ('Duplicaat - Verblijfsvergunning', 'Vervanging van verloren of beschadigde verblijfsvergunning', 75.00, 21),
  ('Duplicaat - Naturalisatiebewijs', 'Vervanging van verloren of beschadigd naturalisatiebewijs', 75.00, 21),
  ('Conversie - Tijdelijk naar Permanent', 'Omzetting tijdelijke naar permanente verblijfsvergunning', 100.00, 60),
  ('Asiel - Vluchtelingenstatus', 'Aanvraag internationale bescherming en vluchtelingenstatus', 0.00, 180);

-- =====================================================
-- 11. Seed Data - Initial Document Types
-- =====================================================

INSERT INTO public.document_types (name, description, is_required, max_file_size_mb, allowed_formats) VALUES
  ('Paspoort', 'Geldig paspoort (scan of kopie van alle relevante pagina''s)', true, 5, ARRAY['pdf', 'jpg', 'png']),
  ('Geboorteakte', 'Geboorteakte (origineel of gewaarmerkte kopie)', true, 5, ARRAY['pdf', 'jpg', 'png']),
  ('Huwelijksakte', 'Huwelijksakte of partnerschapsregistratie', false, 5, ARRAY['pdf', 'jpg', 'png']),
  ('Pasfoto', 'Recente pasfoto (formaat 4x6 cm, witte achtergrond)', true, 2, ARRAY['jpg', 'png']),
  ('Bewijs van Inkomsten', 'Bewijs van regelmatige inkomsten (loonstroken, bankafschriften)', false, 5, ARRAY['pdf']),
  ('Politierapport VOG', 'Verklaring Omtrent Gedrag (VOG) of politierapport', true, 5, ARRAY['pdf']),
  ('Bewijs van Huisvesting', 'Bewijs van huisvesting in Suriname (huurcontract, eigendomsbewijs)', false, 5, ARRAY['pdf', 'jpg', 'png']),
  ('Arbeidscontract', 'Arbeidscontract of werkgeversverklaring', false, 5, ARRAY['pdf']),
  ('Bewijs Surinaamse Origine', 'Bewijs van Surinaamse afstamming (geboorteakte ouder/grootouder)', false, 5, ARRAY['pdf', 'jpg', 'png']),
  ('Verblijfsvergunning (huidig)', 'Kopie van huidige verblijfsvergunning', false, 5, ARRAY['pdf', 'jpg', 'png']),
  ('Medische Verklaring', 'Medische verklaring of gezondheidscertificaat', false, 5, ARRAY['pdf']),
  ('Asielmotivatie', 'Gedetailleerde verklaring van asielredenen', false, 10, ARRAY['pdf']);

-- =====================================================
-- END OF MIGRATION
-- =====================================================