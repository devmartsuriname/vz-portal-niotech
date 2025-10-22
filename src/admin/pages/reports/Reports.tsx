import { useState } from 'react';
import { useSubmissions } from '@/integrations/supabase/hooks/useSubmissions';
import PageTitle from '@/admin/components/PageTitle';
import SubmissionTrendsChart from '@/admin/components/charts/SubmissionTrendsChart';
import StatusDistributionChart from '@/admin/components/charts/StatusDistributionChart';
import ProcessingTimeChart from '@/admin/components/charts/ProcessingTimeChart';
import { toast } from 'sonner';

const Reports = () => {
  const { submissions, isLoading } = useSubmissions();
  const [dateRange, setDateRange] = useState('30'); // days
  const [selectedType, setSelectedType] = useState('all');

  const filteredSubmissions = submissions?.filter((sub) => {
    const submittedDate = sub.submitted_at ? new Date(sub.submitted_at) : new Date(sub.created_at);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
    
    const matchesDate = submittedDate >= daysAgo;
    const matchesType = selectedType === 'all' || sub.application_type_id === selectedType;
    
    return matchesDate && matchesType;
  });

  const handleExportCSV = () => {
    if (!filteredSubmissions || filteredSubmissions.length === 0) {
      toast.error('Geen data om te exporteren');
      return;
    }

    const headers = ['Referentie', 'Type', 'Status', 'Ingediend', 'Laatst Bijgewerkt'];
    const rows = filteredSubmissions.map((sub) => [
      sub.id.substring(0, 8).toUpperCase(),
      (sub.application_types as any)?.name || 'Onbekend',
      sub.status,
      sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString('nl-NL') : '-',
      new Date(sub.updated_at).toLocaleDateString('nl-NL'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `submissions-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    toast.success('Data geëxporteerd naar CSV');
  };

  // Calculate statistics
  const stats = {
    total: filteredSubmissions?.length || 0,
    submitted: filteredSubmissions?.filter((s) => s.status === 'submitted').length || 0,
    underReview: filteredSubmissions?.filter((s) => s.status === 'under_review').length || 0,
    approved: filteredSubmissions?.filter((s) => s.status === 'approved').length || 0,
    rejected: filteredSubmissions?.filter((s) => s.status === 'rejected').length || 0,
  };

  const approvalRate = stats.total > 0 
    ? ((stats.approved / stats.total) * 100).toFixed(1) 
    : '0';

  return (
    <div className="container-fluid">
      <PageTitle subName="Admin" title="Rapporten & Analytics" />

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Tijdsperiode</label>
          <select
            className="form-select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">Laatste 7 dagen</option>
            <option value="30">Laatste 30 dagen</option>
            <option value="90">Laatste 90 dagen</option>
            <option value="365">Laatste jaar</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Aanvraagtype</label>
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Alle Types</option>
            {/* Add more options dynamically based on available types */}
          </select>
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-success w-100" onClick={handleExportCSV}>
            <i className="bx bx-download me-2"></i>
            Exporteer naar CSV
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border"></div>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="row mb-4">
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-semibold fs-22 mb-2">{stats.total}</h4>
                      <p className="mb-0 text-muted">Totaal Aanvragen</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-primary-subtle text-primary rounded fs-3">
                        <i className="bx bx-file"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-semibold fs-22 mb-2">{stats.approved}</h4>
                      <p className="mb-0 text-muted">Goedgekeurd</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-success-subtle text-success rounded fs-3">
                        <i className="bx bx-check-circle"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-semibold fs-22 mb-2">{stats.underReview}</h4>
                      <p className="mb-0 text-muted">In Behandeling</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-warning-subtle text-warning rounded fs-3">
                        <i className="bx bx-time"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4 className="fw-semibold fs-22 mb-2">{approvalRate}%</h4>
                      <p className="mb-0 text-muted">Goedkeuringspercentage</p>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-info-subtle text-info rounded fs-3">
                        <i className="bx bx-trending-up"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Aanvragen Trend</h4>
                </div>
                <div className="card-body">
                  <SubmissionTrendsChart submissions={filteredSubmissions || []} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Status Verdeling</h4>
                </div>
                <div className="card-body">
                  <StatusDistributionChart submissions={filteredSubmissions || []} />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Verwerkingstijd per Type</h4>
                </div>
                <div className="card-body">
                  <ProcessingTimeChart submissions={filteredSubmissions || []} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
