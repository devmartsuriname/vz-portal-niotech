import { useState, useEffect } from 'react';
import { useSystemSettings } from '@/integrations/supabase/hooks/useSystemSettings';
import { toast } from 'sonner';

const GeneralSettingsTab = () => {
  const { settings, isLoading, updateSetting } = useSystemSettings('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      const maintenanceSetting = settings.find(s => s.setting_key === 'maintenance_mode');
      setMaintenanceMode(maintenanceSetting?.setting_value || false);
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSetting.mutateAsync({ key: 'maintenance_mode', value: maintenanceMode });
      toast.success('Instellingen opgeslagen');
    } catch (error: any) {
      toast.error('Fout bij opslaan: ' + error.message);
    } finally {
      setIsSaving(false);
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
      <h5 className="mb-3">Algemene Instellingen</h5>

      <div className="card bg-light mb-4">
        <div className="card-body">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="maintenanceMode"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="maintenanceMode">
              <strong>Onderhoudsmodus</strong>
            </label>
          </div>
          <small className="text-muted">
            Wanneer ingeschakeld, kunnen alleen beheerders het systeem gebruiken.
            Gebruikers zien een onderhoudspagina.
          </small>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={isSaving}
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
  );
};

export default GeneralSettingsTab;
