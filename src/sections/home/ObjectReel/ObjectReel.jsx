import { LazyVideo } from '@/components/ui/LazyVideo';
import './ObjectReel.css';

/**
 * Option A — a full-width strip of looping object videos that drifts
 * sideways under the hero. The set is rendered twice for a seamless loop;
 * hovering pauses it. Items come from siteContent.objectReel.
 */
export function ObjectReel({ label, items }) {
  const renderItems = (copy) =>
    items.map((item) => (
      <figure key={`${copy}-${item.id}`} className="object-reel__item">
        <LazyVideo className="object-reel__video" src={item.video} poster={item.poster} label={copy === 'a' ? item.title : undefined} />
        <figcaption className="object-reel__caption">{item.title}</figcaption>
      </figure>
    ));

  return (
    <section className="object-reel" aria-label={label}>
      <div className="object-reel__track">
        <div className="object-reel__group">{renderItems('a')}</div>
        <div className="object-reel__group" aria-hidden="true">
          {renderItems('b')}
        </div>
      </div>
    </section>
  );
}
