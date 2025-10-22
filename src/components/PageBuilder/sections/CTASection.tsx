import { CTASection as CTASectionType } from '@/types/pageBuilder';

interface CTASectionProps {
  section: CTASectionType;
}

const CTASection = ({ section }: CTASectionProps) => {
  const { 
    title, 
    description, 
    buttonText, 
    buttonLink, 
    backgroundColor = 'hsl(var(--primary))',
    textColor = '#ffffff'
  } = section.props;

  return (
    <section 
      className="cta-section py-5"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <h2 className="display-5 fw-bold mb-3">{title}</h2>
            {description && <p className="lead mb-4">{description}</p>}
            <a 
              href={buttonLink} 
              className="btn btn-light btn-lg"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
