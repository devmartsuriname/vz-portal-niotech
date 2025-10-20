import { Link } from 'react-router-dom';
import data from '../../Data/feature1.json';
import SectionTitle from '../Common/SectionTitle';

const Feature3 = () => {
    return (
        <section className="service-section section-padding pb-0 fix">
        <div className="service-container-wrapper style1">
            <div className="container">
                <div className="service-wrapper style1">
                    <div className="section-title text-center mxw-685 mx-auto mb-60">
                        <SectionTitle
                            SubTitle="Our Features"
                            Title="We Provide the Best Quality"
                        ></SectionTitle>                       
                    </div>
                    <div className="row gy-5">
                    {data.map((item, index)=>(
                        <div key={index} className="col-xl-4 col-md-6">
                            <div className={item.addclass} data-wow-delay=".2s">
                                <div className="icon-box style1">
                                    <img src={item.img} alt="icon" />
                                </div>
                                <div className="content">
                                    <h3><Link to="/service/service-details"> {item.title} </Link></h3>
                                    <p className="text">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Feature3;