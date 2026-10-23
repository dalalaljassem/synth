import './Icon.css';

/**
 * Small line icons drawn for UI chrome (arrows, crosshair, globe).
 * Illustrative brand icons live in /public/images/icons (from the guidelines).
 */
const PATHS = {
  'arrow-left': (
    <>
      <path d="M46 8H2" />
      <path d="M9 1 2 8l7 7" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M2 8h44" />
      <path d="m39 1 7 7-7 7" />
    </>
  ),
  crosshair: (
    <>
      <path d="M8 0v16" />
      <path d="M0 8h16" />
    </>
  ),
  globe: (
    <>
      <circle cx="22" cy="22" r="18" />
      <ellipse cx="22" cy="22" rx="8" ry="18" />
      <path d="M4 22h36" />
      <path d="M7 12h30" />
      <path d="M7 32h30" />
      <path d="M22 4v36" />
    </>
  ),
  close: (
    <>
      <path d="m2 2 12 12" />
      <path d="M14 2 2 14" />
    </>
  ),
};

const VIEWBOXES = {
  'arrow-left': '0 0 48 16',
  'arrow-right': '0 0 48 16',
  crosshair: '0 0 16 16',
  globe: '0 0 44 44',
  close: '0 0 16 16',
};

export function Icon({ name, className = '', title }) {
  return (
    <svg
      className={`icon icon--${name} ${className}`.trim()}
      viewBox={VIEWBOXES[name]}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}
