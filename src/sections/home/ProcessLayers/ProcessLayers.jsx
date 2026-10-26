import { useRef, useState } from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { MorseDivider } from '@/components/ui/MorseDivider';
import './ProcessLayers.css';

/* Isometric layer geometry, in SVG units */
const VIEW_W = 800;
const CX = 380;        // centre of every layer
const HW = 215;        // half width
const HH = 76;         // half height
const TOP = 112;       // centre of the first layer
const GAP = 102;       // distance between layers
const LABEL_X = 626;

const rhombus = (y) => `${CX - HW},${y} ${CX},${y - HH} ${CX + HW},${y} ${CX},${y + HH}`;

/**
 * Process as a stack of outlined isometric layers on black.
 * Hover, focus or tap a layer: it fills, lifts, and its step is described.
 * Items come from siteContent.process.
 */
export function ProcessLayers({ id = 'process', label, heading, items, morseCode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const artRef = useRef(null);

  // Scrolling through the section spreads the stack apart and walks the
  // highlight down the steps (hover / tap still pick a step directly)
  useScrollProgress(sectionRef, (progress) => {
    const local = Math.min(1, Math.max(0, (progress - 0.2) / 0.55)); // 0→1 while centred on screen
    artRef.current?.style.setProperty('--spread', Math.sin(local * Math.PI).toFixed(3));
    const step = Math.min(items.length - 1, Math.floor(local * items.length));
    setActiveIndex((current) => (current === step ? current : step));
  });
  const active = items[activeIndex];
  const number = (index) => String(index + 1).padStart(2, '0');
  const viewH = TOP + GAP * (items.length - 1) + HH + 40;

  return (
    <section ref={sectionRef} id={id} className="process-layers" aria-labelledby={`${id}-heading`}>
      <div className="container process-layers__inner">
        <MorseDivider code={morseCode} label={label} labelId={`${id}-heading`} tone="light" />

        <div className="process-layers__grid">
          <div className="process-layers__copy">
            {heading && (
              <p className="process-layers__heading">
                {heading[0]}
                <br />
                <span className="process-layers__heading-muted">{heading[1]}</span>
              </p>
            )}

            <div key={active.id} className="process-layers__detail" aria-live="polite">
              <p className="process-layers__index">
                ({number(activeIndex)} / {number(items.length - 1)})
              </p>
              <h3 className="process-layers__title">{active.title}</h3>
              {active.description && <p className="process-layers__text">{active.description}</p>}
            </div>
          </div>

          <svg
            ref={artRef}
            className="process-layers__art"
            viewBox={`0 0 ${VIEW_W} ${viewH}`}
            role="group"
            aria-label={`${label}: ${items.map((item) => item.title).join(', ')}`}
          >
            {/* "How we work" arrow */}
            <path
              className="process-layers__arrow"
              d={`M 120 ${TOP - 30} C 40 ${TOP + 90}, 40 ${viewH - 190}, 128 ${viewH - 90}`}
            />
            <path className="process-layers__arrow" d={`M 112 ${viewH - 92} L 128 ${viewH - 90} L 124 ${viewH - 106}`} />
            <text
              className="process-layers__arrow-label"
              transform={`translate(44 ${(viewH - 40) / 2}) rotate(-90)`}
              textAnchor="middle"
            >
              How we work
            </text>

            {items.map((item, index) => {
              const y = TOP + GAP * index;
              const isActive = index === activeIndex;
              return (
                <g key={item.id} className="process-layers__float" style={{ '--i': index, '--offset': index - (items.length - 1) / 2 }}>
                  <g
                    className={`process-layers__layer ${isActive ? 'is-active' : ''}`.trim()}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`${number(index)} ${item.title}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveIndex(index);
                      }
                    }}
                  >
                    {/* generous invisible hit area covering shape + label */}
                    <rect className="process-layers__hit" x={CX - HW} y={y - GAP / 2} width={VIEW_W - (CX - HW)} height={GAP} />
                    <polygon className="process-layers__shape" points={rhombus(y)} />
                    {/* faint ruled lines on the plane */}
                    <line className="process-layers__rule" x1={CX - HW * 0.62} y1={y - HH * 0.38} x2={CX + HW * 0.12} y2={y + HH * 0.4} />
                    <line className="process-layers__rule" x1={CX - HW * 0.3} y1={y - HH * 0.62} x2={CX + HW * 0.44} y2={y + HH * 0.16} />
                    <rect className="process-layers__marker" x={LABEL_X - 22} y={y - 6} width="11" height="11" />
                    <text className="process-layers__label" x={LABEL_X} y={y} dominantBaseline="middle">
                      {number(index)} {item.title}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
