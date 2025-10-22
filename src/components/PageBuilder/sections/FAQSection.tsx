import { FAQSection as FAQSectionType } from '@/types/pageBuilder';
import { useFAQs } from '@/integrations/supabase/hooks/useContent';
import { Accordion } from 'react-bootstrap';

interface FAQSectionProps {
  section: FAQSectionType;
}

const FAQSection = ({ section }: FAQSectionProps) => {
  const { title = 'Veelgestelde Vragen', category, showAll = false } = section.props;
  const { faqs, isLoading } = useFAQs();

  if (isLoading) {
    return (
      <section className="faq-section py-5">
        <div className="container text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
        </div>
      </section>
    );
  }

  // Filter FAQs by category if specified
  const displayFaqs = category 
    ? faqs?.filter(faq => faq.category === category && faq.is_published)
    : faqs?.filter(faq => faq.is_published);

  return (
    <section className="faq-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">{title}</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Accordion defaultActiveKey="0">
              {displayFaqs?.map((faq, index) => (
                <Accordion.Item eventKey={index.toString()} key={faq.id}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
