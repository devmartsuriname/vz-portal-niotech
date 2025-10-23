import BreadCumb from "../Components/Common/BreadCumb";
import { Link } from "react-router-dom";

const Overzicht = () => {
  const overviewCards = [
    {
      title: "Instructies",
      description: "Lees alle instructies voor het indienen van aanvragen",
      icon: "bi-book",
      link: "/instructies",
      color: "#5236FF"
    },
    {
      title: "Documentenlijsten",
      description: "Bekijk alle vereiste documenten per aanvraagtype",
      icon: "bi-file-earmark-text",
      link: "/documenten-lijsten",
      color: "#e78c45"
    },
    {
      title: "Aanvraag Indienen",
      description: "Start de digitale wizard voor uw aanvraag",
      icon: "bi-send",
      link: "/aanvraag-indienen",
      color: "#5236FF"
    },
    {
      title: "Vergunningen",
      description: "Controleer de status van uw aanvraag",
      icon: "bi-search",
      link: "/vergunningen",
      color: "#e78c45"
    },
    {
      title: "Contact",
      description: "Neem contact op met ons kantoor",
      icon: "bi-envelope",
      link: "/contact",
      color: "#5236FF"
    },
    {
      title: "Feedback",
      description: "Deel uw mening om onze diensten te verbeteren",
      icon: "bi-chat-left-text",
      link: "/feedback",
      color: "#e78c45"
    }
  ];

  return (
    <div>
      <BreadCumb
        bgimg="/assets/images/bg/breadcumgBg.png"
        Title="Overzicht"
      />

      <div className="section-padding">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="mb-3">Alle Belangrijke Informatie op Één Plaats</h2>
              <p className="text">
                Welkom op het overzichtspagina van het VZ Juspol Portal. 
                Hier vindt u snelle toegang tot alle belangrijke secties.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {overviewCards.map((card, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <Link to={card.link} className="text-decoration-none">
                  <div className="service-box style3 h-100 hover-scale">
                    <div className="icon mb-3">
                      <i 
                        className={`bi ${card.icon}`} 
                        style={{fontSize: '48px', color: card.color}}
                      ></i>
                    </div>
                    <div className="service-content">
                      <h3 className="title">{card.title}</h3>
                      <p className="text">{card.description}</p>
                      <div className="mt-3">
                        <span className="text-primary">
                          Bekijk meer <i className="bi bi-arrow-right ms-1"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <div className="cs_counter_area" style={{background: '#f8f9fa', padding: '60px 0', borderRadius: '20px'}}>
                <div className="row text-center">
                  <div className="col-md-3 col-6">
                    <div className="counter-item">
                      <h2 className="counter-number" style={{color: '#5236FF'}}>2000+</h2>
                      <p className="text">Verwerkte Aanvragen</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="counter-item">
                      <h2 className="counter-number" style={{color: '#5236FF'}}>15+</h2>
                      <p className="text">Jaar Ervaring</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="counter-item">
                      <h2 className="counter-number" style={{color: '#5236FF'}}>98%</h2>
                      <p className="text">Succesrate</p>
                    </div>
                  </div>
                  <div className="col-md-3 col-6">
                    <div className="counter-item">
                      <h2 className="counter-number" style={{color: '#5236FF'}}>24/7</h2>
                      <p className="text">Ondersteuning</p>
                    </div>
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

export default Overzicht;
