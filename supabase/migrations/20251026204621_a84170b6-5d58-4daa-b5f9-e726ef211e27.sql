-- Fix Security Issue 1: Restrict public access to issued_permits personal data
-- Remove the overly permissive public read policy
DROP POLICY IF EXISTS "Anyone can view active permits" ON public.issued_permits;

-- Create a function for secure permit lookup (only by exact code or agenda_number)
-- Returns data WITHOUT personal names for public access
CREATE OR REPLACE FUNCTION public.search_permit_public(
  search_code text DEFAULT NULL,
  search_agenda text DEFAULT NULL
)
RETURNS TABLE (
  code varchar,
  agenda_number varchar,
  issued_date date,
  expires_at date,
  status varchar
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    code,
    agenda_number,
    issued_date,
    expires_at,
    status
  FROM issued_permits
  WHERE status = 'active'
    AND (
      (search_code IS NOT NULL AND code = search_code) OR
      (search_agenda IS NOT NULL AND agenda_number = search_agenda)
    )
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.search_permit_public TO anon, authenticated;

-- Admin access for full permit details (including names) already exists via:
-- "Admins can manage all permits" policy

-- Fix Security Issue 2: Create RPC function for logged contact submission access
CREATE OR REPLACE FUNCTION public.get_contact_submissions_with_logging()
RETURNS SETOF contact_submissions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log admin access to contact submissions
  IF has_role(auth.uid(), 'admin'::app_role) THEN
    INSERT INTO activity_logs (
      user_id,
      action_type,
      entity_type,
      new_values
    ) VALUES (
      auth.uid(),
      'bulk_view',
      'contact_submissions',
      jsonb_build_object('accessed_at', now(), 'action', 'list_all')
    );
  END IF;

  -- Return contact submissions if user is admin
  IF has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN QUERY SELECT * FROM contact_submissions ORDER BY created_at DESC;
  ELSE
    RAISE EXCEPTION 'Unauthorized access';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_contact_submissions_with_logging TO authenticated;