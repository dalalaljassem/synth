import './SlideIndicator.css';

/** Vertical tick indicator — the active slide's tick extends (from the Figma scrollbar). */
export function SlideIndicator({ total, activeIndex, onSelect }) {
  if (total < 2) return null;

  return (
    <nav className="slide-indicator" aria-label="Slides">
      <ol className="slide-indicator__list">
        {Array.from({ length: total }, (_, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={index} className="slide-indicator__item">
              <button
                type="button"
                className={`slide-indicator__tick ${isActive ? 'is-active' : ''}`.trim()}
                onClick={() => onSelect(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
