import { useEffect } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import data from '../../Data/counter.json';

const Counter1 = () => {

    useEffect(() => {
        loadBackgroudImages();
      }, []);

    return (
        
        <div className="counter-section fix">
            <div className="counter-container-wrapper style1">
                <div className="container">
                    <div className="counter-wrapper style1 section-padding"
                        data-background="/assets/images/shape/counterShape1_1.png">
                        <div className="shape"></div>
                        <div className="container">
                            <div className="row gy-5">
                                {data.map((item, index) => (
                                    <div key={index} className="col-xl-3 col-md-6 d-flex justify-content-center">
                                        <div className="counter-box style1 wow fadeInUp" data-wow-delay={`.${(index + 1) * 2}s`}>
                                            <div className="counter">
                                                <span className="counter-number">{item.title}</span>
                                            </div>
                                            <p className="text">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Counter1;