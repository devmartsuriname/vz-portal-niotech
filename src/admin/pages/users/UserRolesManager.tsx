import { useState } from 'react';
import { useUserRoles, type AppRole } from '@/integrations/supabase/hooks/useUserRoles';
import PageTitle from '@/admin/components/PageTitle';
import { toast } from 'sonner';

const UserRolesManager = () => {
  const { userRoles, isLoading, assignRole, updateRole, removeRole } = useUserRoles();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    role: 'user' as AppRole,
  });

  const handleAssignRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignRole.mutateAsync({ userId: formData.userId, role: formData.role });
      toast.success('Rol toegewezen');
      setFormData({ userId: '', role: 'user' });
      setShowForm(false);
    } catch (err: any) {
      toast.error(`Fout: ${err.message}`);
    }
  };

  const handleUpdateRole = async (id: string, newRole: AppRole) => {
    try {
      await updateRole.mutateAsync({ id, role: newRole });
      toast.success('Rol bijgewerkt');
    } catch (err: any) {
      toast.error('Fout bij het bijwerken');
    }
  };

  const handleRemoveRole = async (id: string) => {
    if (confirm('Weet u zeker dat u deze rol wilt verwijderen?')) {
      try {
        await removeRole.mutateAsync(id);
        toast.success('Rol verwijderd');
      } catch (err: any) {
        toast.error('Fout bij het verwijderen');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid">
        <PageTitle subName="Admin" title="Gebruikersrollen" />
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <PageTitle subName="Admin" title="Gebruikersrollen Beheer" />

      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Gebruikersrollen</h5>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              <i className="bx bx-plus me-2"></i>
              Rol Toewijzen
            </button>
          </div>

          {showForm && (
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleAssignRole}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gebruiker ID *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.userId}
                        onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        placeholder="UUID van de gebruiker"
                        required
                      />
                      <small className="form-text text-muted">
                        Voer het UUID van de gebruiker uit de auth.users tabel in
                      </small>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Rol *</label>
                      <select
                        className="form-select"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as AppRole })}
                        required
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      <i className="bx bx-save me-2"></i>
                      Toewijzen
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                      Annuleren
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Gebruiker ID</th>
                  <th>Rol</th>
                  <th>Aangemaakt</th>
                  <th>Laatst Bijgewerkt</th>
                  <th>Acties</th>
                </tr>
              </thead>
              <tbody>
                {userRoles?.map((userRole) => (
                  <tr key={userRole.id}>
                    <td>
                      <code className="text-muted">
                        {userRole.user_id.substring(0, 8)}...
                      </code>
                    </td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={userRole.role}
                        onChange={(e) => handleUpdateRole(userRole.id, e.target.value as AppRole)}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>{new Date(userRole.created_at).toLocaleDateString('nl-NL')}</td>
                    <td>{new Date(userRole.updated_at).toLocaleDateString('nl-NL')}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveRole(userRole.id)}
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {userRoles?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      Geen gebruikersrollen gevonden
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="alert alert-info mt-4">
            <h6 className="alert-heading">
              <i className="bx bx-info-circle me-2"></i>
              Rollen Uitleg
            </h6>
            <ul className="mb-0">
              <li><strong>User:</strong> Standaard gebruiker met basis toegang</li>
              <li><strong>Moderator:</strong> Kan content en aanvragen beheren</li>
              <li><strong>Admin:</strong> Volledige toegang tot alle admin functies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRolesManager;
