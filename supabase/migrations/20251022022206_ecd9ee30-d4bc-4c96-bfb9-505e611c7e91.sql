-- Create email_templates table
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key VARCHAR(50) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT,
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Add indexes
CREATE INDEX idx_email_templates_key ON email_templates(template_key);
CREATE INDEX idx_email_templates_active ON email_templates(is_active);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

-- Admins can manage all templates
CREATE POLICY "Admins can manage email templates"
ON email_templates FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_email_templates_updated_at
BEFORE UPDATE ON email_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Seed default email templates
INSERT INTO email_templates (template_key, name, subject, body_html, body_text, variables)
VALUES
  ('submission_confirmation', 
   'Aanvraag Bevestiging', 
   'Bevestiging van uw aanvraag - {{application_type}}',
   '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: linear-gradient(135deg, #7444FD 0%, #A78BFA 100%); padding: 30px; border-radius: 10px 10px 0 0;"><h1 style="color: white; margin: 0;">Vreemdelingenzaken</h1></div><div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;"><h2 style="color: #1f2937;">Beste {{applicant_name}},</h2><p style="color: #4b5563; line-height: 1.6;">Hartelijk dank voor het indienen van uw aanvraag voor <strong>{{application_type}}</strong>.</p><div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p style="margin: 5px 0;"><strong>Agendanummer:</strong> {{agenda_number}}</p><p style="margin: 5px 0;"><strong>Ingediend op:</strong> {{submitted_date}}</p><p style="margin: 5px 0;"><strong>Status:</strong> In behandeling</p></div><p style="color: #4b5563; line-height: 1.6;">Wij hebben uw aanvraag ontvangen en deze wordt momenteel in behandeling genomen. U ontvangt een update zodra er wijzigingen zijn in de status van uw aanvraag.</p><p style="color: #4b5563; line-height: 1.6;">U kunt de status van uw aanvraag online volgen met uw agendanummer.</p><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"><p style="color: #6b7280; font-size: 14px;">Met vriendelijke groet,<br><strong>Afdeling Vreemdelingenzaken</strong><br>Ministerie van Justitie en Politie</p></div></body></html>',
   'Beste {{applicant_name}},\n\nHartelijk dank voor het indienen van uw aanvraag voor {{application_type}}.\n\nAgendanummer: {{agenda_number}}\nIngediend op: {{submitted_date}}\nStatus: In behandeling\n\nWij hebben uw aanvraag ontvangen en deze wordt momenteel in behandeling genomen. U ontvangt een update zodra er wijzigingen zijn in de status van uw aanvraag.\n\nMet vriendelijke groet,\nAfdeling Vreemdelingenzaken\nMinisterie van Justitie en Politie',
   '["applicant_name", "application_type", "agenda_number", "submitted_date"]'::jsonb),

  ('status_update', 
   'Status Update Aanvraag', 
   'Update voor uw aanvraag - {{agenda_number}}',
   '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: linear-gradient(135deg, #7444FD 0%, #A78BFA 100%); padding: 30px; border-radius: 10px 10px 0 0;"><h1 style="color: white; margin: 0;">Vreemdelingenzaken</h1></div><div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;"><h2 style="color: #1f2937;">Status Update</h2><p style="color: #4b5563; line-height: 1.6;">Beste {{applicant_name}},</p><p style="color: #4b5563; line-height: 1.6;">De status van uw aanvraag is gewijzigd.</p><div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p style="margin: 5px 0;"><strong>Agendanummer:</strong> {{agenda_number}}</p><p style="margin: 5px 0;"><strong>Nieuwe Status:</strong> <span style="color: #7444FD; font-weight: bold;">{{new_status}}</span></p><p style="margin: 5px 0;"><strong>Bijgewerkt op:</strong> {{updated_date}}</p></div>{{#if notes}}<div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 20px 0;"><p style="margin: 0; color: #92400e;"><strong>Opmerking:</strong> {{notes}}</p></div>{{/if}}<p style="color: #4b5563; line-height: 1.6;">U kunt de status van uw aanvraag te allen tijde online controleren met uw agendanummer.</p><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"><p style="color: #6b7280; font-size: 14px;">Met vriendelijke groet,<br><strong>Afdeling Vreemdelingenzaken</strong><br>Ministerie van Justitie en Politie</p></div></body></html>',
   'Status Update\n\nBeste {{applicant_name}},\n\nDe status van uw aanvraag is gewijzigd.\n\nAgendanummer: {{agenda_number}}\nNieuwe Status: {{new_status}}\nBijgewerkt op: {{updated_date}}\n\n{{#if notes}}Opmerking: {{notes}}{{/if}}\n\nU kunt de status van uw aanvraag te allen tijde online controleren met uw agendanummer.\n\nMet vriendelijke groet,\nAfdeling Vreemdelingenzaken\nMinisterie van Justitie en Politie',
   '["applicant_name", "agenda_number", "new_status", "updated_date", "notes"]'::jsonb),

  ('document_required', 
   'Documenten Vereist', 
   'Aanvullende documenten vereist - {{agenda_number}}',
   '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: linear-gradient(135deg, #7444FD 0%, #A78BFA 100%); padding: 30px; border-radius: 10px 10px 0 0;"><h1 style="color: white; margin: 0;">Vreemdelingenzaken</h1></div><div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;"><h2 style="color: #1f2937;">Aanvullende Documenten Vereist</h2><p style="color: #4b5563; line-height: 1.6;">Beste {{applicant_name}},</p><p style="color: #4b5563; line-height: 1.6;">Voor de verdere behandeling van uw aanvraag hebben wij aanvullende documenten nodig.</p><div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p style="margin: 5px 0;"><strong>Agendanummer:</strong> {{agenda_number}}</p><p style="margin: 5px 0;"><strong>Vereiste documenten:</strong></p><ul style="color: #4b5563;">{{#each required_documents}}<li>{{this}}</li>{{/each}}</ul></div><p style="color: #4b5563; line-height: 1.6;">Gelieve de gevraagde documenten zo spoedig mogelijk in te dienen via ons online portaal.</p><div style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 4px; margin: 20px 0;"><p style="margin: 0; color: #92400e;"><strong>Let op:</strong> Uw aanvraag wordt on hold gezet totdat alle documenten zijn ontvangen.</p></div><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"><p style="color: #6b7280; font-size: 14px;">Met vriendelijke groet,<br><strong>Afdeling Vreemdelingenzaken</strong><br>Ministerie van Justitie en Politie</p></div></body></html>',
   'Aanvullende Documenten Vereist\n\nBeste {{applicant_name}},\n\nVoor de verdere behandeling van uw aanvraag hebben wij aanvullende documenten nodig.\n\nAgendanummer: {{agenda_number}}\n\nVereiste documenten:\n{{#each required_documents}}- {{this}}\n{{/each}}\n\nGelieve de gevraagde documenten zo spoedig mogelijk in te dienen via ons online portaal.\n\nLet op: Uw aanvraag wordt on hold gezet totdat alle documenten zijn ontvangen.\n\nMet vriendelijke groet,\nAfdeling Vreemdelingenzaken\nMinisterie van Justitie en Politie',
   '["applicant_name", "agenda_number", "required_documents"]'::jsonb),

  ('application_approved', 
   'Aanvraag Goedgekeurd', 
   'Uw aanvraag is goedgekeurd - {{agenda_number}}',
   '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: linear-gradient(135deg, #10B981 0%, #34D399 100%); padding: 30px; border-radius: 10px 10px 0 0;"><h1 style="color: white; margin: 0;">Vreemdelingenzaken</h1></div><div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;"><div style="text-align: center; margin-bottom: 20px;"><div style="display: inline-block; background: #D1FAE5; border-radius: 50%; width: 80px; height: 80px; line-height: 80px;"><span style="color: #10B981; font-size: 48px;">✓</span></div></div><h2 style="color: #1f2937; text-align: center;">Gefeliciteerd!</h2><p style="color: #4b5563; line-height: 1.6;">Beste {{applicant_name}},</p><p style="color: #4b5563; line-height: 1.6;">Wij zijn verheugd u te informeren dat uw aanvraag voor <strong>{{application_type}}</strong> is goedgekeurd.</p><div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p style="margin: 5px 0;"><strong>Agendanummer:</strong> {{agenda_number}}</p><p style="margin: 5px 0;"><strong>Goedgekeurd op:</strong> {{approved_date}}</p><p style="margin: 5px 0;"><strong>Geldig tot:</strong> {{expiry_date}}</p></div><p style="color: #4b5563; line-height: 1.6;">U kunt uw documenten ophalen op ons kantoor tijdens de openingstijden. Neem een geldig identificatiebewijs mee.</p><div style="background: #DBEAFE; padding: 15px; border-left: 4px solid #3B82F6; border-radius: 4px; margin: 20px 0;"><p style="margin: 0; color: #1E40AF;"><strong>Openingstijden:</strong> Maandag t/m Vrijdag, 08:00 - 14:00</p></div><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"><p style="color: #6b7280; font-size: 14px;">Met vriendelijke groet,<br><strong>Afdeling Vreemdelingenzaken</strong><br>Ministerie van Justitie en Politie</p></div></body></html>',
   'Gefeliciteerd!\n\nBeste {{applicant_name}},\n\nWij zijn verheugd u te informeren dat uw aanvraag voor {{application_type}} is goedgekeurd.\n\nAgendanummer: {{agenda_number}}\nGoedgekeurd op: {{approved_date}}\nGeldig tot: {{expiry_date}}\n\nU kunt uw documenten ophalen op ons kantoor tijdens de openingstijden. Neem een geldig identificatiebewijs mee.\n\nOpeningstijden: Maandag t/m Vrijdag, 08:00 - 14:00\n\nMet vriendelijke groet,\nAfdeling Vreemdelingenzaken\nMinisterie van Justitie en Politie',
   '["applicant_name", "application_type", "agenda_number", "approved_date", "expiry_date"]'::jsonb),

  ('application_rejected', 
   'Aanvraag Afgewezen', 
   'Status van uw aanvraag - {{agenda_number}}',
   '<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;"><div style="background: linear-gradient(135deg, #EF4444 0%, #F87171 100%); padding: 30px; border-radius: 10px 10px 0 0;"><h1 style="color: white; margin: 0;">Vreemdelingenzaken</h1></div><div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;"><h2 style="color: #1f2937;">Status Update Aanvraag</h2><p style="color: #4b5563; line-height: 1.6;">Beste {{applicant_name}},</p><p style="color: #4b5563; line-height: 1.6;">Na zorgvuldige bestudering moeten wij u helaas mededelen dat uw aanvraag niet kan worden goedgekeurd.</p><div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;"><p style="margin: 5px 0;"><strong>Agendanummer:</strong> {{agenda_number}}</p><p style="margin: 5px 0;"><strong>Aanvraag type:</strong> {{application_type}}</p><p style="margin: 5px 0;"><strong>Beslisdatum:</strong> {{decision_date}}</p></div><div style="background: #FEE2E2; padding: 15px; border-left: 4px solid #EF4444; border-radius: 4px; margin: 20px 0;"><p style="margin: 0 0 10px 0; color: #991B1B; font-weight: bold;">Reden voor afwijzing:</p><p style="margin: 0; color: #7F1D1D;">{{rejection_reason}}</p></div><p style="color: #4b5563; line-height: 1.6;">U heeft het recht om bezwaar te maken tegen deze beslissing binnen 6 weken na dagtekening van dit bericht.</p><p style="color: #4b5563; line-height: 1.6;">Voor meer informatie of vragen kunt u contact opnemen met onze afdeling.</p><hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;"><p style="color: #6b7280; font-size: 14px;">Met vriendelijke groet,<br><strong>Afdeling Vreemdelingenzaken</strong><br>Ministerie van Justitie en Politie</p></div></body></html>',
   'Status Update Aanvraag\n\nBeste {{applicant_name}},\n\nNa zorgvuldige bestudering moeten wij u helaas mededelen dat uw aanvraag niet kan worden goedgekeurd.\n\nAgendanummer: {{agenda_number}}\nAanvraag type: {{application_type}}\nBeslisdatum: {{decision_date}}\n\nReden voor afwijzing:\n{{rejection_reason}}\n\nU heeft het recht om bezwaar te maken tegen deze beslissing binnen 6 weken na dagtekening van dit bericht.\n\nVoor meer informatie of vragen kunt u contact opnemen met onze afdeling.\n\nMet vriendelijke groet,\nAfdeling Vreemdelingenzaken\nMinisterie van Justitie en Politie',
   '["applicant_name", "agenda_number", "application_type", "decision_date", "rejection_reason"]'::jsonb);