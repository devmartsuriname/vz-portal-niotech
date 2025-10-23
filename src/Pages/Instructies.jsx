import BreadCumb from "../Components/Common/BreadCumb";
import { Link } from "react-router-dom";
import { Accordion } from 'react-bootstrap';

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
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>1. Verblijfsvergunning</Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>2. Naturalisatie</Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>3. Verklaringen</Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>4. Duplicaten</Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>5. Conversie</Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>6. Asiel</Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
