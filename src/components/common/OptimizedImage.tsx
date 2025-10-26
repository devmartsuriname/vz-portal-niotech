import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

/**
 * OptimizedImage Component
 * 
 * Provides automatic WebP conversion with fallback, responsive srcset,
 * and proper width/height attributes to prevent CLS.
 * 
 * @param src - Image path (PNG/JPG will auto-generate WebP)
 * @param alt - Required alt text for accessibility
 * @param width - Explicit width to prevent CLS
 * @param height - Explicit height to prevent CLS
 * @param loading - Lazy or eager loading (default: lazy)
 * @param priority - Set to true for above-fold images (disables lazy loading)
 * @param sizes - Responsive sizes attribute for srcset
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes,
  className = '',
  ...props
}: OptimizedImageProps) => {
  // Generate WebP path by replacing extension
  const getWebPPath = (imagePath: string): string => {
    return imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  };

  // Generate srcset for responsive images
  const generateSrcSet = (imagePath: string): string => {
    const basePath = imagePath.replace(/\.(png|jpg|jpeg|webp)$/i, '');
    const ext = imagePath.match(/\.(png|jpg|jpeg|webp)$/i)?.[0] || '.png';
    
    // Generate 1x, 1.5x, 2x versions
    return `${basePath}${ext} 1x, ${basePath}@1.5x${ext} 1.5x, ${basePath}@2x${ext} 2x`;
  };

  const webpSrc = getWebPPath(src);
  const loadingAttr = priority ? 'eager' : loading;

  return (
    <picture>
      {/* WebP source with srcset for responsive images */}
      <source
        type="image/webp"
        srcSet={webpSrc}
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <source
        type={`image/${src.match(/\.(png|jpg|jpeg)$/i)?.[1] || 'png'}`}
        srcSet={src}
        sizes={sizes}
      />
      
      {/* Standard img tag as final fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttr}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;
