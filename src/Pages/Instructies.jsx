import BreadCumb from "../Components/Common/BreadCumb";
import { Link } from "react-router-dom";
import DownloadableForms from "../Components/DownloadableForms";

const Instructies = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Instructies"
      />
      
      <div className="section-padding">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2>Algemene Instructies voor Aanvragen</h2>
              <p className="text">
                Op deze pagina vindt u alle instructies voor het indienen van vreemdelingenzaken-aanvragen. 
                Volg de stappen zorgvuldig om een succesvolle aanvraag in te dienen.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="accordion" id="instructiesAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#verblijf">
                      1. Verblijfsvergunning
                    </button>
                  </h2>
                  <div id="verblijf" className="accordion-collapse collapse show" data-bs-parent="#instructiesAccordion">
                    <div className="accordion-body">
                      <h5>Vereisten:</h5>
                      <ul>
                        <li>Geldig paspoort (minimaal 6 maanden geldig)</li>
                        <li>Geboorteakte (gelegaliseerd en vertaald indien nodig)</li>
                        <li>Bewijs van ingezetenschap (niet ouder dan 6 maanden)</li>
                        <li>Pasfoto (3.5cm × 4.5cm, witte achtergrond)</li>
                        <li>VOG (Verklaring van Goed Gedrag)</li>
                        <li>Bewijs van inkomen</li>
                      </ul>
                      <h5>Kosten:</h5>
                      <p>SRD 500 (Surinaamse origine) / SRD 750 (Overige)</p>
                      <h5>Verwerkingstijd:</h5>
                      <p>4-6 weken</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#naturalisatie">
                      2. Naturalisatie
                    </button>
                  </h2>
                  <div id="naturalisatie" className="accordion-collapse collapse" data-bs-parent="#instructiesAccordion">
                    <div className="accordion-body">
                      <h5>Vereisten:</h5>
                      <ul>
                        <li>Minimaal 5 jaar onafgebroken verblijf in Suriname</li>
                        <li>Bewijs van ingezetenschap (5+ jaar)</li>
                        <li>Geldig paspoort</li>
                        <li>Geboorteakte</li>
                        <li>VOG</li>
                        <li>Bewijs van inkomen (laatste 6 maanden)</li>
                        <li>Nederlands A2 certificaat (indien niet van Surinaamse origine)</li>
                      </ul>
                      <h5>Kosten:</h5>
                      <p>SRD 1,000 (Surinaamse origine) / SRD 1,500 (Overige)</p>
                      <h5>Verwerkingstijd:</h5>
                      <p>8-12 weken</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#verklaringen">
                      3. Verklaringen
                    </button>
                  </h2>
                  <div id="verklaringen" className="accordion-collapse collapse" data-bs-parent="#instructiesAccordion">
                    <div className="accordion-body">
                      <h5>Vereisten:</h5>
                      <ul>
                        <li>Geldig paspoort</li>
                        <li>Bewijs van ingezetenschap</li>
                        <li>Aanvraagformulier (verkrijgbaar bij kantoor)</li>
                        <li>Pasfoto</li>
                      </ul>
                      <h5>Kosten:</h5>
                      <p>SRD 150</p>
                      <h5>Verwerkingstijd:</h5>
                      <p>1-2 weken</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#duplicaten">
                      4. Duplicaten
                    </button>
                  </h2>
                  <div id="duplicaten" className="accordion-collapse collapse" data-bs-parent="#instructiesAccordion">
                    <div className="accordion-body">
                      <h5>Vereisten:</h5>
                      <ul>
                        <li>Geldig paspoort</li>
                        <li>Politierapport (bij verlies of diefstal)</li>
                        <li>Origineel document (indien beschadigd)</li>
                        <li>Pasfoto</li>
                      </ul>
                      <h5>Kosten:</h5>
                      <p>SRD 200</p>
                      <h5>Verwerkingstijd:</h5>
                      <p>2-3 weken</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#conversie">
                      5. Conversie
                    </button>
                  </h2>
                  <div id="conversie" className="accordion-collapse collapse" data-bs-parent="#instructiesAccordion">
                    <div className="accordion-body">
                      <h5>Vereisten:</h5>
                      <ul>
                        <li>Geldig paspoort</li>
                        <li>Originele verblijfsvergunning</li>
                        <li>Bewijs van adreswijziging</li>
                        <li>Pasfoto</li>
                      </ul>
                      <h5>Kosten:</h5>
                      <p>SRD 300</p>
                      <h5>Verwerkingstijd:</h5>
                      <p>3-4 weken</p>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#asiel">
                      6. Asiel
                    </button>
                  </h2>
                  <div id="asiel" className="accordion-collapse collapse" data-bs-parent="#instructiesAccordion">
                    <div className="accordion-body">
                      <h5>Vereisten:</h5>
                      <ul>
                        <li>Geldig paspoort of identiteitsbewijs</li>
                        <li>Gedetailleerde verklaring van asielgronden</li>
                        <li>Ondersteunende documenten (indien beschikbaar)</li>
                        <li>Medische documenten (indien relevant)</li>
                        <li>Pasfoto</li>
                      </ul>
                      <h5>Kosten:</h5>
                      <p>Geen kosten voor asielaanvraag</p>
                      <h5>Verwerkingstijd:</h5>
                      <p>6-12 weken (afhankelijk van complexiteit)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="mb-4">Download Documentenlijsten</h3>
                <p className="text mb-4">
                  Download de volledige documentenlijst voor uw aanvraagtype. Deze checklists helpen u alle benodigde documenten te verzamelen.
                </p>
                <DownloadableForms showFilter={true} />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cs_sidebar">
                <div className="cs_sidebar_item">
                  <h3>Snelle Links</h3>
                  <ul className="cs_sidebar_links">
                    <li>
                      <Link to="/documenten-lijsten">
                        <i className="bi bi-file-earmark-text"></i> Documentenlijsten
                      </Link>
                    </li>
                    <li>
                      <Link to="/aanvraag-indienen">
                        <i className="bi bi-send"></i> Aanvraag Indienen
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        <i className="bi bi-envelope"></i> Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="cs_sidebar_item">
                  <div className="cs_cta_card">
                    <h4>Hulp nodig?</h4>
                    <p>Neem contact op met ons kantoor voor persoonlijke begeleiding.</p>
                    <Link to="/contact" className="theme-btn">
                      <span>Contact</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructies;
