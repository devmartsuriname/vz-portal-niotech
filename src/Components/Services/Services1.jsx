import { Link } from 'react-router-dom';
import data from '../../Data/services1.json';

const Services1 = () => {
    return (
<section className="service-section section-padding fix">
        <div className="service-container-wrapper style1">
            <div className="container">
                <div className="service-wrapper style1">
                    <div className="row gy-5">
                    {data.map((item, index)=>(
                        <div key={index} className="col-xl-4 col-md-6">
                            <div className="service-box style3 wow fadeInLeft" data-wow-delay=".3s">
                                <div className="icon-box style3">
                                    <img src={item.icon} alt="icon" />
                                </div>
                                <div className="content">
                                    <h3><Link to="/service/service-details"> {item.title}</Link></h3>
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

export default Services1;