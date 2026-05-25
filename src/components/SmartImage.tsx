import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  alt?: string;
  /** Fallback look: 'dark' (default) suits dark sections, 'light' for white ones. */
  variant?: 'dark' | 'light';
}

/**
 * Image that NEVER shows a broken-image icon. If src is empty or fails to load,
 * it renders a subtle branded placeholder instead. This protects the site while
 * any assets are still missing.
 */
const SmartImage: React.FC<SmartImageProps> = ({
  src, alt = '', variant = 'dark', className = '', style, ...rest
}) => {
  const [failed, setFailed] = useState(false);
  useEffect(() => { setFailed(false); }, [src]);

  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    const bg = variant === 'light' ? 'bg-gray-100' : 'bg-gray-900';
    const fg = variant === 'light' ? 'text-gray-300' : 'text-white/15';
    return (
      <div
        className={`flex items-center justify-center ${bg} ${className}`}
        style={style}
        aria-label={alt || 'Image placeholder'}
        role="img"
      >
        <ImageOff className={`w-8 h-8 ${fg}`} strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default SmartImage;
