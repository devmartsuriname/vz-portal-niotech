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
                  <i className="bi bi-search"></i>
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
              <div className="card shadow-sm">
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
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      Fout bij het laden van gegevens. Probeer het later opnieuw.
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table className="table table-hover align-middle">
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
                                  <span className="badge bg-primary">{permit.code}</span>
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

                      {permits?.length === 0 && (
                        <div className="text-center py-5">
                          <i className="bi bi-search fs-1 text-muted"></i>
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
                      <i className="bi bi-info-circle me-2"></i>
                      Totaal {permits.length} {permits.length === 1 ? 'vergunning' : 'vergunningen'} weergegeven
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-muted">
                  <i className="bi bi-question-circle me-2"></i>
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
