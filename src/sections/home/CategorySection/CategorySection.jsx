import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SynthMark } from '@/components/ui/SynthMark';
import { useMenu } from '@/context/MenuContext';
import './CategorySection.css';

/**
 * Sub-brand switcher styled as a record track list: picking a category
 * "shifts" the record beside it to that category's colour and artwork.
 * Categories come from siteContent.categories.
 */
export function CategorySection({ label, title, items }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const { openMenu } = useMenu();
  const navigate = useNavigate();
  const active = items.find((item) => item.id === activeId) ?? items[0];
  const discRef = useRef(null);
  const hoverTimer = useRef(0);
  // Hover only selects once the pointer rests on a track, so passing over
  // other tracks on the way to the Enter link doesn't change the selection
  const hoverSelect = (id) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActiveId(id), 180);
  };
  useEffect(() => () => clearTimeout(hoverTimer.current), []);
  const isFirstRender = useRef(true);

  // On every category change the record turns while its colour cross-fades
  // (CSS transition); the marbling keeps flowing inside throughout.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const disc = discRef.current;
    if (!disc?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    disc.animate([{ rotate: '-240deg' }, { rotate: '0deg' }], {
      duration: 1100,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
  }, [activeId]);

  return (
    <section className="category-section" aria-labelledby="category-heading">

      <div className="category-section__panel" style={{ '--category-color': active.color }}>
        <div className="category-section__tracks">
          <h2 id="category-heading" className="category-section__title">
            {title}
          </h2>

          <ol className="category-section__list">
            {items.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`category-section__track ${item.id === active.id ? 'is-active' : ''}`.trim()}
                  style={{ '--track-color': item.color }}
                  aria-pressed={item.id === active.id}
                  onClick={() => {
                    // live sub-brands open their page; work-in-progress ones just preview
                    if (item.href) navigate(item.href);
                    else setActiveId(item.id);
                  }}
                  onMouseEnter={() => hoverSelect(item.id)}
                  onMouseLeave={() => clearTimeout(hoverTimer.current)}
                  onFocus={() => setActiveId(item.id)}
                >
                  <span className="category-section__track-name">
                    <span className="category-section__track-number">{index + 1}.</span>
                    <SynthMark name={item.id} className="category-section__track-logo" />
                  </span>
                  <span className="category-section__track-meta">({item.meta})</span>
                </button>
              </li>
            ))}
          </ol>

          <CategoryAction item={active} onOpenMenu={openMenu} />
        </div>

        <div className="category-section__record" aria-hidden="true">
          <div ref={discRef} className="category-section__disc">
            <span className="category-section__disc-flow" />
          </div>
          <div className="category-section__label">
            <span className="category-section__label-dot" />
          </div>
        </div>

        <div className="category-section__sleeve">
          {/* official sub-brand logo; its full stop takes the category colour */}
          <SynthMark name={active.id} className="category-section__sleeve-logo" />
          <span className="category-section__sleeve-note">{active.note}</span>
        </div>
      </div>
    </section>
  );
}

function CategoryAction({ item, onOpenMenu }) {
  if (item.status === 'wip') {
    return <p className="category-section__action is-disabled">[ Work in progress ]</p>;
  }
  if (item.href) {
    return (
      <Link className="category-section__action" to={item.href}>
        [ Enter {item.name} → ]
      </Link>
    );
  }
  return (
    <button type="button" className="category-section__action" onClick={onOpenMenu}>
      [ Enter {item.name} → ]
    </button>
  );
}
