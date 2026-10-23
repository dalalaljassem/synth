import { useState } from 'react';
import './ProjectBrand.css';

/**
 * Client wordmark; falls back to the project name set in type if the file is missing.
 * `variant="light"` switches to the white artwork (logo.srcLight) when one exists.
 */
export function ProjectBrand({ name, logo, variant }) {
  const [hasFailed, setHasFailed] = useState(false);
  const showImage = logo && !hasFailed;
  const src = variant === 'light' && logo?.srcLight ? logo.srcLight : logo?.src;

  return (
    <h1 className="project-brand">
      {showImage ? (
        <img
          className="project-brand__logo"
          src={src}
          alt={logo.alt || name}
          width={logo.width}
          height={logo.height}
          decoding="async"
          onError={() => setHasFailed(true)}
        />
      ) : (
        <span className="project-brand__name">{name}</span>
      )}
    </h1>
  );
}
