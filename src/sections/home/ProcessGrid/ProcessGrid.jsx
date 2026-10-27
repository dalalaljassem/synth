import { useEffect, useRef, useState } from 'react';
import { MorseDivider } from '@/components/ui/MorseDivider';
import './ProcessGrid.css';

/* ---------- Isometric wireframes ----------
   Shapes are described in 3D and projected to a 2D isometric view, so every
   drawing shares one angle. Edges hidden behind a solid are dashed. */
const S = 26;            // scale: one unit in px (viewBox units)
const CX = 100;
const CY = 112;
const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const pt = (x, y, z) => [CX + (x - y) * COS * S, CY + (x + y) * SIN * S - z * S];

/** A box's 12 edges; the 3 edges meeting at the back-bottom corner are hidden. */
function box(x, y, z, dx, dy, dz, allHidden = false) {
  const v = (i, j, k) => [x + i * dx, y + j * dy, z + k * dz];
  const edges = [
    [v(0, 0, 0), v(1, 0, 0)], [v(0, 0, 0), v(0, 1, 0)], [v(0, 0, 0), v(0, 0, 1)],
    [v(1, 0, 0), v(1, 1, 0)], [v(0, 1, 0), v(1, 1, 0)],
    [v(1, 0, 0), v(1, 0, 1)], [v(0, 1, 0), v(0, 1, 1)], [v(1, 1, 0), v(1, 1, 1)],
    [v(0, 0, 1), v(1, 0, 1)], [v(0, 0, 1), v(0, 1, 1)], [v(1, 0, 1), v(1, 1, 1)], [v(0, 1, 1), v(1, 1, 1)],
  ];
  return edges.map(([a, b], i) => ({ type: 'line', a: pt(...a), b: pt(...b), hidden: allHidden || i < 3 }));
}

/** Upright cylinder centred on (x, y): top ellipse, bottom ellipse (back half dashed), two sides. */
function cylinder(x, y, z0, z1, r) {
  const rx = r * Math.SQRT2 * COS * S;
  const ry = r * Math.SQRT2 * SIN * S;
  const [tx, ty] = pt(x, y, z1);
  const [bx, by] = pt(x, y, z0);
  return [
    { type: 'ellipse', cx: tx, cy: ty, rx, ry },
    { type: 'arc', d: `M${bx - rx},${by} A${rx},${ry} 0 0 0 ${bx + rx},${by}` },
    { type: 'arc', d: `M${bx - rx},${by} A${rx},${ry} 0 0 1 ${bx + rx},${by}`, hidden: true },
    { type: 'line', a: [tx - rx, ty], b: [bx - rx, by] },
    { type: 'line', a: [tx + rx, ty], b: [bx + rx, by] },
  ];
}

const sphere = (x, y, z, r) => {
  const [cx, cy] = pt(x, y, z);
  return [{ type: 'circle', cx, cy, r: r * S }];
};

/* One drawing per step, in the order of the process items */
const ART = [
  // Research: a probe pushed through a slab
  () => [...box(-1.3, -1.3, -0.2, 2.6, 2.6, 0.45), ...cylinder(0, 0, -1, 2.1, 0.32)],
  // Question: a block with a sphere resting on it
  () => [...box(-1, -1, -0.6, 2, 2, 2), ...sphere(0, 0, 1.95, 0.55)],
  // Reframe: a cube held inside a circle
  () => [...box(-0.95, -0.95, -0.95, 1.9, 1.9, 1.9), { type: 'circle', cx: CX, cy: CY, r: 2.15 * S }],
  // Create: layers stacking up
  () => [-1, 0, 1].flatMap((z) => box(-1.3, -1.3, z * 0.85 - 0.2, 2.6, 2.6, 0.32)),
  // Refine: a precise block inside its rough outline
  () => [...box(-1.35, -1.35, -1.1, 2.7, 2.7, 2.7, true), ...box(-0.6, -0.6, -0.35, 1.2, 1.2, 1.2)],
];

function Wireframe({ index }) {
  const parts = (ART[index % ART.length])();
  return (
    <svg className="process-grid__art" viewBox="0 0 200 224" aria-hidden="true">
      {parts.map((p, i) => {
        const common = {
          key: i,
          pathLength: 1,
          className: `process-grid__stroke ${p.hidden ? 'is-hidden' : ''}`.trim(),
          style: { '--i': i },
        };
        if (p.type === 'line') return <line {...common} x1={p.a[0]} y1={p.a[1]} x2={p.b[0]} y2={p.b[1]} />;
        if (p.type === 'ellipse') return <ellipse {...common} cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} />;
        if (p.type === 'circle') return <circle {...common} cx={p.cx} cy={p.cy} r={p.r} />;
        return <path {...common} d={p.d} />;
      })}
    </svg>
  );
}

/**
 * Process as a row of outlined cards. Each card's wireframe sits faint until
 * it's hovered or focused (or, on touch screens, scrolled to the middle of
 * the screen): then the drawing traces itself in solid line and a grid with
 * corner marks appears behind it.
 */
export function ProcessGrid({ id, label, items, morseCode }) {
  const [activeId, setActiveId] = useState(null);
  const listRef = useRef(null);

  // Touch screens have no hover: light up whichever card crosses the middle of the screen
  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.matchMedia('(hover: none)').matches || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.dataset.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    list.querySelectorAll('[data-id]').forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  const number = (index) => String(index + 1).padStart(2, '0');

  return (
    <section id={id} className="process-grid" aria-labelledby={`${id}-heading`}>
      <div className="container process-grid__inner">
        <MorseDivider code={morseCode} label={label} labelId={`${id}-heading`} tone="light" />

        <ol ref={listRef} className="process-grid__list">
          {items.map((item, index) => (
            <li
              key={item.id}
              data-id={item.id}
              className={`process-grid__card ${activeId === item.id ? 'is-active' : ''}`.trim()}
              tabIndex={0}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId((current) => (current === item.id ? null : current))}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId((current) => (current === item.id ? null : current))}
            >
              <div className="process-grid__meta">
                <span className="process-grid__label">
                  <span className="process-grid__dot" aria-hidden="true" />
                  {item.title}
                </span>
                <span className="process-grid__number">[{number(index)}]</span>
              </div>

              <div className="process-grid__stage">
                <span className="process-grid__corner process-grid__corner--tl" aria-hidden="true" />
                <span className="process-grid__corner process-grid__corner--tr" aria-hidden="true" />
                <span className="process-grid__corner process-grid__corner--bl" aria-hidden="true" />
                <span className="process-grid__corner process-grid__corner--br" aria-hidden="true" />
                <Wireframe index={index} />
              </div>

              <div className="process-grid__copy">
                <h3 className="process-grid__title">{item.title}</h3>
                {item.description && <p className="process-grid__text">{item.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
