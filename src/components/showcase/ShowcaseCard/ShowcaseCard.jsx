import { Link } from 'react-router-dom';
import { SmartImage } from '@/components/ui/SmartImage';
import { useTilt } from '@/hooks/useTilt';
import { formatIndex } from '@/utils/format';
import './ShowcaseCard.css';

/**
 * One project tile in the showcase: tilts toward the pointer, zooms its
 * photo and reveals the project name on hover / focus.
 * `shape` picks the tile size (see ShowcaseCard.css).
 */
export function ShowcaseCard({ item, index, isDuplicate = false }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt();

  return (
    <Link
      ref={ref}
      to={`/projects/${item.projectSlug}`}
      className={`showcase-card showcase-card--${item.shape}`}
      style={{ '--reveal-delay': `${index * 60}ms` }}
      data-cursor="View"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label={`${item.title} — view project`}
      tabIndex={isDuplicate ? -1 : undefined}
      draggable={false}
    >
      <span className="showcase-card__media">
        <SmartImage className="showcase-card__image" src={item.image} alt="" draggable={false} />
        <span className="showcase-card__glare" aria-hidden="true" />
      </span>
      <span className="showcase-card__caption" aria-hidden="true">
        <span className="showcase-card__title">{item.title}</span>
        <span className="showcase-card__index">[{formatIndex(index + 1)}]</span>
      </span>
    </Link>
  );
}
