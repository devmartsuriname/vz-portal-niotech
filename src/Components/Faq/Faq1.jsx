import { useRef } from "react";
import SectionTitle from "../Common/SectionTitle";
import { useState } from "react";
import { useEffect } from "react";
import data from '../../Data/faq1.json';

const Faq1 = () => {

    const accordionContentRef = useRef(null);
    const [openItemIndex, setOpenItemIndex] = useState(-1);
    const [firstItemOpen, setFirstItemOpen] = useState(true);
  
    const handleItemClick = index => {
      if (index === openItemIndex) {
        setOpenItemIndex(-1);
      } else {
        setOpenItemIndex(index);
      }
    };
    useEffect(() => {
      if (firstItemOpen) {
        setOpenItemIndex(0);
        setFirstItemOpen(false);
      }
    }, [firstItemOpen]);

    const FaqContent = {
        Content:'Hier vindt u antwoorden op de meest gestelde vragen over verblijfsvergunningen, naturalisatie en andere vreemdelingenzaken procedures in Suriname.'
      }

    return (
        
        <section className="faq-section section-padding fix">
            <div className="container">
                {/* Centered Title & Description */}
                <div className="text-center mb-5">
                    <div className="section-title">
                        <SectionTitle
                            SubTitle="Veelgestelde Vragen 🔥"
                            Title="Veelgestelde Vragen over Vreemdelingenzaken"
                        />
                        <p className="section-desc faq-description wow fadeInUp" data-wow-delay=".4s">
                            {FaqContent.Content}
                        </p>
                    </div>
                </div>

                {/* Centered FAQ Accordion Container */}
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10 col-xxl-9">
                        <div className="faq-content style1">
                            <div className="faq-accordion">
                                <div className="accordion" id="accordion">
                                {data.map((item, index)=>(
                                    <div key={index} className={`accordion-item mb-3 wow fadeInUp ${index === openItemIndex ? "active" : "" }`} data-wow-delay=".3s">
                                        <h5 onClick={() => handleItemClick(index)} className="accordion-header">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true"
                                                aria-controls="faq1">
                                                {item.title}
                                            </button>
                                        </h5>
                                        <div ref={accordionContentRef} id="faq1" className="accordion-collapse collapse" data-bs-parent="#accordion">
                                            <div className="accordion-body">
                                            {item.desc}
                                            </div>
                                        </div>
                                    </div>
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

export default Faq1;