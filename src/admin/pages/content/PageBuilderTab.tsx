import { useState } from 'react';
import { usePages } from '@/integrations/supabase/hooks/useContent';
import { PageSection, SectionType } from '@/types/pageBuilder';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import PageRenderer from '@/components/PageBuilder/PageRenderer';

const PageBuilderTab = () => {
  const { pages, isLoading, updatePage } = usePages();
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [editingSection, setEditingSection] = useState<PageSection | null>(null);

  const selectedPage = pages?.find(p => p.id === selectedPageId);

  const loadPageSections = (pageId: string) => {
    const page = pages?.find(p => p.id === pageId);
    if (page && page.sections) {
      // Type assertion for JSON from database
      setSections(Array.isArray(page.sections) ? page.sections as unknown as PageSection[] : []);
    } else {
      setSections([]);
    }
    setSelectedPageId(pageId);
    setShowPreview(false);
  };

  const addSection = (type: SectionType) => {
    let newSection: PageSection;
    const baseSection = {
      id: uuidv4(),
      type,
      order: sections.length,
    };

    switch (type) {
      case 'hero':
        newSection = {
          ...baseSection,
          type: 'hero' as const,
          props: { title: 'Hero Title', subtitle: '', alignment: 'center' as const },
        };
        break;
      case 'text':
        newSection = {
          ...baseSection,
          type: 'text' as const,
          props: { title: '', content: '<p>Enter your content here...</p>', alignment: 'left' as const },
        };
        break;
      case 'image':
        newSection = {
          ...baseSection,
          type: 'image' as const,
          props: { imageUrl: '', alt: '', alignment: 'center' as const, width: 'large' as const },
        };
        break;
      case 'cta':
        newSection = {
          ...baseSection,
          type: 'cta' as const,
          props: { title: 'Call to Action', description: '', buttonText: 'Get Started', buttonLink: '#' },
        };
        break;
      case 'faq':
        newSection = {
          ...baseSection,
          type: 'faq' as const,
          props: { title: 'Veelgestelde Vragen', showAll: true },
        };
        break;
      case 'services':
        newSection = {
          ...baseSection,
          type: 'services' as const,
          props: { title: 'Onze Diensten', displayStyle: 'cards' as const },
        };
        break;
      default:
        return;
    }
    
    setSections([...sections, newSection]);
    setEditingSection(newSection);
  };

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, ...updates } as PageSection;
      }
      return s;
    }));
  };

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter(s => s.id !== sectionId));
    if (editingSection?.id === sectionId) {
      setEditingSection(null);
    }
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    
    const newSections = [...sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    
    // Update order property
    newSections.forEach((section, idx) => {
      section.order = idx;
    });
    
    setSections(newSections);
  };

  const saveSections = async () => {
    if (!selectedPageId) return;
    
    try {
      await updatePage.mutateAsync({
        id: selectedPageId,
        updates: { sections },
      });
      toast.success('Pagina secties opgeslagen');
    } catch (err) {
      toast.error('Fout bij opslaan');
    }
  };

  if (isLoading) {
    return <div className="text-center py-4"><div className="spinner-border"></div></div>;
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <h5 className="mb-3">Selecteer Pagina</h5>
          <div className="list-group">
            {pages?.map((page) => (
              <button
                key={page.id}
                className={`list-group-item list-group-item-action ${selectedPageId === page.id ? 'active' : ''}`}
                onClick={() => loadPageSections(page.id)}
              >
                {page.title}
                <small className="d-block text-muted">/{page.slug}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-8">
          {!selectedPageId ? (
            <div className="text-center text-muted py-5">
              <i className="bx bx-file-blank display-1"></i>
              <p>Selecteer een pagina om te beginnen met bouwen</p>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Page Builder - {selectedPage?.title}</h5>
                <div className="btn-group">
                  <button 
                    className={`btn ${!showPreview ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setShowPreview(false)}
                  >
                    <i className="bx bx-edit me-1"></i> Bewerken
                  </button>
                  <button 
                    className={`btn ${showPreview ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setShowPreview(true)}
                  >
                    <i className="bx bx-show me-1"></i> Preview
                  </button>
                  <button className="btn btn-success" onClick={saveSections}>
                    <i className="bx bx-save me-1"></i> Opslaan
                  </button>
                </div>
              </div>

              {!showPreview ? (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Voeg Sectie Toe</label>
                    <div className="btn-group w-100" role="group">
                      <button className="btn btn-outline-secondary" onClick={() => addSection('hero')}>
                        <i className="bx bx-image me-1"></i> Hero
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => addSection('text')}>
                        <i className="bx bx-text me-1"></i> Tekst
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => addSection('image')}>
                        <i className="bx bx-photo-album me-1"></i> Afbeelding
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => addSection('cta')}>
                        <i className="bx bx-bullhorn me-1"></i> CTA
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => addSection('faq')}>
                        <i className="bx bx-help-circle me-1"></i> FAQ
                      </button>
                      <button className="btn btn-outline-secondary" onClick={() => addSection('services')}>
                        <i className="bx bx-briefcase me-1"></i> Diensten
                      </button>
                    </div>
                  </div>

                  <div className="sections-list">
                    {sections.length === 0 ? (
                      <div className="text-center text-muted py-4 border rounded">
                        <i className="bx bx-layer display-3"></i>
                        <p>Geen secties toegevoegd. Voeg hierboven een sectie toe om te beginnen.</p>
                      </div>
                    ) : (
                      sections.map((section, index) => (
                        <div key={section.id} className="card mb-2">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="flex-grow-1">
                                <h6 className="mb-1">
                                  <span className="badge bg-info me-2">{section.type}</span>
                                  {(section.props as any).title || `Section ${index + 1}`}
                                </h6>
                                <small className="text-muted">Order: {section.order}</small>
                              </div>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-outline-secondary"
                                  onClick={() => moveSection(section.id, 'up')}
                                  disabled={index === 0}
                                >
                                  <i className="bx bx-up-arrow-alt"></i>
                                </button>
                                <button 
                                  className="btn btn-outline-secondary"
                                  onClick={() => moveSection(section.id, 'down')}
                                  disabled={index === sections.length - 1}
                                >
                                  <i className="bx bx-down-arrow-alt"></i>
                                </button>
                                <button 
                                  className="btn btn-outline-primary"
                                  onClick={() => setEditingSection(section)}
                                >
                                  <i className="bx bx-edit"></i>
                                </button>
                                <button 
                                  className="btn btn-outline-danger"
                                  onClick={() => deleteSection(section.id)}
                                >
                                  <i className="bx bx-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {editingSection && (
                    <SectionEditor
                      section={editingSection}
                      onUpdate={(updates) => {
                        updateSection(editingSection.id, updates);
                        setEditingSection({ ...editingSection, ...updates });
                      }}
                      onClose={() => setEditingSection(null)}
                    />
                  )}
                </>
              ) : (
                <div className="border rounded p-3 bg-white">
                  <PageRenderer sections={sections} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Section Editor Component
const SectionEditor = ({ section, onUpdate, onClose }: any) => {
  const [props, setProps] = useState(section.props);

  const handleSave = () => {
    onUpdate({ props });
    onClose();
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bewerk {section.type} Sectie</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {section.type === 'hero' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Titel</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.title}
                    onChange={(e) => setProps({ ...props, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ondertitel</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.subtitle || ''}
                    onChange={(e) => setProps({ ...props, subtitle: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Achtergrond Afbeelding URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.backgroundImage || ''}
                    onChange={(e) => setProps({ ...props, backgroundImage: e.target.value })}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CTA Tekst</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={props.ctaText || ''}
                      onChange={(e) => setProps({ ...props, ctaText: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">CTA Link</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={props.ctaLink || ''}
                      onChange={(e) => setProps({ ...props, ctaLink: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === 'text' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Titel (optioneel)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.title || ''}
                    onChange={(e) => setProps({ ...props, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Inhoud (HTML)</label>
                  <textarea 
                    className="form-control" 
                    rows={6}
                    value={props.content}
                    onChange={(e) => setProps({ ...props, content: e.target.value })}
                  />
                </div>
              </>
            )}

            {section.type === 'image' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Afbeelding URL</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.imageUrl}
                    onChange={(e) => setProps({ ...props, imageUrl: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Alt Text</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.alt}
                    onChange={(e) => setProps({ ...props, alt: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bijschrift (optioneel)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.caption || ''}
                    onChange={(e) => setProps({ ...props, caption: e.target.value })}
                  />
                </div>
              </>
            )}

            {section.type === 'cta' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Titel</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.title}
                    onChange={(e) => setProps({ ...props, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Beschrijving</label>
                  <textarea 
                    className="form-control" 
                    rows={3}
                    value={props.description || ''}
                    onChange={(e) => setProps({ ...props, description: e.target.value })}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Button Tekst</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={props.buttonText}
                      onChange={(e) => setProps({ ...props, buttonText: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Button Link</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={props.buttonLink}
                      onChange={(e) => setProps({ ...props, buttonLink: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {section.type === 'faq' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Titel</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.title || ''}
                    onChange={(e) => setProps({ ...props, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categorie Filter (optioneel)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.category || ''}
                    onChange={(e) => setProps({ ...props, category: e.target.value })}
                    placeholder="Laat leeg voor alle FAQs"
                  />
                </div>
              </>
            )}

            {section.type === 'services' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Titel</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.title || ''}
                    onChange={(e) => setProps({ ...props, title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Beschrijving (optioneel)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={props.description || ''}
                    onChange={(e) => setProps({ ...props, description: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Weergave Stijl</label>
                  <select 
                    className="form-select"
                    value={props.displayStyle}
                    onChange={(e) => setProps({ ...props, displayStyle: e.target.value })}
                  >
                    <option value="cards">Kaarten</option>
                    <option value="list">Lijst</option>
                  </select>
                </div>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annuleren
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBuilderTab;
