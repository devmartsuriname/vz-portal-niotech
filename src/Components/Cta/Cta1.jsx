import { Link } from "react-router-dom";

const Cta1 = ({subtitle,title,content,btnurl1,btnurl2,btnname1,btnname2,img}) => {
    return (
        <section className="cta-section">
            <div className="cta-container-wrapper style1">
                <div className="container">
                    <div className="cta-wrapper style1  section-padding fix">
                        <div className="shape1 d-none d-xxl-block"><img src="/assets/images/shape/ctaShape1_1.png" alt="shape" />
                        </div>
                        <div className="shape2 d-none d-xxl-block"><img src="/assets/images/shape/ctaShape1_2.png" alt="shape" />
                        </div>
                        <div className="shape3 d-none d-xxl-block"><img src="/assets/images/shape/ctaShape1_3.png" alt="shape" />
                        </div>
                        <div className="shape4 d-none d-xxl-block"><img src="/assets/images/shape/ctaShape1_4.png" alt="shape" />
                        </div>
                        <div className="container">
                            <div className="row gy-5">
                                <div className="col-xl-8 order-2 order-xl-1">
                                    <div className="cta-content">
                                        <div className="section-title">
                                            <div className="subtitle text-white bg2 wow fadeInUp" data-wow-delay=".2s">
                                                {subtitle} <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
                                            </div>
                                            <h2 className="title text-white wow fadeInUp" data-wow-delay=".4s">{title}</h2>
                                            <p className="section-desc text-white mxw-651 wow fadeInUp" data-wow-delay=".6s">
                                                {content}</p>
                                        </div>
                                        <div className="btn-wrapper style1 wow fadeInUp" data-wow-delay=".8s">
                                            <Link className="theme-btn" to={btnurl1}>
                                                {btnname1}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <g clipPath="url(#clip0_11_22)">
                                                        <path d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_11_22">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </Link>
                                            <Link className="theme-btn style3" to={btnurl2}>
                                                {btnname2}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <g clipPath="url(#clip0_11_23)">
                                                        <path d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z" fill="white" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_11_23">
                                                            <rect width="16" height="16" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 order-1 order-xl-2">
                                    <div className="cta-thumb wow fadeInUp" data-wow-delay=".2s">
                                        <img src={img} alt="thumb" />
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

export default Cta1;