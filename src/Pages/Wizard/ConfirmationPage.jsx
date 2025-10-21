import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import BreadCumb from '@/Components/Common/BreadCumb';

const ConfirmationPage = () => {
  const { submissionId } = useParams();

  useEffect(() => {
    // Clear wizard progress from localStorage
    localStorage.removeItem('wizard_progress');
  }, []);

  const agendaNumber = submissionId ? `AGN-${submissionId.substring(0, 8).toUpperCase()}` : 'PENDING';

  return (
    <>
      <BreadCumb Title="Bevestiging" />
      <div className="wizard-breadcrumb-spacer" />
      
      <section className="py-20">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
                </div>
                
                <h1 className="mb-3">Aanvraag Succesvol Ingediend!</h1>
                <p className="lead text-muted mb-4">
                  Uw aanvraag is ontvangen en wordt verwerkt.
                </p>

                <div className="card shadow-sm mb-4">
                  <div className="card-body p-5">
                    <h4 className="mb-3">Uw Agendanummer</h4>
                    <div className="p-4 bg-light rounded">
                      <h2 className="text-primary mb-0 font-monospace">{agendaNumber}</h2>
                    </div>
                    <p className="text-muted mt-3 mb-0">
                      Bewaar dit nummer voor toekomstige referentie
                    </p>
                  </div>
                </div>

                <div className="alert alert-info text-start mb-4">
                  <h5 className="alert-heading">
                    <i className="bi bi-info-circle me-2"></i>
                    Wat gebeurt er nu?
                  </h5>
                  <ul className="mb-0 ps-3">
                    <li>U ontvangt een bevestigingsmail op het opgegeven e-mailadres</li>
                    <li>Uw documenten worden gecontroleerd door onze medewerkers</li>
                    <li>U krijgt binnen 2-5 werkdagen een statusupdate</li>
                    <li>Bij vragen kunt u contact opnemen via uw agendanummer</li>
                  </ul>
                </div>

                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/" className="btn btn-primary btn-lg">
                    <i className="bi bi-house me-2"></i>
                    Terug naar Home
                  </Link>
                  <Link to="/overzicht" className="btn btn-outline-primary btn-lg">
                    <i className="bi bi-list-check me-2"></i>
                    Mijn Aanvragen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmationPage;
