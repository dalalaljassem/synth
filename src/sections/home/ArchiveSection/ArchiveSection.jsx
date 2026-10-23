import { Link } from 'react-router-dom';
import { MorseDivider } from '@/components/ui/MorseDivider';
import { SmartImage } from '@/components/ui/SmartImage';
import './ArchiveSection.css';

/** Horizontally scrolling strip of archive thumbnails. */
export function ArchiveSection({ label, items, morseCode }) {
  return (
    <section className="archive-section" aria-labelledby="archive-heading">
      <div className="container">
        <MorseDivider code={morseCode} label={label} labelId="archive-heading" />
      </div>

      <ul className="archive-section__track" tabIndex={0} aria-label="Archive thumbnails">
        {items.map((item) => {
          const thumbnail = (
            <SmartImage className="archive-section__image" src={item.image} alt={item.alt} />
          );

          return (
            <li key={item.id} className="archive-section__item">
              {item.projectSlug ? (
                <Link
                  to={`/projects/${item.projectSlug}`}
                  className="archive-section__link"
                  aria-label={item.alt || `View project ${item.projectSlug}`}
                >
                  {thumbnail}
                </Link>
              ) : (
                <div className="archive-section__link archive-section__link--static">{thumbnail}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
