import { useState } from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import { useIssuedPermits } from "@/integrations/supabase/hooks/useIssuedPermits";

const Vergunningen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: permits, isLoading, error } = useIssuedPermits(searchQuery);

  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Verleende Verblijfsvergunningen"
      />

      <div className="section-padding">
        <div className="container">
          {/* Search Bar */}
          <div className="row mb-4">
            <div className="col-lg-6 mx-auto">
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <i className="bx bx-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Zoek op agendanummer, naam of voornamen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <small className="text-muted d-block mt-2 text-center">
                Zoek in {permits?.length || 0} verleende vergunningen
              </small>
            </div>
          </div>

          {/* Results Table */}
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm card-hover-lift">
                <div className="card-body">
                  {isLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Laden...</span>
                      </div>
                      <p className="mt-3 text-muted">Gegevens laden...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger" role="alert">
                      <i className="bx bxs-error me-2"></i>
                      Fout bij het laden van gegevens. Probeer het later opnieuw.
                    </div>
                  ) : (
                    <>
                      {/* Desktop Table View */}
                      <div className="table-responsive d-none d-md-block">
                        <table className="table table-hover table-clickable align-middle">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Code</th>
                              <th scope="col">Agendanummer</th>
                              <th scope="col">Naam</th>
                              <th scope="col">Voornamen</th>
                            </tr>
                          </thead>
                          <tbody>
                            {permits?.map((permit) => (
                              <tr key={permit.id}>
                                <td>
                                  <span 
                                    className="badge" 
                                    style={{
                                      background: 'linear-gradient(135deg, #6c5dd3 0%, #8878ff 100%)',
                                      color: '#ffffff',
                                      fontWeight: '600'
                                    }}
                                  >
                                    {permit.code}
                                  </span>
                                </td>
                                <td>
                                  <strong>{permit.agenda_number}</strong>
                                </td>
                                <td>{permit.name}</td>
                                <td>{permit.given_names}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Card View */}
                      <div className="d-md-none">
                        {permits?.map((permit) => (
                          <div key={permit.id} className="permit-card mb-3 p-3 border rounded bg-white shadow-sm">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <span 
                                className="badge" 
                                style={{
                                  background: 'linear-gradient(135deg, #6c5dd3 0%, #8878ff 100%)',
                                  color: '#ffffff',
                                  fontWeight: '600'
                                }}
                              >
                                {permit.code}
                              </span>
                              <strong className="text-primary">{permit.agenda_number}</strong>
                            </div>
                            <div className="permit-details">
                              <div className="mb-1">
                                <small className="text-muted d-block">Naam</small>
                                <span className="fw-medium">{permit.name}</span>
                              </div>
                              <div>
                                <small className="text-muted d-block">Voornamen</small>
                                <span className="fw-medium">{permit.given_names}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {permits?.length === 0 && (
                        <div className="text-center py-5">
                          <i className="bx bx-search fs-1 text-muted"></i>
                          <p className="mt-3 text-muted">
                            Geen resultaten gevonden voor "{searchQuery}"
                          </p>
                          <p className="text-muted small">
                            Probeer een ander zoekterm of controleer de spelling
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {!isLoading && !error && permits && permits.length > 0 && (
                    <div className="mt-3 text-muted small">
                      <i className="bx bx-info-circle me-2"></i>
                      Totaal {permits.length} {permits.length === 1 ? 'vergunning' : 'vergunningen'} weergegeven
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-muted">
                  <i className="bx bx-help-circle me-2"></i>
                  Vragen over vergunningen? 
                  <a href="/contact" className="ms-1 text-decoration-none">Neem contact op</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vergunningen;
