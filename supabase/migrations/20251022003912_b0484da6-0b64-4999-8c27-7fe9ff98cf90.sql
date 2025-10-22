-- Create notifications table for admin notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can create notifications
CREATE POLICY "Admins can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create index for performance
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Create function to auto-create notifications for new submissions
CREATE OR REPLACE FUNCTION public.notify_admins_new_submission()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER trigger_notify_admins_new_submission
AFTER INSERT OR UPDATE ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.notify_admins_new_submission();