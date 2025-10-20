import { Link } from "react-router-dom";

const Cta2 = () => {
    return (
        <section className="service-section-3">
        <div className="container">
            <div className="service-thumb section-padding pb-0 img-custom-anim-left wow fadeInLeft" data-wow-delay=".3s">
                <img src="/assets/images/services/servicesThumb1_1.jpg" alt="thumb" />
            </div>
        </div>
        <div className="service-container-wrapper style3  section-padding fix">
            <div className="shape1 fix"><img src="/assets/images/shape/testimonialShape2_1.png" alt="shape" /></div>
            <div className="shape2 fix"><img src="/assets/images/shape/testimonialShape2_2.png" alt="shape" /></div>
            <div className="container">
                <div className="service-wrapper style3">
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">Waarom kiezen voor ons digitale portaal?
                    </h2>
                    <p className="text wow fadeInUp" data-wow-delay=".5s">Het Ministerie van Justitie en Politie biedt u een veilige en gebruiksvriendelijke digitale omgeving om uw vreemdelingenzaken-aanvragen in te dienen. Met ons portaal kunt u 24/7 aanvragen indienen, documenten uploaden, en de status van uw aanvraag volgen. Wij waarborgen een transparant proces en snelle behandeling van alle aanvragen volgens de geldende wet- en regelgeving.</p>

                    <Link to="/instructies"> <span className="theme-btn wow fadeInUp" data-wow-delay=".3s"> Bekijk Instructies
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                fill="none">
                                <g clipPath="url(#clip0_199_944)">
                                    <path
                                        d="M11.6123 3.61183L10.8996 4.32455L14.0711 7.49604H0.000488281V8.50399H14.0711L10.8996 11.6754L11.6123 12.3882L16.0005 7.99998L11.6123 3.61183Z"
                                        fill="white"></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0_199_944">
                                        <rect width="16" height="16" fill="white" transform="translate(0.000488281)">
                                        </rect>
                                    </clipPath>
                                </defs>
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Cta2;