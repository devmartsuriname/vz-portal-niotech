import { Link } from "react-router-dom";

const About1 = ({img1,img2,subtitle,title,content,FeatureList,btnname,btnurl}) => {
    return (
        
        <section className="about-section fix">
            <div className="about-container-wrapper style1">
                <div className="container">
                    <div className="about-wrapper style1">
                        <div className="row gy-5 gx-60">
                            <div className="col-xl-6">
                                <div className="about-thumb">
                                    <div className="bg"></div>
                                    <div className="thumbShape1 d-none d-xxl-block cir36"><img
                                            src="/assets/images/shape/aboutThumbShape1_1.png" alt="shape" /></div>
                                    <div className="thumbShape2 d-none d-xxl-block cir36"><img
                                            src="/assets/images/shape/aboutThumbShape1_2.png" alt="shape" /></div>
                                    <div className="thumbShape3 d-none d-xxl-block cir36 float-bob-y"><img
                                            src="/assets/images/shape/aboutThumbShape1_3.png" alt="shape" /></div>
                                    <div className="thumbShape4 d-none d-xxl-block cir36"><img
                                            src="/assets/images/shape/aboutThumbShape1_4.png" alt="shape" /></div>
                                    <div className="main-thumb">
                                        <img src={img1} alt="thumb" />
                                    </div>
                                    <div className="absolute-thumb float-bob-x">
                                        <img src={img2} alt="thumb" />
                                    </div>
    
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="about-content">
                                    <div className="section-title">
                                        <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
                                            {subtitle} <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
                                        </div>
                                        <h2 className="title wow fadeInUp" data-wow-delay=".4s">{title}</h2>
                                        <p className="section-desc wow fadeInUp" data-wow-delay=".6s">{content}</p>
                                    </div>
                                    <ul className="checklist style1 wow fadeInUp" data-wow-delay=".2s">
                                    {FeatureList?.map((item, index) => (
                                        <li key={index}><img src="/assets/images/icon/checkmarkIcon.svg" alt="icon" /> {item}</li>
                                    ))}
                                    </ul>
                                    <Link className="theme-btn wow fadeInUp" data-wow-delay=".2s" to={btnurl}>{btnname}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                            fill="none">
                                            <g clipPath="url(#clip0_18_41)">
                                                <path
                                                    d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z"
                                                    fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_18_41">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
    );
};

export default About1;