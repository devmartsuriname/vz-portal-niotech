import SectionTitle from "../Common/SectionTitle";

const HowWork = () => {
    return (
        <section className="work-process-section section-padding fix">
            <div className="work-process-container-wrapper style1">
                <div className="container">
                    <div className="section-title text-center mxw-565 mx-auto">
                        <SectionTitle
                            SubTitle="Hoe werkt het?"
                            Title="In drie stappen naar uw aanvraag"
                        ></SectionTitle>
                    </div>
                    <div className="work-process-wrapper style1">
                        <div className="shape"><img src="/assets/images/shape/workProcessShape1_1.png" alt="shape" /></div>
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="work-process-box style1 wow fadeInUp" data-wow-delay=".2s">
                                    <div className="step">STAP - 01</div>
                                    <div className="title">Lees Instructies</div>
                                    <div className="text">Bekijk de vereisten en documentenlijsten voor uw aanvraag</div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="work-process-box style1 child2 wow fadeInUp" data-wow-delay=".4s">
                                    <div className="step">STAP - 02</div>
                                    <div className="title">Verzamel Documenten</div>
                                    <div className="text">Download de juiste checklists en bereid uw documenten voor</div>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="work-process-box style1 wow fadeInUp" data-wow-delay=".6s">
                                    <div className="step">STAP - 03</div>
                                    <div className="title">Dien Aanvraag In</div>
                                    <div className="text">Volg de wizard en verstuur uw aanvraag digitaal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowWork;