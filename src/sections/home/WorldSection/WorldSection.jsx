import { MorseDivider } from '@/components/ui/MorseDivider';
import { SmartImage } from '@/components/ui/SmartImage';
import { LazyVideo } from '@/components/ui/LazyVideo';
import './WorldSection.css';

/**
 * Option B — "synth. world": every brand object in one gapless, mixed-size
 * grid. Desktop: columns of equal height whose tiles stretch to fill them.
 * Mobile: two even columns. Items come from siteContent.world.
 */
export function WorldSection({ label, intro, columns, morseCode }) {
  return (
    <section className="world-section" aria-labelledby="world-heading">
      <div className="container world-section__header">
        <MorseDivider code={morseCode} label={label} labelId="world-heading" />
        {intro && <p className="world-section__intro">{intro}</p>}
      </div>

      <div className="world-section__grid">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="world-section__column">
            {column.map((item) => (
              <figure
                key={item.id}
                className="world-section__item"
                style={{ '--item-ratio': item.ratio }}
              >
                {item.video ? (
                  <LazyVideo className="world-section__media" src={item.video} poster={item.poster} label={item.title} />
                ) : (
                  <SmartImage className="world-section__media" src={item.image} alt={item.title} />
                )}
                <figcaption className="world-section__caption">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
