import { Link } from "react-router-dom";
import data from '../../Data/blog.json';

const BlogStandard = () => {
    // Use first 3 articles from blog.json
    const blogPosts = data.slice(0, 3);
    
    return (
        <section className="news-standard fix section-padding">
        <div className="container">
            <div className="row g-4">
                <div className="col-12 col-lg-8">

                    <div className="news-standard-wrapper">
                        {blogPosts.map((item, index) => {
                            // Parse date from blog.json (format: "15 januari 2024")
                            const dateParts = item.date.split(' ');
                            const day = dateParts[0];
                            const month = dateParts[1].substring(0, 3); // First 3 letters
                            
                            return (
                                <div key={index} className="news-standard-items wow fadeInUp" data-wow-delay={`.${(index + 1) * 2}s`}>
                                    <div className="news-thumb">
                                        <img src={item.img} alt="img" />
                                        <div className="post-date">
                                            <h3>
                                                {day} <br/>
                                                <span>{month}</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="news-content">
                                        <ul>
                                            <li>
                                                <i className="bx bx-user"></i>
                                                {item.author}
                                            </li>
                                            <li>
                                                <i className="bx bx-purchase-tag"></i>
                                                {item.category}
                                            </li>
                                        </ul>
                                        <h3>
                                            <Link to="/blog/blog-details">{item.title}</Link>
                                        </h3>
                                        <p>
                                            {item.excerpt}
                                        </p>
                                        <Link to="/blog/blog-details" className="theme-btn mt-4">
                                            Lees Meer
                                            <i className="bx bx-right-arrow-alt"></i>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

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
                                {data.slice(0, 3).map((item, index) => (
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
    </section>
    );
};

export default BlogStandard;
