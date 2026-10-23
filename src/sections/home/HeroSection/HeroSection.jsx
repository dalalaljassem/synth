import { BrandLogo } from '@/components/ui/BrandLogo';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { Icon } from '@/components/ui/Icon';
import './HeroSection.css';

/** Opening statement: wordmark, tagline and the based-in / working location block. */
export function HeroSection({ wordmark, tagline, location }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <h1 className="hero-section__title" id="hero-title">
        <BrandLogo logo={wordmark} className="hero-section__logo" />
        <span className="hero-section__tagline">{tagline}</span>
      </h1>

      <CornerFrame className="hero-section__location">
        <p className="hero-section__place">
          <span className="hero-section__place-label">{location.based.label}</span>
          <span className="hero-section__place-value">{location.based.value}</span>
        </p>
        <Icon name="globe" className="hero-section__globe" />
        <p className="hero-section__place hero-section__place--end">
          <span className="hero-section__place-label">{location.working.label}</span>
          <span className="hero-section__place-value">{location.working.value}</span>
        </p>
      </CornerFrame>
    </section>
  );
}
