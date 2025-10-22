import { useState, useEffect } from 'react';
import { useSubmissions } from '@/integrations/supabase/hooks/useSubmissions';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import PageTitle from '@/admin/components/PageTitle';

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  draft: { label: 'Concept', className: 'badge bg-secondary' },
  submitted: { label: 'Ingediend', className: 'badge bg-primary' },
  under_review: { label: 'In Behandeling', className: 'badge bg-warning' },
  approved: { label: 'Goedgekeurd', className: 'badge bg-success' },
  rejected: { label: 'Afgewezen', className: 'badge bg-danger' },
  additional_info_required: { label: 'Info Vereist', className: 'badge bg-info' },
};

const SubmissionsList = () => {
  const queryClient = useQueryClient();
  const { submissions, isLoading, error } = useSubmissions();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const channel = supabase
      .channel('submissions-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
        queryClient.invalidateQueries({ queryKey: ['submissions'] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const filteredSubmissions = submissions?.filter((submission) => {
    const matchesSearch = searchTerm === '' || 
      submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.application_types?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <div className="container-fluid">
      <PageTitle subName="Admin" title="Aanvragen Beheer" />
        <div className="alert alert-danger">Error loading submissions: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <PageTitle subName="Admin" title="Aanvragen Beheer" />

      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Zoek op ID of type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Alle Statussen</option>
                <option value="draft">Concept</option>
                <option value="submitted">Ingediend</option>
                <option value="under_review">In Behandeling</option>
                <option value="approved">Goedgekeurd</option>
                <option value="rejected">Afgewezen</option>
                <option value="additional_info_required">Info Vereist</option>
              </select>
            </div>
            <div className="col-md-3 text-end">
              <span className="badge bg-primary fs-5">
                {filteredSubmissions?.length || 0} Aanvragen
              </span>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Laden...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Referentie</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Ingediend</th>
                    <th>Laatst Bijgewerkt</th>
                    <th>Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions?.map((submission) => (
                    <tr key={submission.id}>
                      <td>
                        <code className="text-primary">
                          {submission.id.substring(0, 8).toUpperCase()}
                        </code>
                      </td>
                      <td>{submission.application_types?.name || 'Onbekend'}</td>
                      <td>
                        <span className={STATUS_BADGES[submission.status]?.className || 'badge bg-secondary'}>
                          {STATUS_BADGES[submission.status]?.label || submission.status}
                        </span>
                      </td>
                      <td>
                        {submission.submitted_at
                          ? new Date(submission.submitted_at).toLocaleDateString('nl-NL')
                          : '-'}
                      </td>
                      <td>{new Date(submission.updated_at).toLocaleDateString('nl-NL')}</td>
                      <td>
                        <Link
                          to={`/admin/submissions/${submission.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          <i className="bx bx-show me-1"></i>
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredSubmissions?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-muted">
                        Geen aanvragen gevonden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsList;
