import data from '../../Data/feature2.json';
import SectionTitle from '../Common/SectionTitle';

const Feature6 = () => {
    return (
<section className="feature-provide-section fix section-padding pt-0">
        <div className="container">
            <div className="section-title text-center mxw-685 mx-auto mb-60">
                <SectionTitle
                    SubTitle="Our Features"
                    Title="We Provide the Best Quality"
                ></SectionTitle>
            </div>
            <div className="row">

            {data.map((item, index)=>(
                <div key={index} className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                    <div className={item.addclass}>
                        <div className="item-shape">
                            <img src="/assets/images/services/item-shape.png" alt="img" />
                        </div>
                        <div className="item-shape-2">
                            <img src="/assets/images/services/item-shape-2.png" alt="img" />
                        </div>
                        <div className="icon">
                           <img src={item.img} alt="img" />
                        </div>
                        <div className="content">
                            <h3>{item.title}</h3>
                            <p>
                            {item.desc}
                            </p>
                        </div>
                    </div>
                </div>
                ))}


            </div>
        </div>
    </section>
    );
};

export default Feature6;