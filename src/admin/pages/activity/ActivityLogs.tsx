import { useState } from 'react';
import { useActivityLogs } from '@/integrations/supabase/hooks/useActivityLogs';
import PageTitle from '@/admin/components/PageTitle';
import TableSkeleton from '@/admin/components/ui/TableSkeleton';
import EmptyState from '@/admin/components/ui/EmptyState';

const ACTION_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  status_change: { label: 'Status Gewijzigd', icon: 'bx bx-transfer', color: 'info' },
  file_verified: { label: 'Bestand Geverifieerd', icon: 'bx bx-check-circle', color: 'success' },
  file_uploaded: { label: 'Bestand Geüpload', icon: 'bx bx-upload', color: 'primary' },
  submission_created: { label: 'Aanvraag Aangemaakt', icon: 'bx bx-plus-circle', color: 'success' },
  submission_updated: { label: 'Aanvraag Bijgewerkt', icon: 'bx bx-edit', color: 'warning' },
  user_login: { label: 'Gebruiker Ingelogd', icon: 'bx bx-log-in', color: 'info' },
};

const ActivityLogs = () => {
  const [entityFilter, setEntityFilter] = useState('all');
  const [limit, setLimit] = useState(50);
  
  const filters = entityFilter !== 'all' ? { entityType: entityFilter, limit } : { limit };
  const { logs, isLoading } = useActivityLogs(filters);

  const getActionInfo = (actionType: string) => {
    return ACTION_LABELS[actionType] || { 
      label: actionType, 
      icon: 'bx bx-info-circle', 
      color: 'secondary' 
    };
  };

  return (
    <div className="container-fluid">
      <PageTitle subName="Admin" title="Activiteiten Log" />

      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Filter op Type</label>
              <select
                className="form-select"
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
              >
                <option value="all">Alle Activiteiten</option>
                <option value="submission">Aanvragen</option>
                <option value="user">Gebruikers</option>
                <option value="file">Bestanden</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Aantal Records</label>
              <select
                className="form-select"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton rows={10} columns={5} />
          ) : !logs || logs.length === 0 ? (
            <EmptyState
              icon="bx bx-history"
              title="Geen activiteiten gevonden"
              description="Er zijn nog geen gelogde activiteiten."
            />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Actie</th>
                    <th>Type</th>
                    <th>Details</th>
                    <th>Datum & Tijd</th>
                    <th>Gebruiker ID</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => {
                    const actionInfo = getActionInfo(log.action_type);
                    return (
                      <tr key={log.id}>
                        <td>
                          <i className={`${actionInfo.icon} text-${actionInfo.color} me-2`}></i>
                          {actionInfo.label}
                        </td>
                        <td>
                          <span className="badge bg-secondary">{log.entity_type}</span>
                        </td>
                        <td>
                          {log.old_values && log.new_values && (
                            <div className="small">
                              <span className="text-muted">Van:</span>{' '}
                              <code className="text-danger">
                                {JSON.stringify(log.old_values)}
                              </code>
                              <br />
                              <span className="text-muted">Naar:</span>{' '}
                              <code className="text-success">
                                {JSON.stringify(log.new_values)}
                              </code>
                            </div>
                          )}
                          {log.entity_id && (
                            <div className="small text-muted">
                              ID: {log.entity_id.substring(0, 8)}
                            </div>
                          )}
                        </td>
                        <td>
                          {new Date(log.created_at).toLocaleString('nl-NL', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td>
                          <code className="small">{log.user_id.substring(0, 8)}</code>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
