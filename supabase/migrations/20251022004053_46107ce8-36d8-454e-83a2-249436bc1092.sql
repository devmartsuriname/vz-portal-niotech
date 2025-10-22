-- Fix function search path security warning by recreating with proper settings
DROP TRIGGER IF EXISTS trigger_notify_admins_new_submission ON public.submissions;
DROP FUNCTION IF EXISTS public.notify_admins_new_submission();

CREATE OR REPLACE FUNCTION public.notify_admins_new_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only notify when status changes to 'submitted'
  IF NEW.status = 'submitted' AND (OLD.status IS NULL OR OLD.status != 'submitted') THEN
    -- Insert notification for all admins
    INSERT INTO public.notifications (user_id, type, title, message, link)
    SELECT 
      ur.user_id,
      'info',
      'Nieuwe Aanvraag Ingediend',
      'Referentie: ' || SUBSTRING(NEW.id::text, 1, 8),
      '/admin/submissions/' || NEW.id
    FROM public.user_roles ur
    WHERE ur.role = 'admin'::app_role;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER trigger_notify_admins_new_submission
AFTER INSERT OR UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.notify_admins_new_submission();