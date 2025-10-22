import parse from 'html-react-parser';
import { TextSection as TextSectionType } from '@/types/pageBuilder';

interface TextSectionProps {
  section: TextSectionType;
}

const TextSection = ({ section }: TextSectionProps) => {
  const { title, content, alignment = 'left', backgroundColor } = section.props;

  const alignmentClass = {
    left: 'text-start',
    center: 'text-center',
    right: 'text-end',
  }[alignment];

  return (
    <section 
      className="text-section py-5"
      style={{ backgroundColor: backgroundColor || 'transparent' }}
    >
      <div className="container">
        <div className={alignmentClass}>
          {title && <h2 className="mb-4">{title}</h2>}
          <div className="content">{parse(content)}</div>
        </div>
      </div>
    </section>
  );
};

export default TextSection;
