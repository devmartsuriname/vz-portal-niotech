import FeatureCard from "../Card/FeatureCard";
import SectionTitle from "../Common/SectionTitle";
import data from '../../Data/feature1.json';

const Feature1 = () => {
    return (
        <section className="wcu-section section-padding fix">
            <div className="wcu-container-wrapper style1">
                <div className="container">
                    <div className="section-title text-center mxw-685 mx-auto wow fadeInUp" data-wow-delay=".2s">
                        <SectionTitle
                            SubTitle="Onze Diensten"
                            Title="Zes hoofdcategorieën voor uw vreemdelingenzaken-aanvragen"
                        ></SectionTitle>                       
                    </div>
                    <div className="wcu-wrapper style1">
                        <div className="row gy-5 d-flex justify-content-center">
                            <div className="col-xl-4 d-flex justify-content-center">
                                <div className="wcu-content">
                                    {data.slice(0, 3).map((item, index) => (
                                        <FeatureCard
                                            key={index}
                                            img={item.img}
                                            title={item.title}
                                            content={item.desc}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col-xl-4 d-flex justify-content-center">
                                <div className="wcu-thumb wow fadeInUp" data-wow-delay=".2s">
                                    <div className="main-thumb wow bounceInUp" data-wow-delay=".6s">
                                        <img src="/assets/images/wcu/wcuThumb1_1.png" alt="thumb" />
                                    </div>
                                    <div className="shape">
                                        <img src="/assets/images/shape/wcuThumbShape1_1.png" alt="shape" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 d-flex justify-content-center justify-content-xl-end">
                                <div className="wcu-content">
                                    {data.slice(3, 6).map((item, index) => (
                                        <FeatureCard
                                            key={index}
                                            img={item.img}
                                            title={item.title}
                                            content={item.desc}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature1;