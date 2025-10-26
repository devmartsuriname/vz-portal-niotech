import { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSystemSettings } from '@/integrations/supabase/hooks/useSystemSettings';
import { useToast } from '@/hooks/use-toast';

export const EmailSettingsTab = () => {
  const { settings, isLoading, updateSetting, testResendConnection, testSMTPConnection } = useSystemSettings('email');
  const { toast } = useToast();

  const [provider, setProvider] = useState('smtp'); // Default to Hostinger
  
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
            setProvider(value || 'smtp'); // Default to Hostinger
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

      // Provide contextual feedback based on configuration completeness
      const providerName = provider === 'resend' ? 'Resend API' : 'Hostinger SMTP';
      
      if (isConfigComplete) {
        toast({
          title: 'Instellingen opgeslagen',
          description: `${providerName} configuratie compleet. Emails kunnen worden verzonden.${provider === 'smtp' ? ' SMTP wachtwoord is versleuteld opgeslagen.' : ''}`,
        });
      } else {
        toast({
          title: 'Provider gewijzigd',
          description: `${providerName} geselecteerd. Vul alle vereiste velden in om emails te kunnen versturen.`,
          variant: 'default',
        });
      }
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

  // Check if provider-specific configuration is complete
  const isResendConfigComplete = resendApiKey && resendFromEmail && resendFromName;
  const isSmtpConfigComplete = smtpHost && smtpUsername && smtpFromEmail && smtpPassword && smtpPassword !== '••••••••';
  const isConfigComplete = provider === 'resend' ? isResendConfigComplete : isSmtpConfigComplete;
  
  // Allow saving provider switch even if config is incomplete
  const isSaveDisabled = updateSetting.isPending;

  return (
    <div className="email-settings-tab">
      <h5 className="mb-4">📧 Email Configuratie</h5>

      <Form.Group className="mb-4">
        <Form.Label>Email Providers</Form.Label>
        <Form.Text className="d-block mb-3 text-muted">
          Slechts één provider kan tegelijkertijd actief zijn
        </Form.Text>
        
        <div className="d-flex align-items-center mb-3">
          <Form.Check
            type="switch"
            id="resend-switch"
            label="Enable Resend API"
            checked={provider === 'resend'}
            onChange={(e) => {
              if (e.target.checked) {
                setProvider('resend');
              } else {
                setProvider('smtp'); // Auto-enable SMTP when Resend is disabled
              }
            }}
            className="me-4"
          />
        </div>
        
        <div className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="smtp-switch"
            label="Enable Hostinger SMTP (Default)"
            checked={provider === 'smtp'}
            onChange={(e) => {
              if (e.target.checked) {
                setProvider('smtp');
              } else {
                setProvider('resend'); // Auto-enable Resend when SMTP is disabled
              }
            }}
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
              disabled={provider !== 'resend'}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Van Email *</Form.Label>
            <Form.Control
              type="email"
              value={resendFromEmail}
              onChange={(e) => setResendFromEmail(e.target.value)}
              placeholder="noreply@vz-juspol.sr"
              disabled={provider !== 'resend'}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Van Naam *</Form.Label>
            <Form.Control
              type="text"
              value={resendFromName}
              onChange={(e) => setResendFromName(e.target.value)}
              placeholder="VZ Juspol Portal"
              disabled={provider !== 'resend'}
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
              disabled={provider !== 'smtp'}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>SMTP Port *</Form.Label>
            <Form.Control
              type="number"
              value={smtpPort}
              onChange={(e) => setSmtpPort(e.target.value)}
              placeholder="587"
              disabled={provider !== 'smtp'}
            />
            <Form.Text className="text-muted">587 (TLS) of 465 (SSL)</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="TLS/SSL Inschakelen"
              checked={smtpSecure}
              onChange={(e) => setSmtpSecure(e.target.checked)}
              disabled={provider !== 'smtp'}
            />
            <Form.Text className="text-muted d-block">Inschakelen voor poort 465 (SSL). Toegestaan voor poort 587 (STARTTLS)</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gebruikersnaam *</Form.Label>
            <Form.Control
              type="text"
              value={smtpUsername}
              onChange={(e) => setSmtpUsername(e.target.value)}
              placeholder="noreply@vz-juspol.sr"
              disabled={provider !== 'smtp'}
            />
            <Form.Text className="text-muted">Meestal het volledige mailbox adres</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Wachtwoord *</Form.Label>
            <Form.Control
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              placeholder="••••••••"
              disabled={provider !== 'smtp'}
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
              disabled={provider !== 'smtp'}
            />
            <Form.Text className="text-muted">Afzender adres getoond aan ontvangers</Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Van Naam *</Form.Label>
            <Form.Control
              type="text"
              value={smtpFromName}
              onChange={(e) => setSmtpFromName(e.target.value)}
              placeholder="VZ Juspol Portal"
              disabled={provider !== 'smtp'}
            />
            <Form.Text className="text-muted">Afzender naam getoond aan ontvangers</Form.Text>
          </Form.Group>
        </>
      )}

      {/* Show configuration warning if incomplete */}
      {!isConfigComplete && (
        <Alert variant="warning" className="mb-4">
          <strong>⚠️ Configuratie Onvolledig</strong>
          <p className="mb-0 mt-2">
            {provider === 'resend' 
              ? 'Vul alle Resend API velden in om emails te kunnen versturen.' 
              : 'Vul alle SMTP velden in (inclusief wachtwoord) om emails te kunnen versturen.'}
          </p>
        </Alert>
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
        disabled={isSaveDisabled}
      >
        {updateSetting.isPending 
          ? 'Opslaan...' 
          : isConfigComplete 
            ? 'Opslaan' 
            : 'Provider Opslaan (Configuratie Onvolledig)'}
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
