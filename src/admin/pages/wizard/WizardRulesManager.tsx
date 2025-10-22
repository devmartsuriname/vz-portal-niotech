import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PageTitle from '@/admin/components/PageTitle';
import { toast } from 'sonner';

const WizardRulesManager = () => {
  const queryClient = useQueryClient();
  const [editingRule, setEditingRule] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch wizard rules
  const { data: rules, isLoading } = useQuery({
    queryKey: ['wizard-rules-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wizard_rules')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('wizard_rules')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wizard-rules-admin'] });
      toast.success('Wizard regel verwijderd');
    },
    onError: () => {
      toast.error('Fout bij het verwijderen van wizard regel');
    }
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('wizard_rules')
        .update({ is_active: !isActive })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wizard-rules-admin'] });
      toast.success('Status bijgewerkt');
    }
  });

  const handleDelete = (id: string) => {
    if (confirm('Weet u zeker dat u deze regel wilt verwijderen?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleActive = (id: string, isActive: boolean) => {
    toggleActiveMutation.mutate({ id, isActive });
  };

  if (isLoading) {
    return (
      <>
        <PageTitle
          title="Wizard Rules Manager"
          subName="Dashboard"
        />
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="Wizard Rules Manager"
        subName="Dashboard"
      />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title mb-0">Wizard Regels</h4>
              <button className="btn btn-primary btn-sm">
                <i className="bx bx-plus me-1"></i>
                Nieuwe Regel
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Question Key</th>
                      <th>Question Text</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rules?.map((rule) => (
                      <tr key={rule.id}>
                        <td>{rule.display_order}</td>
                        <td>
                          <code className="text-primary">{rule.question_key}</code>
                        </td>
                        <td>{rule.question_text}</td>
                        <td>
                          <span className="badge bg-info">{rule.question_type}</span>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={rule.is_active}
                              onChange={() => handleToggleActive(rule.id, rule.is_active)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-soft-info"
                              onClick={() => {
                                setEditingRule(rule);
                                setShowModal(true);
                              }}
                            >
                              <i className="bx bx-edit"></i>
                            </button>
                            <button 
                              className="btn btn-soft-danger"
                              onClick={() => handleDelete(rule.id)}
                            >
                              <i className="bx bx-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(!rules || rules.length === 0) && (
                <div className="text-center py-5">
                  <i className="bx bx-info-circle text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mt-3">Geen wizard regels gevonden</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Statistieken</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <h3 className="text-primary">{rules?.length || 0}</h3>
                  <p className="text-muted mb-0">Totaal Regels</p>
                </div>
                <div className="col-md-3">
                  <h3 className="text-success">{rules?.filter(r => r.is_active).length || 0}</h3>
                  <p className="text-muted mb-0">Actief</p>
                </div>
                <div className="col-md-3">
                  <h3 className="text-warning">{rules?.filter(r => !r.is_active).length || 0}</h3>
                  <p className="text-muted mb-0">Inactief</p>
                </div>
                <div className="col-md-3">
                  <h3 className="text-info">{rules?.filter(r => r.result_application_type_id).length || 0}</h3>
                  <p className="text-muted mb-0">Terminal Questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardRulesManager;
