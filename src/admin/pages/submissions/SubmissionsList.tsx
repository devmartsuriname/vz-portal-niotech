import { useState, useEffect } from 'react';
import { useSubmissions } from '@/integrations/supabase/hooks/useSubmissions';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import PageTitle from '@/admin/components/PageTitle';
import TableSkeleton from '@/admin/components/ui/TableSkeleton';
import EmptyState from '@/admin/components/ui/EmptyState';
import { toast } from 'sonner';

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
  const { submissions, isLoading, error, updateSubmissionStatus } = useSubmissions();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel('submissions-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
        queryClient.invalidateQueries({ queryKey: ['submissions'] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubmissions?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubmissions?.map(s => s.id) || []);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedIds.length === 0) return;

    setIsBulkProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    try {
      for (const submissionId of selectedIds) {
        const submission = submissions?.find(s => s.id === submissionId);
        if (!submission) continue;

        try {
          await updateSubmissionStatus.mutateAsync({
            id: submissionId,
            status: bulkAction,
          });
          successCount++;
        } catch (error) {
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} aanvragen bijgewerkt`);
      }
      if (errorCount > 0) {
        toast.error(`${errorCount} aanvragen mislukt`);
      }

      setSelectedIds([]);
      setBulkAction('');
    } finally {
      setIsBulkProcessing(false);
    }
  };

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
          {/* Bulk Actions Bar */}
          {selectedIds.length > 0 && (
            <div className="alert alert-info d-flex justify-content-between align-items-center mb-3">
              <span>
                <i className="bx bx-check-square me-2"></i>
                {selectedIds.length} aanvragen geselecteerd
              </span>
              <div className="d-flex gap-2">
                <select
                  className="form-select form-select-sm"
                  style={{ width: 'auto' }}
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                >
                  <option value="">Selecteer actie...</option>
                  <option value="under_review">Zet op In Behandeling</option>
                  <option value="approved">Goedkeuren</option>
                  <option value="rejected">Afwijzen</option>
                  <option value="additional_info_required">Info Vereist</option>
                </select>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleBulkAction}
                  disabled={!bulkAction || isBulkProcessing}
                >
                  {isBulkProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Verwerken...
                    </>
                  ) : (
                    <>
                      <i className="bx bx-play me-1"></i>
                      Uitvoeren
                    </>
                  )}
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setSelectedIds([])}
                >
                  <i className="bx bx-x me-1"></i>
                  Wissen
                </button>
              </div>
            </div>
          )}

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
            <TableSkeleton rows={10} columns={6} />
          ) : filteredSubmissions && filteredSubmissions.length === 0 ? (
            <EmptyState
              icon="bx bx-file"
              title="Geen aanvragen gevonden"
              description="Er zijn nog geen aanvragen of je filterinstellingen retourneren geen resultaten."
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedIds.length === filteredSubmissions?.length && filteredSubmissions.length > 0}
                        onChange={toggleSelectAll}
                      />
                    </th>
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
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedIds.includes(submission.id)}
                          onChange={() => toggleSelect(submission.id)}
                        />
                      </td>
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
