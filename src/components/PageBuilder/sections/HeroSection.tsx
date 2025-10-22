import { HeroSection as HeroSectionType } from '@/types/pageBuilder';

interface HeroSectionProps {
  section: HeroSectionType;
}

const HeroSection = ({ section }: HeroSectionProps) => {
  const { title, subtitle, backgroundImage, ctaText, ctaLink, alignment = 'center' } = section.props;

  const alignmentClass = {
    left: 'text-start',
    center: 'text-center',
    right: 'text-end',
  }[alignment];

  return (
    <section 
      className="hero-section py-5 position-relative"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
      }}
    >
      {backgroundImage && (
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      )}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className={`hero-content py-5 ${alignmentClass}`}>
          <h1 className="display-4 fw-bold mb-3 text-white">{title}</h1>
          {subtitle && <p className="lead mb-4 text-white">{subtitle}</p>}
          {ctaText && ctaLink && (
            <a href={ctaLink} className="btn btn-primary btn-lg">
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
