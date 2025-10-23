import BreadCumb from "../Components/Common/BreadCumb";
import { Link } from "react-router-dom";

const AanvraagIndienen = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Aanvraag Indienen"
      />

      <div className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mb-4">Welkom bij de Digitale Aanvraagwizard</h2>
              <p className="text mb-5">
                Met onze wizard kunt u eenvoudig en stap voor stap uw aanvraag indienen. 
                De wizard begeleidt u door het hele proces en genereert automatisch de juiste 
                documentenlijst op basis van uw antwoorden.
              </p>
            </div>
          </div>

          <div className="row mb-5 mt-5">
            <div className="col-md-4">
              <div className="feature-box style3 text-center">
                <div className="icon mb-3">
                  <i className="bi bi-list-check" style={{fontSize: '48px', color: '#5236FF'}}></i>
                </div>
                <h4>Stap 1: Beantwoord Vragen</h4>
                <p className="text">Volg de wizard en beantwoord enkele vragen over uw situatie</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box style3 text-center">
                <div className="icon mb-3">
                  <i className="bi bi-file-earmark-arrow-up" style={{fontSize: '48px', color: '#5236FF'}}></i>
                </div>
                <h4>Stap 2: Upload Documenten</h4>
                <p className="text">Upload alle vereiste documenten (PDF, max 400KB per bestand)</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box style3 text-center">
                <div className="icon mb-3">
                  <i className="bi bi-send-check" style={{fontSize: '48px', color: '#5236FF'}}></i>
                </div>
                <h4>Stap 3: Verstuur Aanvraag</h4>
                <p className="text">Ontvang direct een agenummer en bevestigingsmail</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 text-center">
              <Link to="/wizard" className="theme-btn me-3">
                <span>
                  Start Wizard
                  <i className="bi bi-arrow-right ms-2"></i>
                </span>
              </Link>
              
              <div className="mt-4">
                <Link to="/instructies" className="btn btn-outline-primary me-2">
                  <i className="bi bi-book me-2"></i>
                  Lees Instructies
                </Link>
                <Link to="/documenten-lijsten" className="btn btn-outline-primary">
                  <i className="bi bi-file-text me-2"></i>
                  Bekijk & Download Documentenlijsten
                </Link>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8 mx-auto">
              <div className="alert alert-info">
                <h5 className="alert-heading">
                  <i className="bi bi-info-circle me-2"></i>
                  Belangrijk
                </h5>
                <p className="mb-0">
                  Voordat u begint met de wizard, zorg ervoor dat u:
                </p>
                <ul className="mt-2 mb-0">
                  <li>Alle vereiste documenten in PDF-formaat heeft (max 400KB)</li>
                  <li>Een geldig e-mailadres heeft voor bevestiging</li>
                  <li>De instructies heeft gelezen voor uw aanvraagtype</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AanvraagIndienen;
