import './BrandLogo.css';

/**
 * Official SYNTH wordmark artwork. Never retype or redraw the logo
 * (Guidelines p.8) — always render the supplied file.
 */
export function BrandLogo({ logo, className = '', decorative = false }) {
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={logo.src}
      alt={decorative ? '' : logo.alt}
      width={logo.width}
      height={logo.height}
      decoding="async"
    />
  );
}
