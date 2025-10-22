-- Create system_settings table for storing application configuration
CREATE TABLE public.system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can manage settings
CREATE POLICY "Admins can manage system settings"
ON public.system_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default settings
INSERT INTO public.system_settings (setting_key, setting_value, category, description) VALUES
('resend_api_key', '""'::jsonb, 'email', 'Resend API key for sending emails'),
('resend_from_email', '"onboarding@resend.dev"'::jsonb, 'email', 'Default sender email address'),
('resend_from_name', '"VZ Juspol Portal"'::jsonb, 'email', 'Default sender name'),
('max_file_size_mb', '10'::jsonb, 'documents', 'Maximum file size for uploads in MB'),
('allowed_file_types', '["pdf", "jpg", "jpeg", "png"]'::jsonb, 'documents', 'Allowed file types for uploads'),
('maintenance_mode', 'false'::jsonb, 'general', 'Enable maintenance mode'),
('submission_auto_approve', 'false'::jsonb, 'workflow', 'Auto-approve submissions');