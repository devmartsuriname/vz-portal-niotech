import { PageSection } from '@/types/pageBuilder';
import HeroSection from './sections/HeroSection';
import TextSection from './sections/TextSection';
import ImageSection from './sections/ImageSection';
import CTASection from './sections/CTASection';
import FAQSection from './sections/FAQSection';
import ServicesSection from './sections/ServicesSection';

interface PageRendererProps {
  sections: PageSection[];
}

const PageRenderer = ({ sections }: PageRendererProps) => {
  if (!sections || sections.length === 0) {
    return null;
  }

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="page-content">
      {sortedSections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={section.id} section={section} />;
          case 'text':
            return <TextSection key={section.id} section={section} />;
          case 'image':
            return <ImageSection key={section.id} section={section} />;
          case 'cta':
            return <CTASection key={section.id} section={section} />;
          case 'faq':
            return <FAQSection key={section.id} section={section} />;
          case 'services':
            return <ServicesSection key={section.id} section={section} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default PageRenderer;
