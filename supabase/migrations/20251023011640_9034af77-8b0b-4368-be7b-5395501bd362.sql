-- Create checklist_pdfs table for storing PDF checklist references
CREATE TABLE IF NOT EXISTS public.checklist_pdfs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_type_id UUID NOT NULL REFERENCES public.application_types(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.checklist_pdfs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active checklists
CREATE POLICY "Anyone can view active checklists"
  ON public.checklist_pdfs
  FOR SELECT
  USING (is_active = true);

-- Allow admins to manage checklists
CREATE POLICY "Admins can manage checklists"
  ON public.checklist_pdfs
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_checklist_pdfs_updated_at
  BEFORE UPDATE ON public.checklist_pdfs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial checklist data mapping to application types
INSERT INTO public.checklist_pdfs (application_type_id, title, filename, storage_path, description, display_order)
SELECT 
  at.id,
  'Documentenlijst ' || at.name,
  CASE 
    WHEN at.name ILIKE '%Surinaamse Origine%' THEN 'naturalisatie-surinaamse.pdf'
    WHEN at.name ILIKE '%Naturalisatie%Optie%' THEN 'verklaring-naturalisatie-art5.pdf'
    WHEN at.name ILIKE '%Naturalisatie%Huwelijk%' THEN 'verklaring-naturalisatie-art12.pdf'
    WHEN at.name ILIKE '%Verklaring%Naturalisatie%' THEN 'verklaring-naturalisatie.pdf'
    WHEN at.name ILIKE '%Verklaring%Ingezetenschap%' THEN 'verklaring-ingezetenschap-art21.pdf'
    WHEN at.name ILIKE '%Verblijfsvergunning%Regulier%' THEN 'verblijf-overige.pdf'
    WHEN at.name ILIKE '%Verblijfsvergunning%Gezinshereniging%' THEN 'verblijf-overige.pdf'
    WHEN at.name ILIKE '%Verblijfsvergunning%Arbeidsvergunning%' THEN 'verblijf-overige.pdf'
    WHEN at.name ILIKE '%Duplicaat%Verblijfsvergunning%' THEN 'duplicaat.pdf'
    WHEN at.name ILIKE '%Duplicaat%Naturalisatiebewijs%' THEN 'duplicaat.pdf'
    WHEN at.name ILIKE '%Conversie%' THEN 'vestiging-conversie.pdf'
    WHEN at.name ILIKE '%Asiel%' THEN 'verblijf-overige.pdf'
    ELSE 'general.pdf'
  END,
  '/checklists/' || CASE 
    WHEN at.name ILIKE '%Surinaamse Origine%' THEN 'naturalisatie-surinaamse.pdf'
    WHEN at.name ILIKE '%Naturalisatie%Optie%' THEN 'verklaring-naturalisatie-art5.pdf'
    WHEN at.name ILIKE '%Naturalisatie%Huwelijk%' THEN 'verklaring-naturalisatie-art12.pdf'
    WHEN at.name ILIKE '%Verklaring%Naturalisatie%' THEN 'verklaring-naturalisatie.pdf'
    WHEN at.name ILIKE '%Verklaring%Ingezetenschap%' THEN 'verklaring-ingezetenschap-art21.pdf'
    WHEN at.name ILIKE '%Verblijfsvergunning%Regulier%' THEN 'verblijf-overige.pdf'
    WHEN at.name ILIKE '%Verblijfsvergunning%Gezinshereniging%' THEN 'verblijf-overige.pdf'
    WHEN at.name ILIKE '%Verblijfsvergunning%Arbeidsvergunning%' THEN 'verblijf-overige.pdf'
    WHEN at.name ILIKE '%Duplicaat%Verblijfsvergunning%' THEN 'duplicaat.pdf'
    WHEN at.name ILIKE '%Duplicaat%Naturalisatiebewijs%' THEN 'duplicaat.pdf'
    WHEN at.name ILIKE '%Conversie%' THEN 'vestiging-conversie.pdf'
    WHEN at.name ILIKE '%Asiel%' THEN 'verblijf-overige.pdf'
    ELSE 'general.pdf'
  END,
  'Checklist voor ' || at.name,
  ROW_NUMBER() OVER (ORDER BY at.name)
FROM public.application_types at
WHERE at.is_active = true;