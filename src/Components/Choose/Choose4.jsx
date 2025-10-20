import { Link } from "react-router-dom";

const Choose4 = ({
    subtitle = "Customizations & Analysis",
    title = "Manage your Traffic Growth Easily",
    content1 = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even",
    content2 = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,",
    btnname = "View All Project",
    btnurl = "/about",
    counter1Number = "56",
    counter1Suffix = "k+",
    counter1Text = "Comparers",
    counter2Number = "126",
    counter2Suffix = "k+",
    counter2Text = "Use People",
    counter3Number = "1.2",
    counter3Suffix = "M+",
    counter3Text = "Download It",
    thumbBoxTitle = "Traffic Growth",
    thumbBoxText = "Total traffic growth of 45%",
    thumbBoxMetricTitle = "Transaction",
    thumbBoxMetricValue = "86%"
}) => {
    return (
<section className="wcu-section section-padding pt-0 fix">
        <div className="wcu-container-wrapper style3">
            <div className="container">
                <div className="wcu-wrapper style3">
                    <div className="row gy-5 gx-60">
                        <div className="col-xl-6">
                            <div className="wcu-content">
                                <div className="section-title">
                                    <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
                                        {subtitle} <img src="/assets/images/icon/fireIcon.svg" alt="icon" />
                                    </div>
                                    <h2 className="title wow fadeInUp" data-wow-delay=".4s">{title}</h2>
                                    <p className="text1 wow fadeInUp" data-wow-delay=".6s">{content1}</p>
                                    <p className="text2 wow fadeInUp" data-wow-delay=".8s">{content2}</p>
                                </div>
                                <Link className="theme-btn rounded-5 wow fadeInUp" data-wow-delay=".4s" to={btnurl}>{btnname}
                                    <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_190_64)">
                                            <path
                                                d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z"
                                                fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_190_64">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </Link>
                                <div className="counter-box-wrapper style3">
                                    <div className="counter-box style3 wow fadeInUp" data-wow-delay=".2s">
                                        <div className="counter">
                                            <span className="counter-nubmer">{counter1Number}</span> <span>{counter1Suffix}</span>
                                        </div>
                                        <p className="text">{counter1Text}</p>
                                    </div>
                                    <div className="counter-box style3 wow fadeInUp" data-wow-delay=".4s">
                                        <div className="counter">
                                            <span className="counter-nubmer">{counter2Number}</span> <span>{counter2Suffix}</span>
                                        </div>
                                        <p className="text">{counter2Text}</p>
                                    </div>
                                    <div className="counter-box style3 wow fadeInUp" data-wow-delay=".6s">
                                        <div className="counter">
                                            <span className="counter-nubmer">{counter3Number}</span> <span>{counter3Suffix}</span>
                                        </div>
                                        <p className="text">{counter3Text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="wcu-thumb">
                                <div className="main-thumb img-custom-anim-left wow fadeInUp" data-wow-delay=".4s">
                                    <img src="/assets/images/wcu/wcuThumb3_1.png" alt="thumb" />
                                </div>
                                <div className="thumb2">
                                    <img src="/assets/images/wcu/wcuThumb3_2.png" alt="thumb" />
                                </div>
                                <div className="thumb-box float-bob-y wow fadeInUp" data-wow-delay=".4s">
                                    <h5>{thumbBoxTitle}</h5>
                                    <p className="text">{thumbBoxText}</p>
                                    <div className="shape-box">
                                        <img src="/assets/images/shape/wcuThumbShape3_1.png" alt="shape" />
                                        <div className="shape-content">
                                            <h6>{thumbBoxMetricTitle}</h6>
                                            <h3>{thumbBoxMetricValue}</h3>
                                        </div>
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

export default Choose4;