import { useState, useEffect } from 'react';
import { usePages, useFAQs, useAnnouncements } from '@/integrations/supabase/hooks/useContent';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import PageTitle from '@/admin/components/PageTitle';
import { toast } from 'sonner';
import ConfirmDialog from '@/admin/components/ui/ConfirmDialog';

const ContentManager = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'pages' | 'faqs' | 'announcements'>('pages');

  // Subscribe to realtime announcements updates
  useEffect(() => {
    const channel = supabase
      .channel('content-manager-announcements')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'announcements'
        },
        (payload) => {
          console.log('Announcements realtime update:', payload);
          queryClient.invalidateQueries({ queryKey: ['announcements'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <div className="container-fluid">
      <PageTitle subName="Admin" title="Content Beheer" />

      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'pages' ? 'active' : ''}`}
                onClick={() => setActiveTab('pages')}
              >
                <i className="bx bx-file me-2"></i>
                Pagina's
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'faqs' ? 'active' : ''}`}
                onClick={() => setActiveTab('faqs')}
              >
                <i className="bx bx-help-circle me-2"></i>
                FAQs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'announcements' ? 'active' : ''}`}
                onClick={() => setActiveTab('announcements')}
              >
                <i className="bx bx-megaphone me-2"></i>
                Aankondigingen
              </button>
            </li>
          </ul>

          {activeTab === 'pages' && <PagesTab />}
          {activeTab === 'faqs' && <FAQsTab />}
          {activeTab === 'announcements' && <AnnouncementsTab />}
        </div>
      </div>
    </div>
  );
};

const PagesTab = () => {
  const { pages, isLoading, createPage, updatePage, deletePage } = usePages();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ 
    isOpen: false, 
    id: null 
  });
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    is_published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePage.mutateAsync({ id: editingId, updates: formData });
        toast.success('Pagina bijgewerkt');
      } else {
        await createPage.mutateAsync(formData);
        toast.success('Pagina aangemaakt');
      }
      resetForm();
    } catch (err: any) {
      toast.error('Fout bij het opslaan');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', slug: '', content: '', meta_description: '', is_published: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (page: any) => {
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content || '',
      meta_description: page.meta_description || '',
      is_published: page.is_published,
    });
    setEditingId(page.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    
    try {
      await deletePage.mutateAsync(deleteConfirm.id);
      toast.success('Pagina verwijderd');
    } catch (err: any) {
      toast.error('Fout bij het verwijderen');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  if (isLoading) {
    return <div className="text-center py-4"><div className="spinner-border"></div></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Pagina's Beheer</h5>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <i className="bx bx-plus me-2"></i>
          Nieuwe Pagina
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Titel *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Slug *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Meta Beschrijving</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Inhoud</label>
                <textarea
                  className="form-control"
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="is_published">
                  Gepubliceerd
                </label>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  <i className="bx bx-save me-2"></i>
                  Opslaan
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Annuleren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Aangemaakt</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {pages?.map((page) => (
              <tr key={page.id}>
                <td>{page.title}</td>
                <td><code>{page.slug}</code></td>
                <td>
                  {page.is_published ? (
                    <span className="badge bg-success">Gepubliceerd</span>
                  ) : (
                    <span className="badge bg-secondary">Concept</span>
                  )}
                </td>
                <td>{new Date(page.created_at).toLocaleDateString('nl-NL')}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(page)}>
                    <i className="bx bx-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(page.id)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FAQsTab = () => {
  const { faqs, isLoading, createFAQ, updateFAQ, deleteFAQ } = useFAQs();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ 
    isOpen: false, 
    id: null 
  });
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    display_order: 0,
    is_published: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateFAQ.mutateAsync({ id: editingId, updates: formData });
        toast.success('FAQ bijgewerkt');
      } else {
        await createFAQ.mutateAsync(formData);
        toast.success('FAQ aangemaakt');
      }
      resetForm();
    } catch (err: any) {
      toast.error('Fout bij het opslaan');
    }
  };

  const resetForm = () => {
    setFormData({ question: '', answer: '', category: '', display_order: 0, is_published: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (faq: any) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      display_order: faq.display_order,
      is_published: faq.is_published,
    });
    setEditingId(faq.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    
    try {
      await deleteFAQ.mutateAsync(deleteConfirm.id);
      toast.success('FAQ verwijderd');
    } catch (err: any) {
      toast.error('Fout bij het verwijderen');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  if (isLoading) {
    return <div className="text-center py-4"><div className="spinner-border"></div></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">FAQs Beheer</h5>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <i className="bx bx-plus me-2"></i>
          Nieuwe FAQ
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Vraag *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Antwoord *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Categorie</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Volgorde</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="faq_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="faq_published">
                  Gepubliceerd
                </label>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  <i className="bx bx-save me-2"></i>
                  Opslaan
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Annuleren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Vraag</th>
              <th>Categorie</th>
              <th>Volgorde</th>
              <th>Status</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {faqs?.map((faq) => (
              <tr key={faq.id}>
                <td>{faq.question}</td>
                <td>{faq.category || '-'}</td>
                <td>{faq.display_order}</td>
                <td>
                  {faq.is_published ? (
                    <span className="badge bg-success">Gepubliceerd</span>
                  ) : (
                    <span className="badge bg-secondary">Concept</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(faq)}>
                    <i className="bx bx-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(faq.id)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AnnouncementsTab = () => {
  const { announcements, isLoading, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ 
    isOpen: false, 
    id: null 
  });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'info',
    starts_at: '',
    ends_at: '',
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateAnnouncement.mutateAsync({ id: editingId, updates: formData });
        toast.success('Aankondiging bijgewerkt');
      } else {
        await createAnnouncement.mutateAsync(formData);
        toast.success('Aankondiging aangemaakt');
      }
      resetForm();
    } catch (err: any) {
      toast.error('Fout bij het opslaan');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', type: 'info', starts_at: '', ends_at: '', is_active: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (announcement: any) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      type: announcement.type || 'info',
      starts_at: announcement.starts_at || '',
      ends_at: announcement.ends_at || '',
      is_active: announcement.is_active,
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteConfirm({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    
    try {
      await deleteAnnouncement.mutateAsync(deleteConfirm.id);
      toast.success('Aankondiging verwijderd');
    } catch (err: any) {
      toast.error('Fout bij het verwijderen');
    } finally {
      setDeleteConfirm({ isOpen: false, id: null });
    }
  };

  if (isLoading) {
    return <div className="text-center py-4"><div className="spinner-border"></div></div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Aankondigingen Beheer</h5>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <i className="bx bx-plus me-2"></i>
          Nieuwe Aankondiging
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Titel *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Inhoud *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="info">Info</option>
                    <option value="warning">Waarschuwing</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Start Datum</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.starts_at}
                    onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Eind Datum</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.ends_at}
                    onChange={(e) => setFormData({ ...formData, ends_at: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="announcement_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="announcement_active">
                  Actief
                </label>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  <i className="bx bx-save me-2"></i>
                  Opslaan
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Annuleren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Titel</th>
              <th>Type</th>
              <th>Start</th>
              <th>Eind</th>
              <th>Status</th>
              <th>Acties</th>
            </tr>
          </thead>
          <tbody>
            {announcements?.map((announcement) => (
              <tr key={announcement.id}>
                <td>{announcement.title}</td>
                <td>
                  <span className={`badge bg-${announcement.type === 'urgent' ? 'danger' : announcement.type === 'warning' ? 'warning' : 'info'}`}>
                    {announcement.type}
                  </span>
                </td>
                <td>{announcement.starts_at ? new Date(announcement.starts_at).toLocaleDateString('nl-NL') : '-'}</td>
                <td>{announcement.ends_at ? new Date(announcement.ends_at).toLocaleDateString('nl-NL') : '-'}</td>
                <td>
                  {announcement.is_active ? (
                    <span className="badge bg-success">Actief</span>
                  ) : (
                    <span className="badge bg-secondary">Inactief</span>
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(announcement)}>
                    <i className="bx bx-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(announcement.id)}>
                    <i className="bx bx-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Aankondiging Verwijderen"
        message="Weet u zeker dat u deze aankondiging wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, id: null })}
      />
    </div>
  );
};

export default ContentManager;
