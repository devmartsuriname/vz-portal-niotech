import { Link } from "react-router-dom";

const Blog1 = () => {
    return (
        
        <section className="blog-section section-padding fix">
            <div className="container">
                <div className="blog-wrapper style1">
                    <div className="section-title text-center mxw-685 mx-auto">
                        <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
                            Our Blog <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
                        </div>
                        <h2 className="title wow fadeInUp" data-wow-delay=".4s">Recent Articles And Latest Blog</h2>
                    </div>
                    <div className="row gy-5">
                        <div className="col-xl-4 col-md-6">
                            <div className="blog-card style1 wow fadeInUp" data-wow-delay=".2s">
                                <div className="thumb">
                                    <img src="/assets/images/blog/blogThumb1_1.jpg" alt="thumb" />
                                </div>
                                <div className="body">
                                    <div className="tag-meta">
                                        <img src="/assets/images/icon/FolderIcon.svg" alt="icon" />
                                        Workplace
                                    </div>
                                    <h3><Link to="/blog/blog-details">Services that printing at you is important</Link></h3>
                                    <div className="blog-meta">
                                        <div className="item child1">
                                            <span className="icon">
                                                <img src="/assets/images/icon/userIcon.svg" alt="icon" />
                                            </span>
                                            <span className="text">By Admin</span>
                                        </div>
                                        <div className="item">
                                            <span className="icon">
                                                <img src="/assets/images/icon/calendar.svg" alt="icon" />
                                            </span>
                                            <span className="text">Sep 30, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="blog-card style1 wow fadeInUp" data-wow-delay=".4s">
                                <div className="thumb">
                                    <img src="/assets/images/blog/blogThumb1_2.jpg" alt="thumb" />
                                </div>
                                <div className="body">
                                    <div className="tag-meta">
                                        <img src="/assets/images/icon/FolderIcon.svg" alt="icon" />
                                        Coding
                                    </div>
                                    <h3><Link to="/blog/blog-details">A checklist to improve your daily routine</Link></h3>
                                    <div className="blog-meta">
                                        <div className="item child1">
                                            <span className="icon">
                                                <img src="/assets/images/icon/userIcon.svg" alt="icon" />
                                            </span>
                                            <span className="text">By Admin</span>
                                        </div>
                                        <div className="item">
                                            <span className="icon">
                                                <img src="/assets/images/icon/calendar.svg" alt="icon" />
                                            </span>
                                            <span className="text">Sep 30, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="blog-card style1 wow fadeInUp" data-wow-delay=".6s">
                                <div className="thumb">
                                    <img src="/assets/images/blog/blogThumb1_1.jpg" alt="thumb" />
                                </div>
                                <div className="body">
                                    <div className="tag-meta">
                                        <img src="/assets/images/icon/FolderIcon.svg" alt="icon" />
                                        Technology
                                    </div>
                                    <h3><Link to="/blog/blog-details">That will help you get 1% better every day</Link></h3>
                                    <div className="blog-meta">
                                        <div className="item child1">
                                            <span className="icon">
                                                <img src="/assets/images/icon/userIcon.svg" alt="icon" />
                                            </span>
                                            <span className="text">By Admin</span>
                                        </div>
                                        <div className="item">
                                            <span className="icon">
                                                <img src="/assets/images/icon/calendar.svg" alt="icon" />
                                            </span>
                                            <span className="text">Sep 30, 2024</span>
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

export default Blog1;