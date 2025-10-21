import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PageTitle from '@/admin/components/PageTitle';
import { toast } from 'sonner';

const DocumentMappingManager = () => {
  const queryClient = useQueryClient();
  const [selectedAppType, setSelectedAppType] = useState<string>('all');

  // Fetch application types
  const { data: appTypes } = useQuery({
    queryKey: ['application-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('application_types')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch document mappings with related data
  const { data: mappings, isLoading } = useQuery({
    queryKey: ['document-mappings', selectedAppType],
    queryFn: async () => {
      let query = supabase
        .from('application_documents')
        .select(`
          *,
          application_types(name),
          document_types(name, description, allowed_formats, max_file_size_mb)
        `)
        .order('display_order');

      if (selectedAppType !== 'all') {
        query = query.eq('application_type_id', selectedAppType);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('application_documents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-mappings'] });
      toast.success('Mapping verwijderd');
    }
  });

  // Toggle mandatory mutation
  const toggleMandatoryMutation = useMutation({
    mutationFn: async ({ id, isMandatory }: { id: string; isMandatory: boolean }) => {
      const { error } = await supabase
        .from('application_documents')
        .update({ is_mandatory: !isMandatory })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-mappings'] });
      toast.success('Status bijgewerkt');
    }
  });

  const handleDelete = (id: string) => {
    if (confirm('Weet u zeker dat u deze mapping wilt verwijderen?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="page-content">
        <PageTitle
          title="Document Mapping Manager"
          subName="Dashboard"
        />
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <PageTitle
        title="Document Mapping Manager"
        subName="Dashboard"
      />

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h4 className="card-title mb-0">Document Mappings</h4>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end gap-2">
                    <select 
                      className="form-select form-select-sm"
                      style={{ maxWidth: '300px' }}
                      value={selectedAppType}
                      onChange={(e) => setSelectedAppType(e.target.value)}
                    >
                      <option value="all">Alle Aanvraagtypen</option>
                      {appTypes?.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                    <button className="btn btn-primary btn-sm">
                      <i className="bx bx-plus me-1"></i>
                      Nieuwe Mapping
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Aanvraagtype</th>
                      <th>Document</th>
                      <th>Formats</th>
                      <th>Max Size</th>
                      <th>Verplicht</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappings?.map((mapping) => (
                      <tr key={mapping.id}>
                        <td>{mapping.display_order}</td>
                        <td>
                          <span className="badge bg-primary">
                            {mapping.application_types?.name}
                          </span>
                        </td>
                        <td>
                          <div>
                            <strong>{mapping.document_types?.name}</strong>
                            {mapping.document_types?.description && (
                              <small className="text-muted d-block">
                                {mapping.document_types.description}
                              </small>
                            )}
                          </div>
                        </td>
                        <td>
                          <small>
                            {mapping.document_types?.allowed_formats?.join(', ')}
                          </small>
                        </td>
                        <td>
                          {mapping.document_types?.max_file_size_mb}MB
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={mapping.is_mandatory}
                              onChange={() => 
                                toggleMandatoryMutation.mutate({ 
                                  id: mapping.id, 
                                  isMandatory: mapping.is_mandatory 
                                })
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <button 
                            className="btn btn-soft-danger btn-sm"
                            onClick={() => handleDelete(mapping.id)}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(!mappings || mappings.length === 0) && (
                <div className="text-center py-5">
                  <i className="bx bx-folder-open text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="text-muted mt-3">Geen mappings gevonden</p>
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
                <div className="col-md-4">
                  <h3 className="text-primary">{mappings?.length || 0}</h3>
                  <p className="text-muted mb-0">Totaal Mappings</p>
                </div>
                <div className="col-md-4">
                  <h3 className="text-success">{mappings?.filter(m => m.is_mandatory).length || 0}</h3>
                  <p className="text-muted mb-0">Verplicht</p>
                </div>
                <div className="col-md-4">
                  <h3 className="text-info">{mappings?.filter(m => !m.is_mandatory).length || 0}</h3>
                  <p className="text-muted mb-0">Optioneel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentMappingManager;
