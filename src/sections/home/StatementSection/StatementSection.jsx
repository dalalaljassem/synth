import { Icon } from '@/components/ui/Icon';
import './StatementSection.css';

/** Manifesto line + supporting paragraph. */
export function StatementSection({ heading, body }) {
  return (
    <section className="statement-section" aria-labelledby="statement-heading">
      <div className="statement-section__heading-wrap">
        <h2 className="statement-section__heading" id="statement-heading">
          {heading}
        </h2>
        <Icon name="crosshair" className="statement-section__mark" />
      </div>
      <p className="statement-section__body">{body}</p>
    </section>
  );
}
