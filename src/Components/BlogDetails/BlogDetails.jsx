import { useEffect } from "react";
import { Link } from "react-router-dom";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import data from '../../Data/blog.json';

const BlogDetails = () => {

        useEffect(() => {
            loadBackgroudImages();
          }, []);

    // Use first article as default
    const article = data[0];

    return (
        <section className="news-standard section-padding fix">
        <div className="container">
            <div className="news-details-area">
                <div className="row g-5">
                    <div className="col-12 col-lg-8">
                        <div className="blog-post-details">
                            <div className="single-blog-post">
                                <div className="post-featured-thumb" data-background={article.img}>
                                </div>
                                <div className="post-content">
                                    <ul className="post-list d-flex align-items-center wow fadeInUp" data-wow-delay=".2s">
                                        <li>
                                        <i className="bx bx-user"></i>
                                            {article.author}
                                        </li>
                                        <li>
                                        <i className="bx bx-calendar"></i>
                                            {article.date}
                                        </li>
                                        <li>
                                            <img src="/assets/images/icon/tagIcon.png" alt="icon" />
                                            {article.category}
                                        </li>
                                    </ul>
                                    <h3 className="wow fadeInUp" data-wow-delay=".4s">{article.title}</h3>
                                    <p className="mb-3 wow fadeInUp" data-wow-delay=".6s">
                                        Per 1 januari 2024 zijn er nieuwe richtlijnen van kracht voor het aanvragen van verblijfsvergunningen in Suriname. Deze wijzigingen zijn doorgevoerd om het proces transparanter en efficiënter te maken voor alle aanvragers.
                                    </p>
                                    <p className="mb-3 wow fadeInUp" data-wow-delay=".8s">
                                        Het Directoraat Vreemdelingenzaken heeft de procedures gemoderniseerd in lijn met internationale standaarden en de digitale transformatie van de overheid. Deze aanpassingen zijn het resultaat van uitgebreid overleg met betrokken ministeries en feedback van burgers.
                                    </p>
                                    <h4 className="mt-4 mb-3 wow fadeInUp" data-wow-delay=".9s">Wat verandert er?</h4>
                                    <p className="wow fadeInUp" data-wow-delay="1s">
                                        De belangrijkste wijzigingen betreffen de documentenvereisten en de verwerkingstijden. Voor aanvragen van Surinaamse origine (Art. 4) is het niet langer nodig om een geboorteakte uit Suriname voor te leggen indien u beschikt over een geldig Surinaams paspoort of een eerdere verblijfsvergunning.
                                    </p>
                                    <div className="hilight-text mt-4 mb-4 wow fadeInUp" data-wow-delay=".8s">
                                        <p>De gemiddelde verwerkingstijd voor reguliere verblijfsvergunningen is teruggebracht van 6-8 weken naar 4-6 weken. Dit is mogelijk gemaakt door de digitalisering van het aanvraagproces via ons nieuwe portaal.
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                            viewBox="0 0 36 36" fill="none">
                                            <path
                                                d="M7.71428 20.0711H0.5V5.64258H14.9286V20.4531L9.97665 30.3568H3.38041L8.16149 20.7947L8.5233 20.0711H7.71428Z"
                                                stroke="#7444FD" />
                                            <path
                                                d="M28.2846 20.0711H21.0703V5.64258H35.4989V20.4531L30.547 30.3568H23.9507L28.7318 20.7947L29.0936 20.0711H28.2846Z"
                                                stroke="#7444FD" />
                                        </svg>
                                    </div>
                                    <h4 className="mt-4 mb-3 wow fadeInUp" data-wow-delay="1s">Digitale indiening</h4>
                                    <p className="mt-4 mb-5 wow fadeInUp" data-wow-delay="1s">
                                        Alle aanvragen kunnen nu volledig digitaal worden ingediend via www.vreemdelingenzaken.sr. U hoeft niet langer fysiek naar het kantoor te komen voor de initiële indiening. Wel blijft een persoonlijk bezoek verplicht voor het ophalen van uw vergunning na goedkeuring.
                                    </p>
                                    <p className="mb-3 wow fadeInUp" data-wow-delay="1.1s">
                                        Het digitale portaal biedt verschillende voordelen: 24/7 toegang tot het indienen van aanvragen, realtime status updates, veilige opslag van documenten, en de mogelijkheid om direct aanvullende documenten te uploaden indien nodig.
                                    </p>
                                    <h4 className="mt-4 mb-3 wow fadeInUp" data-wow-delay="1.2s">Wat blijft hetzelfde?</h4>
                                    <p className="wow fadeInUp" data-wow-delay="1.3s">
                                        De leges (kosten) voor verblijfsvergunningen blijven ongewijzigd conform de geldende tarieven. Ook de verschillende categorieën aanvragen (Surinaamse origine, buitenlandse origine, gezinshereniging, arbeid) blijven bestaan met dezelfde basisvereisten. De wettelijke grondslag blijft gebaseerd op de Vreemdelingenwet en relevante internationale verdragen.
                                    </p>
                                    <p className="pt-3 wow fadeInUp" data-wow-delay="1.4s">
                                        Voor meer informatie over de nieuwe richtlijnen kunt u contact opnemen met ons kantoor via de contactpagina of de sectie 'Veelgestelde Vragen' raadplegen op onze website. Ons team staat klaar om u te assisteren bij het indienen van uw aanvraag.
                                    </p>
                                </div>
                            </div>
                            <div className="row tag-share-wrap mt-4 mb-30 wow fadeInUp" data-wow-delay=".8s">
                                <div className="col-lg-8 col-12">
                                    <div className="tagcloud">
                                        <h6 className="d-inline me-2">Tags: </h6>
                                        <a href="#">Verblijf</a>
                                        <a href="#">Beleid</a>
                                        <a href="#">2024</a>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end wow fadeInUp"
                                    data-wow-delay="1.2s">
                                    <div className="social-share">
                                        <span className="me-3">Delen:</span>
                                        <a href="#"><i className="bx bxl-facebook"></i></a>
                                        <a href="#"><i className="bx bxl-twitter"></i></a>
                                        <a href="#"><i className="bx bxl-linkedin"></i></a>
                                        <a href="#"><i className="bx bxl-whatsapp"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">

                    <div className="main-sidebar">
                        <div className="single-sidebar-widget wow fadeInUp" data-wow-delay=".2s">
                            <div className="wid-title">
                                <h3>Zoeken</h3>
                            </div>
                            <div className="search-widget">
                                <form action="#">
                                    <input type="text" placeholder="Zoek hier..." />
                                    <button type="submit"><i className="bx bx-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="single-sidebar-widget wow fadeInUp" data-wow-delay=".4s">
                            <div className="wid-title">
                                <h3>Categorieën</h3>
                            </div>
                            <div className="news-widget-categories">
                                <ul>
                                    <li><Link to="/blog/blog-details">Beleid <span>(2)</span></Link></li>
                                    <li><Link to="/blog/blog-details">Nieuws <span>(2)</span></Link></li>
                                    <li><Link to="/blog/blog-details">Wijziging <span>(1)</span></Link></li>
                                    <li><Link to="/blog/blog-details">Feestdag <span>(1)</span></Link></li>
                                    <li><Link to="/blog/blog-details">Naturalisatie <span>(0)</span></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-sidebar-widget wow fadeInUp" data-wow-delay=".6s">
                            <div className="wid-title">
                                <h3>Recente Berichten</h3>
                            </div>
                            <div className="recent-post-area">
                                {data.slice(1, 4).map((item, index) => (
                                    <div key={index} className="recent-items">
                                        <div className="recent-thumb">
                                            <img src={item.img} alt="img" />
                                        </div>
                                        <div className="recent-content">
                                            <ul>
                                                <li>
                                                    <img src="/assets/images/icon/calendarIcon.svg" alt="icon" />
                                                    {item.date}
                                                </li>
                                            </ul>
                                            <h6>
                                                <Link to="/blog/blog-details">
                                                    {item.title}
                                                </Link>
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="single-sidebar-widget wow fadeInUp" data-wow-delay=".9s">
                            <div className="wid-title">
                                <h3>Tags</h3>
                            </div>
                            <div className="news-widget-categories">
                                <div className="tagcloud">
                                    <a href="#">Verblijf</a>
                                    <a href="#">Naturalisatie</a>
                                    <a href="#">Asiel</a>
                                    <a href="#">Documenten</a>
                                    <a href="#">Beleid</a>
                                    <a href="#">Procedures</a>
                                    <a href="#">Leges</a>
                                    <a href="#">Deadlines</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default BlogDetails;
