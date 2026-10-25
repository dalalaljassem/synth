import { useRef } from 'react';
import { MorseDivider } from '@/components/ui/MorseDivider';
import { ShowcaseCard } from '@/components/showcase/ShowcaseCard';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useInView } from '@/hooks/useInView';
import './ShowcaseSection.css';

/**
 * "Selected work": a slowly moving, draggable collage of project tiles in
 * mixed sizes. The columns are rendered twice so the strip loops endlessly;
 * the second copy is hidden from assistive tech and the tab order.
 * Columns come from the data (siteContent.showcase), not from here.
 */
export function ShowcaseSection({ label, intro, columns, morseCode }) {
  const trackRef = useDragScroll();
  const loopRef = useRef(null);
  const { ref: sectionRef, isInView } = useInView();
  useAutoScroll(trackRef, loopRef);

  const renderColumns = (copy) => {
    let tileIndex = 0;
    return columns.map((column, columnIndex) => (
      <div key={`${copy}-${columnIndex}`} className="showcase-section__column">
        {column.map((item) => (
          <ShowcaseCard
            key={`${copy}-${item.projectSlug}-${item.image}`}
            item={item}
            index={tileIndex++}
            isDuplicate={copy === 'b'}
          />
        ))}
      </div>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`showcase-section ${isInView ? 'is-in-view' : ''}`.trim()}
      aria-labelledby="showcase-heading"
    >
      <div className="container showcase-section__header">
        <MorseDivider code={morseCode} label={label} labelId="showcase-heading" />
        {intro && <p className="showcase-section__intro">{intro}</p>}
      </div>

      <div ref={trackRef} className="showcase-section__track" tabIndex={0} aria-label="Selected projects">
        <div className="showcase-section__group">{renderColumns('a')}</div>
        <div ref={loopRef} className="showcase-section__group" aria-hidden="true" inert="">
          {renderColumns('b')}
        </div>
      </div>

      <p className="container showcase-section__hint" aria-hidden="true">
        Drag to explore →
      </p>
    </section>
  );
}
