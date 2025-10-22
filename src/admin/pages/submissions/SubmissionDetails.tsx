import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSubmissionDetails } from '@/integrations/supabase/hooks/useSubmissions';
import PageTitle from '@/admin/components/PageTitle';
import { toast } from 'sonner';

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  draft: { label: 'Concept', className: 'badge bg-secondary' },
  submitted: { label: 'Ingediend', className: 'badge bg-primary' },
  under_review: { label: 'In Behandeling', className: 'badge bg-warning' },
  approved: { label: 'Goedgekeurd', className: 'badge bg-success' },
  rejected: { label: 'Afgewezen', className: 'badge bg-danger' },
  additional_info_required: { label: 'Info Vereist', className: 'badge bg-info' },
};

const SubmissionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { submission, files, isLoading, error, verifyFile, updateSubmissionStatus } = useSubmissionDetails(id!);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    if (!newStatus || !submission) {
      toast.error('Selecteer een nieuwe status');
      return;
    }

    setIsUpdating(true);
    try {
      await updateSubmissionStatus.mutateAsync({
        submissionId: id!,
        oldStatus: submission.status,
        newStatus: newStatus,
        adminNotes: adminNotes || undefined,
      });
      toast.success('Status succesvol bijgewerkt en notificatie verzonden');
      setNewStatus('');
      setAdminNotes('');
    } catch (err: any) {
      toast.error('Fout bij het bijwerken van de status: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileVerification = async (fileId: string, verified: boolean) => {
    try {
      await verifyFile.mutateAsync({ fileId, isVerified: verified });
      toast.success(verified ? 'Bestand geverifieerd' : 'Verificatie verwijderd');
    } catch (err: any) {
      toast.error('Fout bij het verifiëren van het bestand');
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="container-fluid">
        <PageTitle subName="Aanvragen" title="Aanvraag Details" />
        <div className="alert alert-danger">Aanvraag niet gevonden</div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <PageTitle 
        subName="Aanvragen"
        title={`Details: ${submission.id.substring(0, 8).toUpperCase()}`} 
      />

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Aanvraag Informatie</h4>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <strong>Referentie:</strong>
                  <p className="mb-0">
                    <code className="text-primary">{submission.id.substring(0, 8).toUpperCase()}</code>
                  </p>
                </div>
                <div className="col-md-4">
                  <strong>Type:</strong>
                  <p className="mb-0">{(submission.application_types as any)?.name}</p>
                </div>
                <div className="col-md-4">
                  <strong>Status:</strong>
                  <p className="mb-0">
                    <span className={STATUS_BADGES[submission.status]?.className}>
                      {STATUS_BADGES[submission.status]?.label}
                    </span>
                  </p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <strong>Ingediend:</strong>
                  <p className="mb-0">
                    {submission.submitted_at 
                      ? new Date(submission.submitted_at).toLocaleDateString('nl-NL')
                      : 'Nog niet ingediend'}
                  </p>
                </div>
                <div className="col-md-4">
                  <strong>Aangemaakt:</strong>
                  <p className="mb-0">
                    {new Date(submission.created_at).toLocaleDateString('nl-NL')}
                  </p>
                </div>
                <div className="col-md-4">
                  <strong>Laatst Bijgewerkt:</strong>
                  <p className="mb-0">
                    {new Date(submission.updated_at).toLocaleDateString('nl-NL')}
                  </p>
                </div>
              </div>

              {submission.admin_notes && (
                <div className="alert alert-info">
                  <strong>Admin Notities:</strong>
                  <p className="mb-0 mt-2">{submission.admin_notes}</p>
                </div>
              )}

              <hr />

              <h5>Wizard Antwoorden</h5>
              {submission.wizard_answers && Object.keys(submission.wizard_answers).length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      {Object.entries(submission.wizard_answers).map(([key, value]) => (
                        <tr key={key}>
                          <td><strong>{key}</strong></td>
                          <td>{JSON.stringify(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">Geen wizard antwoorden beschikbaar</p>
              )}

              <hr />

              <h5>Aanvrager Gegevens</h5>
              {submission.applicant_data && Object.keys(submission.applicant_data).length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      {Object.entries(submission.applicant_data).map(([key, value]) => (
                        <tr key={key}>
                          <td><strong>{key}</strong></td>
                          <td>{JSON.stringify(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">Geen aanvrager gegevens beschikbaar</p>
              )}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h4 className="card-title mb-0">Ingediende Documenten</h4>
            </div>
            <div className="card-body">
              {files && files.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Bestandsnaam</th>
                        <th>Type</th>
                        <th>Grootte</th>
                        <th>Geüpload</th>
                        <th>Status</th>
                        <th>Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file) => (
                        <tr key={file.id}>
                          <td>{file.file_name}</td>
                          <td>{(file.document_types as any)?.name}</td>
                          <td>{(file.file_size_bytes / 1024).toFixed(2)} KB</td>
                          <td>{new Date(file.uploaded_at).toLocaleDateString('nl-NL')}</td>
                          <td>
                            {file.is_verified ? (
                              <span className="badge bg-success">
                                <i className="bx bx-check"></i> Geverifieerd
                              </span>
                            ) : (
                              <span className="badge bg-warning">In Afwachting</span>
                            )}
                          </td>
                          <td>
                            {!file.is_verified ? (
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleFileVerification(file.id, true)}
                              >
                                <i className="bx bx-check"></i> Verifiëren
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleFileVerification(file.id, false)}
                              >
                                <i className="bx bx-x"></i> Ongedaan maken
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">Geen documenten geüpload</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Status Bijwerken</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Nieuwe Status</label>
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Selecteer status...</option>
                  <option value="submitted">Ingediend</option>
                  <option value="under_review">In Behandeling</option>
                  <option value="approved">Goedgekeurd</option>
                  <option value="rejected">Afgewezen</option>
                  <option value="additional_info_required">Info Vereist</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Admin Notities</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Voeg een notitie toe..."
                />
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={handleStatusUpdate}
                disabled={isUpdating || !newStatus}
              >
                {isUpdating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Bijwerken...
                  </>
                ) : (
                  <>
                    <i className="bx bx-save me-2"></i>
                    Status Bijwerken
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body text-center">
              <Link to="/admin/submissions" className="btn btn-outline-secondary">
                <i className="bx bx-arrow-back me-2"></i>
                Terug naar Lijst
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
