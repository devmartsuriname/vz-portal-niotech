import { useState } from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import { useDocumentsList } from "@/integrations/supabase/hooks/useDocumentsList";

const DocumentenLijsten = () => {
  const [filter, setFilter] = useState("all");
  const { data: documents, isLoading, error } = useDocumentsList(filter);

  const filterOptions = [
    { value: 'all', label: 'Alle Documenten' },
    { value: 'Verblijf', label: 'Verblijf' },
    { value: 'Naturalisatie', label: 'Naturalisatie' },
    { value: 'Verklaring', label: 'Verklaringen' },
    { value: 'Asiel', label: 'Asiel' },
    { value: 'Duplicaat', label: 'Duplicaat' },
  ];

  // Get unique checklist for current context
  const getChecklistUrl = (doc) => {
    if (!doc.checklists || doc.checklists.length === 0) return null;
    
    // If filter is active, prefer matching checklist
    if (filter !== 'all') {
      const matching = doc.checklists.find(c => 
        c.application_type.toLowerCase().includes(filter.toLowerCase())
      );
      if (matching) return matching.pdf_url;
    }
    
    // Otherwise return first available
    return doc.checklists[0]?.pdf_url;
  };

  if (error) {
    return (
      <div>
        <BreadCumb
          bgimg="/assets/images/bg/breadcumgBg.png"
          Title="Documentenlijsten"
        />
        <div className="section-padding">
          <div className="container">
            <div className="alert alert-danger">
              Er is een fout opgetreden bij het laden van de documenten. Probeer het later opnieuw.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Documentenlijsten"
      />

      <div className="section-padding">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-center">
              <h2>Vereiste Documenten per Aanvraagtype</h2>
              <p className="text">
                Bekijk alle documenten die u nodig heeft voor uw aanvraag. Selecteer een categorie om de lijst te filteren.
              </p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <div className="vz-filter-buttons" role="group" aria-label="Filter documenten">
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    className={`btn btn-outline-primary ${filter === option.value ? 'active' : ''}`}
                    onClick={() => setFilter(option.value)}
                    aria-pressed={filter === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {isLoading ? (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Beschrijving</th>
                        <th>Toegestane Formaten</th>
                        <th>Max. Bestandsgrootte</th>
                        <th>Verplicht</th>
                        <th>Vereist Voor</th>
                        <th>Download Checklist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i}>
                          <td><div className="placeholder-glow"><span className="placeholder col-8"></span></div></td>
                          <td><div className="placeholder-glow"><span className="placeholder col-10"></span></div></td>
                          <td><div className="placeholder-glow"><span className="placeholder col-6"></span></div></td>
                          <td><div className="placeholder-glow"><span className="placeholder col-4"></span></div></td>
                          <td><div className="placeholder-glow"><span className="placeholder col-6"></span></div></td>
                          <td><div className="placeholder-glow"><span className="placeholder col-12"></span></div></td>
                          <td><div className="placeholder-glow"><span className="placeholder col-5"></span></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Beschrijving</th>
                        <th>Toegestane Formaten</th>
                        <th>Max. Bestandsgrootte</th>
                        <th>Verplicht</th>
                        <th>Vereist Voor</th>
                        <th>Download Checklist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents && documents.length > 0 ? (
                        documents.map((doc) => {
                          const checklistUrl = getChecklistUrl(doc);
                          
                          return (
                            <tr key={doc.id}>
                              <td data-label="Document"><strong>{doc.name}</strong></td>
                              <td data-label="Beschrijving">{doc.description || '-'}</td>
                              <td data-label="Toegestane Formaten">
                                <div className="vz-badge-container">
                                  {doc.allowed_formats.map((format, idx) => (
                                    <span key={idx} className="badge bg-info">
                                      {format.toUpperCase()}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td data-label="Max. Bestandsgrootte">{doc.max_file_size_mb} MB</td>
                              <td data-label="Verplicht">
                                {doc.is_required ? (
                                  <span className="badge bg-danger">Verplicht</span>
                                ) : (
                                  <span className="badge bg-secondary">Optioneel</span>
                                )}
                              </td>
                              <td data-label="Vereist Voor">
                                <div className="vz-badge-container">
                                  {doc.application_types.map((type, idx) => (
                                    <span key={idx} className="badge bg-secondary">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td data-label="Download Checklist">
                                {checklistUrl ? (
                                  <a 
                                    href={checklistUrl}
                                    download
                                    className="btn btn-sm btn-primary"
                                    title="Download checklist"
                                    aria-label={`Download checklist voor ${doc.name}`}
                                  >
                                    <i className="bi bi-download" aria-hidden="true"></i> PDF
                                  </a>
                                ) : (
                                  <span className="text-muted small">Geen checklist</span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center text-muted py-4">
                            Geen documenten gevonden voor dit filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Summary Section */}
          {documents && documents.length > 0 && (
            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <strong>Totaal:</strong> {documents.length} document{documents.length !== 1 ? 'en' : ''} gevonden
                  {filter !== 'all' && ` voor categorie "${filterOptions.find(o => o.value === filter)?.label}"`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentenLijsten;
