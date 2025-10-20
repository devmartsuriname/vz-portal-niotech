import { useState } from "react";
import BreadCumb from "../Components/Common/BreadCumb";
import { toast } from "sonner";

const Vergunningen = () => {
  const [ageNumber, setAgeNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast.info("Deze functionaliteit wordt geactiveerd in Phase 2", {
        description: "Momenteel is dit een frontend prototype"
      });
    }, 1500);
  };

  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Vergunningen Controleren"
      />

      <div className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body p-5">
                  <h2 className="text-center mb-4">Controleer Uw Status</h2>
                  <p className="text-center text mb-4">
                    Voer uw agenummer in om de status van uw aanvraag te controleren.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="ageNumber" className="form-label">
                        Agenummer *
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="ageNumber"
                        placeholder="VZ-2025-001234"
                        value={ageNumber}
                        onChange={(e) => setAgeNumber(e.target.value)}
                        required
                      />
                      <small className="form-text text-muted">
                        Formaat: VZ-YYYY-XXXXXX (bijv. VZ-2025-001234)
                      </small>
                    </div>

                    <button 
                      type="submit" 
                      className="theme-btn w-100"
                      disabled={loading}
                    >
                      <span>
                        {loading ? "Controleren..." : "Controleer Status"}
                        {!loading && <i className="bi bi-search ms-2"></i>}
                      </span>
                    </button>
                  </form>

                  <div className="mt-4 p-3 bg-light rounded">
                    <h6 className="mb-2">
                      <i className="bi bi-info-circle text-primary me-2"></i>
                      Status zal hier verschijnen
                    </h6>
                    <p className="text-muted mb-0 small">
                      In Phase 2 zal hier de actuele status van uw aanvraag worden weergegeven, 
                      inclusief verwachte behandeltijd en eventuele opmerkingen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text">
                  <i className="bi bi-question-circle me-2"></i>
                  Geen agenummer? 
                  <a href="/contact" className="ms-1">Neem contact op</a>
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
