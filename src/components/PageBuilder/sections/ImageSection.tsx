import { ImageSection as ImageSectionType } from '@/types/pageBuilder';

interface ImageSectionProps {
  section: ImageSectionType;
}

const ImageSection = ({ section }: ImageSectionProps) => {
  const { imageUrl, alt, caption, alignment = 'center', width = 'large' } = section.props;

  const alignmentClass = {
    left: 'text-start',
    center: 'text-center',
    right: 'text-end',
  }[alignment];

  const widthClass = {
    small: 'col-md-4',
    medium: 'col-md-6',
    large: 'col-md-10',
    full: 'col-12',
  }[width];

  return (
    <section className="image-section py-4">
      <div className="container">
        <div className={`row justify-content-center ${alignmentClass}`}>
          <div className={widthClass}>
            <img 
              src={imageUrl} 
              alt={alt} 
              className="img-fluid rounded shadow"
            />
            {caption && (
              <p className="text-muted mt-2 small">{caption}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
