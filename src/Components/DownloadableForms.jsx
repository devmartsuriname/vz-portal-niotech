import { useState } from "react";
import formsData from "../Data/forms.json";

const DownloadableForms = ({ showFilter = true, categoryFilter = null }) => {
  const [filter, setFilter] = useState(categoryFilter || "all");

  const categories = ["Verblijf", "Naturalisatie", "Verklaringen", "Vestiging", "Duplicaat", "Formulieren"];

  const filteredForms = filter === "all" 
    ? formsData 
    : formsData.filter(form => form.category === filter);

  return (
    <div className="downloadable-forms-section">
      {showFilter && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="btn-group flex-wrap" role="group" aria-label="Document categorie filter">
              <button 
                className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
              >
                Alle Documenten
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`btn btn-outline-primary ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                  aria-pressed={filter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        {filteredForms.map((form) => (
          <div key={form.id} className="col-lg-4 col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center d-flex flex-column">
                <i className={`${form.icon} text-${form.color}`} style={{fontSize: '3rem'}} aria-hidden="true"></i>
                <h5 className="card-title mt-3">{form.title}</h5>
                <p className="card-text small flex-grow-1">{form.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="badge bg-info">PDF</span>
                  <a 
                    href={form.download_url} 
                    download={form.filename}
                    className="btn btn-primary btn-sm"
                    aria-label={`Download ${form.title}`}
                  >
                    <i className="bi bi-download me-1" aria-hidden="true"></i> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info text-center">
              <i className="bi bi-info-circle me-2"></i>
              Geen documenten gevonden in deze categorie.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadableForms;
