import { useState } from 'react';
import { MorseDivider } from '@/components/ui/MorseDivider';
import './ServicesFolder.css';

/* Where each card's tab sits along its top edge (% of the card width), back to front */
const TAB_OFFSETS = [6, 58, 30, 64, 14, 46, 36];

/**
 * Services as an outlined index-card drawer on black.
 * Hover a tab: the card lifts. Click it: the tall card at the back shows
 * that service. Items come from siteContent.services.
 */
/* Each tab takes a sub-brand colour when selected */
const COLORS = {
  lime: { '--tab-color': 'var(--color-formed)', '--tab-ink': 'var(--color-black)' },
  orange: { '--tab-color': 'var(--color-objects)', '--tab-ink': 'var(--color-black)' },
  teal: { '--tab-color': 'var(--color-build)', '--tab-ink': 'var(--color-white)' },
  purple: { '--tab-color': 'var(--color-systems)', '--tab-ink': 'var(--color-white)' },
};
const TAB_COLORS = {
  architecture: COLORS.teal,
  'brand-strategy': COLORS.purple,
  'creative-direction': COLORS.lime,
  'content-campaign': COLORS.lime,
  objects: COLORS.orange,
};
const tabColor = (id) => TAB_COLORS[id] ?? COLORS.lime;

export function ServicesFolder({ id = 'services', label, items, morseCode, logo }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [pulledId, setPulledId] = useState(null);
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const active = items[activeIndex];
  const number = (index) => String(index + 1).padStart(2, '0');

  const select = (itemId) => {
    setActiveId(itemId);
    setPulledId(itemId); // replays the "pull" animation on the clicked card
  };

  return (
    <section id={id} className="services-folder" aria-labelledby={`${id}-heading`}>
      <div className="container services-folder__header">
        <MorseDivider code={morseCode} label={label} labelId={`${id}-heading`} tone="light" />
      </div>

      <div className="services-folder__drawer" style={{ '--card-count': items.length }}>
        {/* Back card: shows the selected service */}
        <div
          className="services-folder__feature"
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${active.id}`}
        >
          <span className="services-folder__tab services-folder__tab--feature" style={{ '--tab-left': '40%', ...tabColor(active.id) }}>
            <span>{number(activeIndex)}</span>
            <span>{active.title}</span>
          </span>
          <div key={active.id} className="services-folder__feature-body">
            <p className="services-folder__feature-index">
              ({number(activeIndex)} / {number(items.length - 1)})
            </p>
            <h3 className="services-folder__feature-title">{active.title}</h3>
            {active.description && <p className="services-folder__feature-text">{active.description}</p>}
          </div>
        </div>

        {/* Stack of index cards, back to front */}
        <div className="services-folder__stack" role="tablist" aria-label={label}>
          {items.map((item, index) => {
            const isActive = item.id === active.id;
            return (
              <div
                key={item.id}
                className={[
                  'services-folder__card',
                  isActive && 'is-active',
                  pulledId === item.id && 'is-pulled',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--i': index, '--tab-left': `${TAB_OFFSETS[index % TAB_OFFSETS.length]}%`, ...tabColor(item.id) }}
                onAnimationEnd={() => setPulledId(null)}
              >
                <button
                  type="button"
                  role="tab"
                  id={`${id}-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`${id}-panel`}
                  className="services-folder__tab"
                  onClick={() => select(item.id)}
                >
                  <span>{number(index)}</span>
                  <span>{item.title}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Front of the drawer */}
        <div className="services-folder__front">
          <svg className="services-folder__front-outline" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="0.4,0.6 99.6,0.6 92,39.4 8,39.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="services-folder__front-label">
            {logo && <img className="services-folder__front-logo" src={logo.src} alt={logo.alt} />}
            <span className="services-folder__front-count">Services ({number(items.length - 1)})</span>
          </div>
        </div>
      </div>
    </section>
  );
}
