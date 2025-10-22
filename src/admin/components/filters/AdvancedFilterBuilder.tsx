import { useState } from 'react';
import { useSavedFilters } from '@/integrations/supabase/hooks/useSavedFilters';
import { toast } from 'sonner';

interface FilterRule {
  field: string;
  operator: string;
  value: string;
}

interface AdvancedFilterBuilderProps {
  entityType: string;
  fields: { value: string; label: string }[];
  onApplyFilter: (rules: FilterRule[]) => void;
}

const AdvancedFilterBuilder = ({ entityType, fields, onApplyFilter }: AdvancedFilterBuilderProps) => {
  const { filters, saveFilter, deleteFilter } = useSavedFilters(entityType);
  const [rules, setRules] = useState<FilterRule[]>([
    { field: '', operator: 'equals', value: '' }
  ]);
  const [filterName, setFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const operators = [
    { value: 'equals', label: 'Gelijk aan' },
    { value: 'contains', label: 'Bevat' },
    { value: 'starts_with', label: 'Begint met' },
    { value: 'ends_with', label: 'Eindigt met' },
    { value: 'greater_than', label: 'Groter dan' },
    { value: 'less_than', label: 'Kleiner dan' },
  ];

  const addRule = () => {
    setRules([...rules, { field: '', operator: 'equals', value: '' }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, updates: Partial<FilterRule>) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], ...updates };
    setRules(newRules);
  };

  const handleApply = () => {
    const validRules = rules.filter(r => r.field && r.value);
    onApplyFilter(validRules);
    toast.success('Filter toegepast');
  };

  const handleSave = async () => {
    if (!filterName.trim()) {
      toast.error('Voer een filternaam in');
      return;
    }

    try {
      await saveFilter.mutateAsync({
        name: filterName,
        filter_config: { rules },
      });
      toast.success('Filter opgeslagen');
      setShowSaveDialog(false);
      setFilterName('');
    } catch (error) {
      toast.error('Fout bij opslaan filter');
    }
  };

  const loadSavedFilter = (filter: any) => {
    setRules(filter.filter_config.rules);
    onApplyFilter(filter.filter_config.rules);
    toast.success(`Filter "${filter.name}" geladen`);
  };

  const handleDeleteFilter = async (id: string) => {
    if (confirm('Weet u zeker dat u dit filter wilt verwijderen?')) {
      try {
        await deleteFilter.mutateAsync(id);
        toast.success('Filter verwijderd');
      } catch (error) {
        toast.error('Fout bij verwijderen filter');
      }
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Geavanceerde Filters</h5>
        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowSaveDialog(!showSaveDialog)}>
          <i className="bx bx-save me-1"></i>
          Filter Opslaan
        </button>
      </div>
      <div className="card-body">
        {/* Saved Filters */}
        {filters && filters.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Opgeslagen Filters</label>
            <div className="d-flex flex-wrap gap-2">
              {filters.map((filter) => (
                <div key={filter.id} className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => loadSavedFilter(filter)}
                  >
                    {filter.name}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteFilter(filter.id)}
                  >
                    <i className="bx bx-x"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Dialog */}
        {showSaveDialog && (
          <div className="alert alert-info mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Filternaam..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSave}>
                Opslaan
              </button>
              <button className="btn btn-secondary" onClick={() => setShowSaveDialog(false)}>
                Annuleren
              </button>
            </div>
          </div>
        )}

        {/* Filter Rules */}
        {rules.map((rule, index) => (
          <div key={index} className="row g-2 mb-2">
            <div className="col-md-4">
              <select
                className="form-select"
                value={rule.field}
                onChange={(e) => updateRule(index, { field: e.target.value })}
              >
                <option value="">Selecteer veld...</option>
                {fields.map((field) => (
                  <option key={field.value} value={field.value}>
                    {field.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={rule.operator}
                onChange={(e) => updateRule(index, { operator: e.target.value })}
              >
                {operators.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Waarde..."
                value={rule.value}
                onChange={(e) => updateRule(index, { value: e.target.value })}
              />
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => removeRule(index)}
                disabled={rules.length === 1}
              >
                <i className="bx bx-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-outline-secondary" onClick={addRule}>
            <i className="bx bx-plus me-1"></i>
            Regel Toevoegen
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            <i className="bx bx-filter me-1"></i>
            Filter Toepassen
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setRules([{ field: '', operator: 'equals', value: '' }]);
              onApplyFilter([]);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterBuilder;
