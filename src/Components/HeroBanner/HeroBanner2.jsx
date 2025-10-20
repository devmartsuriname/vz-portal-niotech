import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";

const HeroBanner2 = ({subtitle,title,btnname,btnurl,btnname2,btnurl2,img1,img2,img3}) => {

    useEffect(() => {
        loadBackgroudImages();
      }, []);

    return (
    
        <section className="intro-section">
            <div className="intro-container-wrapper style2 section-padding pt-0">
                <div className="intro-wrapper style2" data-background="/assets/images/bg/introBg2_1.png">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="intro-content">
                                    <div className="intro-section-title">
                                        <div className="intro-subtitle wow fadeInUp" data-wow-delay=".4s">
                                            {parse(subtitle)} <img src="/assets/images/icon/fireIcon.svg"
                                                alt="icon" />
                                        </div>
                                        <h1 className="intro-title wow fadeInUp" data-wow-delay=".2s">{parse(title)}</h1>
                                    </div>
                                    <div className="btn-wrapper style1 wow fadeInUp" data-wow-delay=".2s">
                                        <Link className="theme-btn" to={btnurl}>{btnname}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_141_224)">
                                                    <path
                                                        d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z"
                                                        fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_141_224">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </Link>
                                        <Link className="theme-btn style3 wow fadeInUp" data-wow-delay=".2s" to={btnurl2}>
                                            {btnname2}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_141_223)">
                                                    <path
                                                        d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z"
                                                        fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_141_223">
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
    
                <div className="thumb-box">
                    <div className="main-thumb">
                        <img className="img-custom-anim-left wow fadeInUp" data-wow-delay=".2s"
                            src={img1} alt="thumb" />
                        <div className="thumb1 float-bob-y">
                            <img src={img2} alt="thumb" />
                        </div>
                        <div className="thumb2 float-bob-x">
                            <img src={img3} alt="thumb" />
                        </div>
                    </div>
    
                </div>
            </div>
        </section>
    );
};

export default HeroBanner2;