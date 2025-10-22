import { useState, useEffect } from 'react';
import { useSystemSettings } from '@/integrations/supabase/hooks/useSystemSettings';
import { toast } from 'sonner';

const ResendAPITab = () => {
  const { settings, isLoading, updateSetting, testResendConnection } = useSystemSettings('email');
  const [apiKey, setApiKey] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromName, setFromName] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (settings) {
      const apiKeySetting = settings.find(s => s.setting_key === 'resend_api_key');
      const fromEmailSetting = settings.find(s => s.setting_key === 'resend_from_email');
      const fromNameSetting = settings.find(s => s.setting_key === 'resend_from_name');

      setApiKey(apiKeySetting?.setting_value || '');
      setFromEmail(fromEmailSetting?.setting_value || '');
      setFromName(fromNameSetting?.setting_value || '');
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSetting.mutateAsync({ key: 'resend_api_key', value: apiKey });
      await updateSetting.mutateAsync({ key: 'resend_from_email', value: fromEmail });
      await updateSetting.mutateAsync({ key: 'resend_from_name', value: fromName });
      toast.success('Instellingen opgeslagen');
    } catch (error: any) {
      toast.error('Fout bij opslaan: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!testEmail) {
      toast.error('Voer een test email adres in');
      return;
    }

    if (!apiKey || !fromEmail || !fromName) {
      toast.error('Configureer eerst alle email instellingen');
      return;
    }

    setIsTesting(true);
    try {
      await testResendConnection.mutateAsync({
        apiKey,
        fromEmail,
        fromName,
        testEmail,
      });
      toast.success('Test email succesvol verzonden! Controleer uw inbox.');
    } catch (error: any) {
      toast.error('Fout bij versturen test email: ' + error.message);
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="alert alert-info mb-4">
        <i className="bx bx-info-circle me-2"></i>
        Configureer hier uw Resend API om email notificaties te versturen. Bezoek{' '}
        <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="alert-link">
          resend.com
        </a>{' '}
        om een API key te verkrijgen.
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <label className="form-label">
              Resend API Key <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="re_..."
            />
            <small className="text-muted">
              Uw Resend API key. Deze wordt versleuteld opgeslagen.
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Van Email Adres <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="noreply@juwdomein.com"
            />
            <small className="text-muted">
              Het email adres dat wordt gebruikt als afzender. Dit domein moet geverifieerd zijn in Resend.
            </small>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Van Naam <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="VZ Juspol Portal"
            />
            <small className="text-muted">
              De naam die wordt weergegeven als afzender.
            </small>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving || !apiKey || !fromEmail || !fromName}
            >
              {isSaving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Opslaan...
                </>
              ) : (
                <>
                  <i className="bx bx-save me-2"></i>
                  Opslaan
                </>
              )}
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bx bx-test-tube me-2"></i>
                Test Verbinding
              </h5>
              <p className="text-muted small">
                Verstuur een test email om uw configuratie te valideren.
              </p>

              <div className="mb-3">
                <label className="form-label">Test Email Adres</label>
                <input
                  type="email"
                  className="form-control"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>

              <button
                className="btn btn-success w-100"
                onClick={handleTest}
                disabled={isTesting || !testEmail || !apiKey}
              >
                {isTesting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Versturen...
                  </>
                ) : (
                  <>
                    <i className="bx bx-send me-2"></i>
                    Test Email Versturen
                  </>
                )}
              </button>

              {apiKey && (
                <div className="alert alert-success mt-3 mb-0">
                  <i className="bx bx-check-circle me-2"></i>
                  API Key Geconfigureerd
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendAPITab;
