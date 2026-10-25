import { Icon } from '@/components/ui/Icon';
import { BrandTape } from '@/components/ui/BrandTape';
import './StatementSection.css';

/** Manifesto line + supporting paragraph, with overlapping sub-brand tapes beneath. */
export function StatementSection({ heading, body }) {
  return (
    <section className="statement-section" aria-labelledby="statement-heading">
      <div className="statement-section__heading-wrap">
        <h2 className="statement-section__heading" id="statement-heading">
          {heading}
        </h2>
        <Icon name="crosshair" className="statement-section__mark" />
      </div>

      {/* Lime, orange and purple tapes crossing each other */}
      <div className="statement-section__tapes">
        <BrandTape name="formed" className="statement-section__tape statement-section__tape--1" />
        <BrandTape name="objects" reverse className="statement-section__tape statement-section__tape--2" />
        <BrandTape name="systems" className="statement-section__tape statement-section__tape--3" />
      </div>

      <p className="statement-section__body">{body}</p>
    </section>
  );
}
