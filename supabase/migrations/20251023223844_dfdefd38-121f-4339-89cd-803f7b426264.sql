-- Add SMTP configuration settings to system_settings table
INSERT INTO system_settings (setting_key, setting_value, category, description) VALUES
  ('smtp_provider', '"resend"', 'email', 'Email provider: resend or smtp'),
  ('smtp_host', '""', 'email', 'SMTP server hostname (e.g., smtp.hostinger.com)'),
  ('smtp_port', '587', 'email', 'SMTP server port (587 for TLS, 465 for SSL)'),
  ('smtp_secure', 'true', 'email', 'Use TLS/SSL for SMTP connection'),
  ('smtp_username', '""', 'email', 'SMTP authentication username'),
  ('smtp_password', '""', 'email', 'SMTP authentication password'),
  ('smtp_from_email', '""', 'email', 'SMTP sender email address'),
  ('smtp_from_name', '"VZ Juspol Portal"', 'email', 'SMTP sender display name'),
  ('wizard_result_recipient', '"result@vz-juspol.sr"', 'email', 'Email address to receive wizard submission results')
ON CONFLICT (setting_key) DO NOTHING;