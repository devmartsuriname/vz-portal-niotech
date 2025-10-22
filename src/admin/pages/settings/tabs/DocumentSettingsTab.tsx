import { useState, useEffect } from 'react';
import { useSystemSettings } from '@/integrations/supabase/hooks/useSystemSettings';
import { toast } from 'sonner';

const DocumentSettingsTab = () => {
  const { settings, isLoading, updateSetting } = useSystemSettings('documents');
  const [maxFileSize, setMaxFileSize] = useState(10);
  const [allowedTypes, setAllowedTypes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      const sizeSetting = settings.find(s => s.setting_key === 'max_file_size_mb');
      const typesSetting = settings.find(s => s.setting_key === 'allowed_file_types');

      setMaxFileSize(sizeSetting?.setting_value || 10);
      setAllowedTypes(typesSetting?.setting_value || []);
    }
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSetting.mutateAsync({ key: 'max_file_size_mb', value: maxFileSize });
      await updateSetting.mutateAsync({ key: 'allowed_file_types', value: allowedTypes });
      toast.success('Instellingen opgeslagen');
    } catch (error: any) {
      toast.error('Fout bij opslaan: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFileType = (type: string) => {
    if (allowedTypes.includes(type)) {
      setAllowedTypes(allowedTypes.filter(t => t !== type));
    } else {
      setAllowedTypes([...allowedTypes, type]);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  const fileTypeOptions = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];

  return (
    <div>
      <h5 className="mb-3">Document Instellingen</h5>

      <div className="mb-4">
        <label className="form-label">Maximum Bestandsgrootte (MB)</label>
        <input
          type="number"
          className="form-control"
          style={{ maxWidth: '200px' }}
          value={maxFileSize}
          onChange={(e) => setMaxFileSize(parseInt(e.target.value) || 10)}
          min="1"
          max="100"
        />
        <small className="text-muted">
          Maximale grootte voor geüploade documenten
        </small>
      </div>

      <div className="mb-4">
        <label className="form-label d-block mb-3">Toegestane Bestandstypen</label>
        {fileTypeOptions.map((type) => (
          <div key={type} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={`type-${type}`}
              checked={allowedTypes.includes(type)}
              onChange={() => toggleFileType(type)}
            />
            <label className="form-check-label" htmlFor={`type-${type}`}>
              .{type}
            </label>
          </div>
        ))}
        <div>
          <small className="text-muted">
            Selecteer welke bestandstypen gebruikers mogen uploaden
          </small>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={isSaving || allowedTypes.length === 0}
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

export default DocumentSettingsTab;
