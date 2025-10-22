-- Add sections column to pages table for dynamic page builder
ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '[]'::jsonb;

-- Add index for sections column to improve query performance
CREATE INDEX IF NOT EXISTS idx_pages_sections ON public.pages USING gin(sections);

-- Add comment for documentation
COMMENT ON COLUMN public.pages.sections IS 'JSON array of page sections for dynamic page builder. Each section has: type, id, props, order';