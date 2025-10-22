import PageTitle from '@/admin/components/PageTitle';
import { useSubmissions } from '@/integrations/supabase/hooks/useSubmissions';
import { usePages, useFAQs, useAnnouncements } from '@/integrations/supabase/hooks/useContent';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { submissions, isLoading: submissionsLoading } = useSubmissions();
  const { pages, isLoading: pagesLoading } = usePages();
  const { faqs, isLoading: faqsLoading } = useFAQs();
  const { announcements, isLoading: announcementsLoading } = useAnnouncements();

  // Subscribe to realtime submissions updates
  useEffect(() => {
    const channel = supabase
      .channel('dashboard-submissions')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'submissions'
        },
        (payload) => {
          console.log('Submissions update:', payload);
          queryClient.invalidateQueries({ queryKey: ['submissions'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const submittedCount = submissions?.filter(s => s.status === 'submitted').length || 0;
  const underReviewCount = submissions?.filter(s => s.status === 'under_review').length || 0;
  const approvedCount = submissions?.filter(s => s.status === 'approved').length || 0;

  return (
    <>
      <PageTitle title="Dashboard" subName="Home" />
      
      <div className="row">
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="fw-semibold fs-22 mb-2">
                    {submissionsLoading ? '...' : submissions?.length || 0}
                  </h4>
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
                  <h4 className="fw-semibold fs-22 mb-2">
                    {submissionsLoading ? '...' : submittedCount}
                  </h4>
                  <p className="mb-0 text-muted">Ingediend</p>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-info-subtle text-info rounded fs-3">
                    <i className="bx bx-send"></i>
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
                  <h4 className="fw-semibold fs-22 mb-2">
                    {submissionsLoading ? '...' : underReviewCount}
                  </h4>
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
                  <h4 className="fw-semibold fs-22 mb-2">
                    {submissionsLoading ? '...' : approvedCount}
                  </h4>
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
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Recente Aanvragen</h4>
              <Link to="/admin/submissions" className="btn btn-sm btn-primary">
                Bekijk Alles
              </Link>
            </div>
            <div className="card-body">
              {submissionsLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm"></div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Ref</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Datum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions?.slice(0, 5).map((sub) => (
                        <tr key={sub.id}>
                          <td><code>{sub.id.substring(0, 8)}</code></td>
                          <td>{sub.application_types?.name}</td>
                          <td>
                            <span className={`badge bg-${sub.status === 'approved' ? 'success' : sub.status === 'rejected' ? 'danger' : 'info'}`}>
                              {sub.status}
                            </span>
                          </td>
                          <td>{new Date(sub.created_at).toLocaleDateString('nl-NL')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Content Overzicht</h4>
              <Link to="/admin/content" className="btn btn-sm btn-primary">
                Beheer Content
              </Link>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                <div className="avatar-sm flex-shrink-0 me-3">
                  <span className="avatar-title bg-primary-subtle text-primary rounded">
                    <i className="bx bx-file"></i>
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-0">{pagesLoading ? '...' : pages?.length || 0}</h5>
                  <p className="text-muted mb-0">Pagina's</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-3 pb-3 border-bottom">
                <div className="avatar-sm flex-shrink-0 me-3">
                  <span className="avatar-title bg-success-subtle text-success rounded">
                    <i className="bx bx-help-circle"></i>
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-0">{faqsLoading ? '...' : faqs?.length || 0}</h5>
                  <p className="text-muted mb-0">FAQs</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="avatar-sm flex-shrink-0 me-3">
                  <span className="avatar-title bg-warning-subtle text-warning rounded">
                    <i className="bx bx-megaphone"></i>
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-0">{announcementsLoading ? '...' : announcements?.length || 0}</h5>
                  <p className="text-muted mb-0">Aankondigingen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
