import { useState } from 'react';
import './SmartImage.css';

/**
 * <img> that degrades gracefully: if the file is missing it renders a neutral
 * placeholder (with the expected path in development) instead of a broken icon.
 */
export function SmartImage({ src, alt = '', className = '', style, loading = 'lazy', ...rest }) {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed || !src) {
    return (
      <span
        className={`smart-image smart-image--missing ${className}`.trim()}
        style={style}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        {import.meta.env.DEV && <span className="smart-image__hint">{src}</span>}
      </span>
    );
  }

  return (
    <img
      className={`smart-image ${className}`.trim()}
      src={src}
      alt={alt}
      style={style}
      loading={loading}
      decoding="async"
      onError={() => setHasFailed(true)}
      {...rest}
    />
  );
}
