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

      {/* As sketched: four full-width tapes, two almost flat and two climbing, woven over and under */}
      <div className="statement-section__tapes">
        <BrandTape name="objects" className="statement-section__tape statement-section__tape--flat-1" />
        <BrandTape name="systems" reverse className="statement-section__tape statement-section__tape--flat-2" />
        <BrandTape name="formed" className="statement-section__tape statement-section__tape--steep-1" />
        <BrandTape name="build" reverse className="statement-section__tape statement-section__tape--steep-2" />
      </div>

      <p className="statement-section__body">{body}</p>
    </section>
  );
}
