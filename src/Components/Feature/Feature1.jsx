import SectionTitle from "../Common/SectionTitle";
import ServiceCarousel from "../Services/ServiceCarousel";

const Feature1 = () => {
    return (
        <section className="wcu-section section-padding fix">
            <div className="wcu-container-wrapper style1">
                <div className="container">
                    <div className="section-title text-center mxw-685 mx-auto wow fadeInUp" data-wow-delay=".2s">
                        <SectionTitle
                            SubTitle="Onze Diensten"
                            Title="Belangrijkste Categorieën van Uw Vreemdelingenzaken"
                        />
                        <p className="section-description">
                            Ontdek de zes hoofdcategorieën van aanvragen bij Vreemdelingenzaken Suriname.
                        </p>
                    </div>
                    <div className="wcu-wrapper style1">
                        <ServiceCarousel />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feature1;