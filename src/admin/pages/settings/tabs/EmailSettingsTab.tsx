import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSystemSettings } from '@/integrations/supabase/hooks/useSystemSettings';
import { useToast } from '@/hooks/use-toast';

export const EmailSettingsTab = () => {
  const { settings, isLoading, updateSetting, testResendConnection, testSMTPConnection } = useSystemSettings('email');
  const { toast } = useToast();

  const [provider, setProvider] = useState('resend');
  
  // Resend settings
  const [resendApiKey, setResendApiKey] = useState('');
  const [resendFromEmail, setResendFromEmail] = useState('');
  const [resendFromName, setResendFromName] = useState('');

  // SMTP settings
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpSecure, setSmtpSecure] = useState(true);
  const [smtpUsername, setSmtpUsername] = useState('');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [smtpFromEmail, setSmtpFromEmail] = useState('');
  const [smtpFromName, setSmtpFromName] = useState('');

  // Wizard result recipient
  const [wizardResultRecipient, setWizardResultRecipient] = useState('');

  // Test email
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    if (settings) {
      settings.forEach(setting => {
        const value = typeof setting.setting_value === 'string' 
          ? setting.setting_value.replace(/^"|"$/g, '')
          : setting.setting_value;

        switch (setting.setting_key) {
          case 'smtp_provider':
            setProvider(value || 'resend');
            break;
          case 'resend_api_key':
            setResendApiKey(value || '');
            break;
          case 'resend_from_email':
            setResendFromEmail(value || '');
            break;
          case 'resend_from_name':
            setResendFromName(value || '');
            break;
          case 'smtp_host':
            setSmtpHost(value || '');
            break;
          case 'smtp_port':
            setSmtpPort(String(value || '587'));
            break;
          case 'smtp_secure':
            setSmtpSecure(value !== false);
            break;
          case 'smtp_username':
            setSmtpUsername(value || '');
            break;
          case 'smtp_password':
            // Don't show actual password, use placeholder if exists
            setSmtpPassword(value ? '••••••••' : '');
            break;
          case 'smtp_from_email':
            setSmtpFromEmail(value || '');
            break;
          case 'smtp_from_name':
            setSmtpFromName(value || '');
            break;
          case 'wizard_result_recipient':
            setWizardResultRecipient(value || '');
            break;
        }
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSetting.mutateAsync({ key: 'smtp_provider', value: provider });

      if (provider === 'resend') {
        if (resendApiKey) await updateSetting.mutateAsync({ key: 'resend_api_key', value: resendApiKey });
        if (resendFromEmail) await updateSetting.mutateAsync({ key: 'resend_from_email', value: resendFromEmail });
        if (resendFromName) await updateSetting.mutateAsync({ key: 'resend_from_name', value: resendFromName });
      } else {
        await updateSetting.mutateAsync({ key: 'smtp_host', value: smtpHost });
        await updateSetting.mutateAsync({ key: 'smtp_port', value: parseInt(smtpPort) });
        await updateSetting.mutateAsync({ key: 'smtp_secure', value: smtpSecure });
        await updateSetting.mutateAsync({ key: 'smtp_username', value: smtpUsername });
        // Only update password if changed (not placeholder)
        if (smtpPassword && smtpPassword !== '••••••••') {
          await updateSetting.mutateAsync({ key: 'smtp_password', value: smtpPassword });
        }
        await updateSetting.mutateAsync({ key: 'smtp_from_email', value: smtpFromEmail });
        await updateSetting.mutateAsync({ key: 'smtp_from_name', value: smtpFromName });
      }

      if (wizardResultRecipient) {
        await updateSetting.mutateAsync({ key: 'wizard_result_recipient', value: wizardResultRecipient });
      }

      toast({
        title: 'Instellingen opgeslagen',
        description: 'Email configuratie is bijgewerkt. SMTP wachtwoord is versleuteld opgeslagen.',
      });
    } catch (error: any) {
      toast({
        title: 'Fout',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleTest = async () => {
    if (!testEmail) {
      toast({
        title: 'Fout',
        description: 'Vul een test email adres in',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (provider === 'resend') {
        await testResendConnection.mutateAsync({
          apiKey: resendApiKey,
          fromEmail: resendFromEmail,
          fromName: resendFromName,
          testEmail,
        });
      } else {
        await testSMTPConnection.mutateAsync({
          host: smtpHost,
          port: parseInt(smtpPort),
          secure: smtpSecure,
          username: smtpUsername,
          password: smtpPassword,
          fromEmail: smtpFromEmail,
          fromName: smtpFromName,
          testEmail,
        });
      }

      toast({
        title: 'Test geslaagd',
        description: 'Test email succesvol verzonden',
      });
    } catch (error: any) {
      toast({
        title: 'Test mislukt',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  const isSaveDisabled = provider === 'resend' 
    ? !resendApiKey || !resendFromEmail 
    : !smtpHost || !smtpUsername || !smtpFromEmail;

  return (
    <div className="email-settings-tab">
      <h5 className="mb-4">📧 Email Configuratie</h5>

      <Form.Group className="mb-4">
        <Form.Label>Email Provider</Form.Label>
        <div>
          <Form.Check
            type="radio"
            label="Resend API (Eenvoudig)"
            name="provider"
            value="resend"
            checked={provider === 'resend'}
            onChange={(e) => setProvider(e.target.value)}
            className="mb-2"
          />
          <Form.Check
            type="radio"
            label="Hostinger SMTP (Geavanceerd)"
            name="provider"
            value="smtp"
            checked={provider === 'smtp'}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>
      </Form.Group>

      {provider === 'resend' && (
        <>
          <h6 className="mb-3">Resend API Instellingen</h6>
          <Form.Group className="mb-3">
            <Form.Label>Resend API Key *</Form.Label>
            <Form.Control
              type="password"
              value={resendApiKey}
              onChange={(e) => setResendApiKey(e.target.value)}
              placeholder="re_..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Van Email *</Form.Label>
            <Form.Control
              type="email"
              value={resendFromEmail}
              onChange={(e) => setResendFromEmail(e.target.value)}
              placeholder="noreply@vz-juspol.sr"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Van Naam *</Form.Label>
            <Form.Control
              type="text"
              value={resendFromName}
              onChange={(e) => setResendFromName(e.target.value)}
              placeholder="VZ Juspol Portal"
            />
          </Form.Group>
        </>
      )}

      {provider === 'smtp' && (
        <>
          <h6 className="mb-3">Hostinger SMTP Instellingen</h6>
          <Form.Group className="mb-3">
            <Form.Label>SMTP Host *</Form.Label>
            <Form.Control
              type="text"
              value={smtpHost}
              onChange={(e) => setSmtpHost(e.target.value)}
              placeholder="smtp.hostinger.com"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>SMTP Port *</Form.Label>
            <Form.Control
              type="number"
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              placeholder="587"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="TLS/SSL Inschakelen"
              checked={smtpSecure}
              onChange={(e) => setSmtpSecure(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gebruikersnaam *</Form.Label>
            <Form.Control
              type="text"
              value={smtpUsername}
              onChange={(e) => setSmtpUsername(e.target.value)}
              placeholder="noreply@vz-juspol.sr"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Wachtwoord *</Form.Label>
            <Form.Control
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Form.Text className="text-muted">
              {smtpPassword === '••••••••' ? '🔒 Wachtwoord is versleuteld opgeslagen in Vault' : 'Vul nieuw wachtwoord in om bij te werken'}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Van Email *</Form.Label>
            <Form.Control
              type="email"
              value={smtpFromEmail}
              onChange={(e) => setSmtpFromEmail(e.target.value)}
              placeholder="noreply@vz-juspol.sr"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Van Naam *</Form.Label>
            <Form.Control
              type="text"
              value={smtpFromName}
              onChange={(e) => setSmtpFromName(e.target.value)}
              placeholder="VZ Juspol Portal"
            />
          </Form.Group>
        </>
      )}

      <hr className="my-4" />

      <h6 className="mb-3">Wizard Result Routing</h6>
      <Form.Group className="mb-4">
        <Form.Label>Ontvanger Email *</Form.Label>
        <Form.Control
          type="email"
          value={wizardResultRecipient}
          onChange={(e) => setWizardResultRecipient(e.target.value)}
          placeholder="result@vz-juspol.sr"
        />
        <Form.Text className="text-muted">
          Wizard inzendingen worden naar dit adres doorgestuurd
        </Form.Text>
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleSave}
        disabled={updateSetting.isPending || isSaveDisabled}
      >
        {updateSetting.isPending ? 'Opslaan...' : 'Opslaan'}
      </Button>

      <hr className="my-4" />

      <div className="p-4 bg-light rounded">
        <h6 className="mb-3">🧪 Test Email Verzenden</h6>
        <Form.Group className="mb-3">
          <Form.Label>Test Email Adres</Form.Label>
          <Form.Control
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test@example.com"
          />
        </Form.Group>
        <Button
          variant="outline-primary"
          onClick={handleTest}
          disabled={(provider === 'resend' ? testResendConnection.isPending : testSMTPConnection.isPending) || !testEmail}
        >
          {(provider === 'resend' ? testResendConnection.isPending : testSMTPConnection.isPending) 
            ? 'Versturen...' 
            : 'Test Email Versturen'}
        </Button>

        {(provider === 'resend' ? resendApiKey : smtpHost) && (
          <Alert variant="success" className="mt-3 mb-0">
            ✅ {provider === 'resend' ? 'Resend API' : 'SMTP'} Geconfigureerd
          </Alert>
        )}
      </div>
    </div>
  );
};
