import { useState, type ImgHTMLAttributes, type FC } from 'react';

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=600';

export const SafeImage: FC<SafeImageProps> = ({
  src,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  alt = '',
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default SafeImage;
