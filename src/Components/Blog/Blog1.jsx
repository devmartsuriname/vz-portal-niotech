import { Link } from "react-router-dom";
import data from "../../Data/blog.json";

const Blog1 = () => {
    return (
        
        <section className="blog-section section-padding fix">
            <div className="container">
                <div className="blog-wrapper style1">
                    <div className="section-title text-center mxw-685 mx-auto">
                        <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
                            Nieuws & Updates <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
                        </div>
                        <h2 className="title wow fadeInUp" data-wow-delay=".4s">Recente Artikelen en Laatste Nieuws over Vreemdelingenzaken</h2>
                    </div>
                    <div className="row gy-5">
                        {data.slice(0, 3).map((item, index) => (
                            <div key={index} className="col-xl-4 col-md-6">
                                <div className="blog-card style1 wow fadeInUp" data-wow-delay={`.${(index + 1) * 2}s`}>
                                    <div className="thumb">
                                        <img src={item.img} alt="thumb" />
                                    </div>
                                    <div className="body">
                                        <div className="tag-meta">
                                            <img src="/assets/images/icon/FolderIcon.svg" alt="icon" />
                                            {item.category}
                                        </div>
                                        <h3><Link to="/blog/blog-details">{item.title}</Link></h3>
                                        <div className="blog-meta">
                                            <div className="item child1">
                                                <span className="icon">
                                                    <img src="/assets/images/icon/userIcon.svg" alt="icon" />
                                                </span>
                                                <span className="text">{item.author}</span>
                                            </div>
                                            <div className="item">
                                                <span className="icon">
                                                    <img src="/assets/images/icon/calendar.svg" alt="icon" />
                                                </span>
                                                <span className="text">{item.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog1;