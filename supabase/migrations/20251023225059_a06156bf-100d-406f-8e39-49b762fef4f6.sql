-- Create functions to securely store and retrieve SMTP password using Supabase Vault

-- Function to store SMTP password in vault
CREATE OR REPLACE FUNCTION public.store_smtp_password(password_value text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can store passwords
  IF NOT has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can store SMTP passwords';
  END IF;

  -- Delete existing secret if it exists
  DELETE FROM vault.secrets WHERE name = 'smtp_password';
  
  -- Insert new secret into vault
  INSERT INTO vault.secrets (name, secret)
  VALUES ('smtp_password', password_value);
END;
$$;

-- Function to retrieve SMTP password from vault
CREATE OR REPLACE FUNCTION public.get_smtp_password()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  password_value text;
BEGIN
  -- Retrieve secret from vault
  SELECT decrypted_secret INTO password_value
  FROM vault.decrypted_secrets
  WHERE name = 'smtp_password'
  LIMIT 1;
  
  RETURN password_value;
END;
$$;

-- Update system_settings to remove password value (keep empty for reference)
UPDATE system_settings 
SET setting_value = '""'::jsonb,
    description = 'SMTP password (stored securely in Vault - use store_smtp_password() to update)'
WHERE setting_key = 'smtp_password';

-- Add audit trigger for system_settings changes
CREATE OR REPLACE FUNCTION public.audit_system_settings_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log the change to activity_logs
  INSERT INTO public.activity_logs (
    user_id,
    action_type,
    entity_type,
    entity_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    'update',
    'system_settings',
    NEW.id,
    jsonb_build_object(
      'setting_key', OLD.setting_key,
      'setting_value', OLD.setting_value,
      'category', OLD.category
    ),
    jsonb_build_object(
      'setting_key', NEW.setting_key,
      'setting_value', NEW.setting_value,
      'category', NEW.category
    )
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for system_settings audit
DROP TRIGGER IF EXISTS audit_system_settings_trigger ON system_settings;
CREATE TRIGGER audit_system_settings_trigger
  AFTER UPDATE ON system_settings
  FOR EACH ROW
  EXECUTE FUNCTION audit_system_settings_change();