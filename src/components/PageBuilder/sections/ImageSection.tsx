import { ImageSection as ImageSectionType } from '@/types/pageBuilder';
import OptimizedImage from '@/components/common/OptimizedImage';

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

  // Define explicit dimensions based on width class for CLS prevention
  const imageDimensions = {
    small: { width: 350, height: 263 },
    medium: { width: 570, height: 428 },
    large: { width: 970, height: 728 },
    full: { width: 1200, height: 800 },
  }[width];

  return (
    <section className="image-section py-4">
      <div className="container">
        <div className={`row justify-content-center ${alignmentClass}`}>
          <div className={widthClass}>
            <OptimizedImage
              src={imageUrl}
              alt={alt}
              width={imageDimensions.width}
              height={imageDimensions.height}
              className="img-fluid rounded shadow"
              loading="lazy"
              sizes={`(max-width: 768px) 100vw, ${width === 'full' ? '100vw' : width === 'large' ? '80vw' : width === 'medium' ? '50vw' : '33vw'}`}
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
