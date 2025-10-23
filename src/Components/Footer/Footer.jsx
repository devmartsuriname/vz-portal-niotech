import { Link } from "react-router-dom";
import servicesData from "../../Data/services.json";

const Footer = () => {
    return (
        <footer className="footer-section position-relative">
            <div className="footer-widgets-wrapper style1 fix">
                <div className="shape1"><img src="/assets/images/shape/footerShape1_1.png" alt="shape" /></div>
                <div className="shape2"><img src="/assets/images/shape/footerShape1_2.png" alt="shape" /></div>
                <div className="shape3"><img src="/assets/images/shape/footerShape1_3.png" alt="shape" /></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <Link to="/">
                                        <img src="/assets/branding/logo-vz.svg" alt="Vreemdelingen Zaken Suriname" />
                                    </Link>
                                </div>
                                <div className="footer-content">
                                    <p>
                                        Vreemdelingenzaken van het Ministerie van Justitie en Politie faciliteert 
                                        alle verblijfs-, vestigings- en naturalisatieverzoeken voor Suriname.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3> Snelle Links </h3>
                                </div>
                                <ul className="list-area">
                                    <li>
                                        <Link to="/aanvraag-indienen">
                                            Aanvraag Indienen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/instructies">
                                            Instructies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/documenten-lijsten">
                                            Documenten Lijsten
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/vergunningen">
                                            Vergunningen
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/feedback">
                                            Feedback
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                            <div className="single-footer-widget">
                                <div className="widget-head">
                                    <h3> Diensten </h3>
                                </div>
                                <ul className="list-area">
                                    {servicesData.map((service) => (
                                        <li key={service.id}>
                                            <Link to={service.link}>
                                                {service.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-footer-widget">
                                <div className="contact-box">
                                    <div className="subtitle">Contactgegevens</div>
                                    <div className="widget-head">Neem contact op</div>
                                    <div className="text">
                                        Openingstijden: Maandag - Vrijdag: 08:00 - 15:00
                                    </div>
                                    <div className="info">
                                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <path d="M11 5.5L15.09 8.26L14 14H8L6.91 8.26L11 5.5Z" fill="none" stroke="#7444FD" strokeWidth="2"/>
                                                <circle cx="11" cy="11.5" r="9" fill="none" stroke="#7444FD" strokeWidth="2"/>
                                            </svg>
                                        </div>
                                        <div className="link">
                                            Onafhankelijkheidsplein 1<br/>
                                            Paramaribo, Suriname
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <path d="M3.66671 4.16699H18.3334C19.3417 4.16699 20.1667 4.99199 20.1667 6.00033V17.0003C20.1667 18.0087 19.3417 18.8337 18.3334 18.8337H3.66671C2.65837 18.8337 1.83337 18.0087 1.83337 17.0003V6.00033C1.83337 4.99199 2.65837 4.16699 3.66671 4.16699Z" stroke="#7444FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M20.1667 6L11 12.4167L1.83337 6" stroke="#7444FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className="link">
                                            <a href="mailto:info@juspol.sr">info@juspol.sr</a>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
                                                <g clipPath="url(#clip0_2011_91)">
                                                    <path d="M13.7959 5.08366C14.6912 5.25834 15.514 5.69623 16.1591 6.34127C16.8041 6.9863 17.242 7.80915 17.4167 8.70449L13.7959 5.08366ZM13.7959 1.41699C15.656 1.62364 17.3906 2.45665 18.7149 3.77925C20.0392 5.10185 20.8744 6.83542 21.0834 8.69533L13.7959 1.41699ZM20.1667 16.0103V18.7603C20.1677 19.0156 20.1154 19.2683 20.0132 19.5022C19.9109 19.7361 19.7609 19.9461 19.5728 20.1187C19.3846 20.2913 19.1625 20.4227 18.9207 20.5045C18.6789 20.5863 18.4226 20.6166 18.1684 20.5937C15.3476 20.2872 12.6381 19.3233 10.2575 17.7795C8.0427 16.3721 6.16491 14.4943 4.75752 12.2795C3.20833 9.8881 2.24424 7.1654 1.94335 4.33199C1.92045 4.0785 1.95057 3.82302 2.03181 3.58181C2.11305 3.34061 2.24363 3.11896 2.41522 2.93098C2.58682 2.743 2.79567 2.59281 3.0285 2.48997C3.26132 2.38713 3.513 2.3339 3.76752 2.33366H6.51752C6.96238 2.32928 7.39366 2.48681 7.73097 2.7769C8.06827 3.06698 8.28859 3.46982 8.35085 3.91033C8.46692 4.79039 8.68218 5.65449 8.99252 6.48616C9.11585 6.81426 9.14254 7.17083 9.06943 7.51363C8.99632 7.85643 8.82648 8.17109 8.58002 8.42033L7.41585 9.58449C8.72078 11.8794 10.6209 13.7796 12.9159 15.0845L14.08 13.9203C14.3293 13.6739 14.6439 13.504 14.9867 13.4309C15.3295 13.3578 15.6861 13.3845 16.0142 13.5078C16.8459 13.8182 17.71 14.0334 18.59 14.1495C19.0353 14.2123 19.442 14.4366 19.7327 14.7797C20.0234 15.1228 20.1778 15.5608 20.1667 16.0103Z" stroke="#7444FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2011_91">
                                                        <rect width="22" height="22" fill="white" transform="translate(0 0.5)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="link">
                                            <a href="tel:+5974722211">+597 472-211</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom style1">
                <div className="container">
                    <div className="footer-wrapper d-flex align-items-center justify-content-between">
                        <p className="wow fadeInLeft" data-wow-delay=".3s">
                            © 2025 Ministerie van Justitie en Politie - Vreemdelingenzaken. Alle rechten voorbehouden.
                        </p>
                        <ul className="social-links" data-wow-delay=".5s">
                            <li> <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a> </li>
                            <li> <a href="#" aria-label="Twitter"><i className="bi bi-twitter"></i></a> </li>
                            <li> <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a> </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;