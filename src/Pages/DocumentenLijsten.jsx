import { useState } from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import documentsData from "../Data/documents.json";

const DocumentenLijsten = () => {
  const [filter, setFilter] = useState("all");

  const filteredDocs = filter === "all" 
    ? documentsData 
    : documentsData.filter(doc => doc.required_for.includes(filter));

  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Documentenlijsten"
      />

      <div className="section-padding">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2>Vereiste Documenten per Aanvraagtype</h2>
              <p className="text">Bekijk alle documenten die u nodig heeft voor uw aanvraag.</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <div className="btn-group flex-wrap" role="group">
                <button 
                  className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Alle Documenten
                </button>
                <button 
                  className={`btn btn-outline-primary ${filter === 'Verblijf' ? 'active' : ''}`}
                  onClick={() => setFilter('Verblijf')}
                >
                  Verblijf
                </button>
                <button 
                  className={`btn btn-outline-primary ${filter === 'Naturalisatie' ? 'active' : ''}`}
                  onClick={() => setFilter('Naturalisatie')}
                >
                  Naturalisatie
                </button>
                <button 
                  className={`btn btn-outline-primary ${filter === 'Verklaringen' ? 'active' : ''}`}
                  onClick={() => setFilter('Verklaringen')}
                >
                  Verklaringen
                </button>
                <button 
                  className={`btn btn-outline-primary ${filter === 'Asiel' ? 'active' : ''}`}
                  onClick={() => setFilter('Asiel')}
                >
                  Asiel
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Document</th>
                      <th>Categorie</th>
                      <th>Geldigheidsduur</th>
                      <th>Vertaling Vereist</th>
                      <th>Vereist Voor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc) => (
                      <tr key={doc.id}>
                        <td><strong>{doc.name}</strong></td>
                        <td>{doc.category}</td>
                        <td>{doc.validity}</td>
                        <td>{doc.translation}</td>
                        <td>
                          {doc.required_for.map((type, idx) => (
                            <span key={idx} className="badge bg-secondary me-1">
                              {type}
                            </span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentenLijsten;
