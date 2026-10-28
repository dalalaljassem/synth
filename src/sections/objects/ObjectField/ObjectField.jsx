import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './ObjectField.css';

/* Deterministic pseudo-random number per grid cell (0..1), so the field
   always lays out the same and objects keep their place as you pan. */
const rand = (i, j, salt = 0) => {
  const n = Math.sin(i * 127.1 + j * 311.7 + salt * 74.7) * 43758.5453;
  return n - Math.floor(n);
};

const ZOOMS = [1, 1.4, 1.9, 2.5]; // × the "fit everything" scale; the first step is the full view
const SPOTS = 10;          // objects on the table; the item list repeats to fill them
// Wide screens: a long, low scatter (5 across); phones: 3 across
const colsFor = (width) => (width < 640 ? 3 : 5);
const ORDER = Array.from({ length: SPOTS }, (_, k) => k).sort((a, b) => rand(a, 1, 9) - rand(b, 1, 9));

/**
 * The open object: a large view plus thumbnails of its variations
 * (cut-out first, then the brand inspiration and material board).
 */
function PanelGallery({ item }) {
  const shots = item.gallery?.length ? item.gallery : [item.image];
  const [index, setIndex] = useState(0);
  return (
    <div className="object-field__panel-art">
      {shots.length > 1 && (
        <div className="object-field__thumbs" role="tablist" aria-label={`${item.name} images`}>
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`object-field__thumb ${i === index ? 'is-active' : ''} ${i === 0 ? 'is-cutout' : ''}`.trim()}
              onClick={() => setIndex(i)}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <div className="object-field__shot">
        <img
          key={shots[index]}
          src={shots[index]}
          alt={index === 0 ? item.name : `${item.name}, image ${index + 1}`}
          className={index === 0 ? 'is-cutout' : 'is-photo'}
        />
      </div>
    </div>
  );
}

/**
 * synth.objects: a table of cut-out objects (after palmer-dinnerware.com).
 * 9 spots in a loose staggered scatter; the objects from
 * siteContent.subBrands.objects.field.items are dealt across them in a mixed
 * order (one spot per object once all 9 are in). Drag to pan (swipe sideways
 * on phones), zoom with − / +, hover for a name tag, click to open the object
 * in a side panel.
 */
export function ObjectField({ items, label = 'Objects' }) {
  const viewRef = useRef(null);
  const worldRef = useRef(null);
  const cam = useRef({ x: 0, y: 0, scale: 1, target: 1, vx: 0, vy: 0 });
  const drag = useRef(null);
  const frame = useRef(0);
  const size = useRef({ w: 0, h: 0, cell: 170, cols: 5, fit: 1, home: { x: 0, y: 0 } });
  const reduced = useRef(false);
  const [cell, setCell] = useState(0);
  const zoomRef = useRef(0);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  // Keep the camera over the table: you can drag to its edges, not past them
  const clamp = () => {
    const { w, h, cell: c, cols } = size.current;
    const cm = cam.current;
    if (cm.scale <= size.current.fit * 1.01) {
      // full view: the table stays put in its home position
      cm.x = size.current.home.x;
      cm.y = size.current.home.y;
      return;
    }
    const worldW = cols * c;
    const worldH = Math.ceil(SPOTS / cols) * c + c / 2;
    const roomX = Math.max(0, (worldW - w / cm.scale) / 2 + c * 0.4);
    const roomY = Math.max(0, (worldH - h / cm.scale) / 2 + c * 0.4);
    const cx = worldW / 2 - c / 2;
    const cy = worldH / 2 - c / 2;
    cm.x = Math.min(cx + roomX, Math.max(cx - roomX, cm.x));
    cm.y = Math.min(cy + roomY, Math.max(cy - roomY, cm.y));
  };

  const apply = useCallback(() => {
    const { w, h } = size.current;
    clamp();
    const { x, y, scale } = cam.current;
    if (worldRef.current) {
      worldRef.current.style.transform = `translate3d(${w / 2}px, ${h / 2}px, 0) scale(${scale}) translate3d(${-x}px, ${-y}px, 0)`;
    }
  }, []);

  // One animation loop: drift (inertia after a fling) and smooth zoom
  const tick = useCallback(() => {
    frame.current = 0;
    const c = cam.current;
    let moving = false;
    if (!drag.current && (Math.abs(c.vx) > 0.05 || Math.abs(c.vy) > 0.05)) {
      c.x -= c.vx / c.scale;
      c.y -= c.vy / c.scale;
      c.vx *= 0.92;
      c.vy *= 0.92;
      moving = true;
    }
    if (Math.abs(c.target - c.scale) > 0.001) {
      c.scale += (c.target - c.scale) * 0.16;
      moving = true;
    } else {
      c.scale = c.target;
    }
    apply();
    if (moving) frame.current = requestAnimationFrame(tick);
  }, [apply]);

  const kick = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(tick);
  }, [tick]);

  useLayoutEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const measure = () => {
      const el = viewRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const c = 300; // layout unit; the whole table is scaled to fit the screen
      const cols = colsFor(w);
      const rows = Math.ceil(SPOTS / cols);
      const worldW = cols * c;
      const worldH = rows * c + c / 2;
      // full view: every object on screen at once, leaving room for the labels
      const fit = Math.min((w * 0.9) / worldW, ((h - 120) * 0.92) / worldH);
      const home = { x: worldW / 2 - c / 2, y: -0.42 * c + (h / 2 - 16) / fit };
      size.current = { w, h, cell: c, cols, fit, home };
      // centre on the table and start (or stay) at the current zoom step
      // home: the scatter anchored to the top of the table (no white band under the intro)
      cam.current.x = home.x;
      cam.current.y = home.y;
      cam.current.target = fit * ZOOMS[zoomRef.current];
      cam.current.scale = cam.current.target;
      setCell(c + cols / 100); // re-render the layout when the column count changes
      apply();
    };
    measure();
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      cancelAnimationFrame(frame.current);
    };
  }, [apply]);

  // ---- Pinch to zoom (phones): two fingers scale between the full view and the closest zoom ----
  const touches = useRef(new Map());
  const pinch = useRef(null);
  const fingerGap = () => {
    const [a, b] = [...touches.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y) || 1;
  };

  // ---- Dragging ----
  const onPointerDown = (event) => {
    if (event.button !== 0 || event.target.closest('button')) return;
    if (event.pointerType === 'touch') {
      touches.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (touches.current.size === 2) {
        pinch.current = { gap: fingerGap(), scale: cam.current.scale };
        drag.current = null; // a pinch is never a tap or a drag
        viewRef.current.setPointerCapture?.(event.pointerId);
        return;
      }
    }
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: 0, touch: event.pointerType === 'touch', t: performance.now() };
    cam.current.vx = 0;
    cam.current.vy = 0;
    viewRef.current.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (touches.current.has(event.pointerId)) touches.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch.current && touches.current.size >= 2) {
      const { fit } = size.current;
      const next = Math.min(fit * ZOOMS[ZOOMS.length - 1], Math.max(fit, (pinch.current.scale * fingerGap()) / pinch.current.gap));
      cam.current.scale = next;
      cam.current.target = next;
      apply();
      return;
    }
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.x;
    const dy = d.touch ? 0 : event.clientY - d.y; // phones: sideways only, so the page still scrolls
    d.x = event.clientX;
    d.y = event.clientY;
    d.moved += Math.abs(dx) + Math.abs(dy);
    const c = cam.current;
    c.x -= dx / c.scale;
    c.y -= dy / c.scale;
    c.vx = dx;
    c.vy = dy;
    if (d.moved > 6) viewRef.current.classList.add('is-dragging');
    apply();
  };

  const onPointerUp = (event) => {
    touches.current.delete(event.pointerId);
    if (pinch.current) {
      if (touches.current.size < 2) pinch.current = null;
      drag.current = null;
      return;
    }
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    viewRef.current.classList.remove('is-dragging');
    if (d.moved <= 6) {
      // a click, not a drag: open the object under the pointer
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-object]');
      if (target) setSelected(items.find((item) => item.id === target.dataset.object) ?? null);
      cam.current.vx = 0;
      cam.current.vy = 0;
      return;
    }
    if (reduced.current || performance.now() - d.t < 40) {
      cam.current.vx = 0;
      cam.current.vy = 0;
    }
    kick();
  };

  const zoom = (step) => {
    const nextIndex = Math.min(ZOOMS.length - 1, Math.max(0, zoomIndex + step));
    setZoomIndex(nextIndex);
    zoomRef.current = nextIndex;
    cam.current.target = size.current.fit * ZOOMS[nextIndex];
    if (reduced.current) cam.current.scale = cam.current.target;
    kick();
  };

  // Close the panel with Escape
  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (event) => event.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  // ---- Table layout: 9 spots on a staggered 3×3 grid, mixed sizes, a little jitter ----
  const cells = [];
  if (cell && items.length) {
    const { cell: unit, cols: COLS } = size.current;
    for (let k = 0; k < SPOTS; k += 1) {
      const i = k % COLS;
      const j = Math.floor(k / COLS);
      // deal the objects into the spots in a fixed, shuffled order (each once while there are ≤ 9)
      const item = items[ORDER[k] % items.length];
      const scale = 0.86; // every object gets the same size spot
      cells.push({
        key: k,
        item,
        x: i * unit + (rand(i, j, 4) - 0.5) * unit * 0.22,
        y: j * unit + (i % 2 ? unit / 2 : 0) + (rand(i, j, 5) - 0.5) * unit * 0.22,
        width: unit * 0.8 * scale,
        float: 5 + rand(i, j, 6) * 4,
        delay: -rand(i, j, 7) * 8,
      });
    }
  }

  return (
    <section className={`object-field ${selected ? 'has-panel' : ''}`.trim()} aria-label={label}>
      <div
        ref={viewRef}
        className="object-field__view"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={worldRef} className="object-field__world">
          {cells.map((c) => (
            <div
              key={c.key}
              className="object-field__item"
              data-object={c.item.id}
              style={{
                left: c.x,
                top: c.y,
                width: c.width,
                height: c.width,
                '--float': `${c.float}s`,
                '--delay': `${c.delay}s`,
              }}
            >
              <div className="object-field__float">
                <img src={c.item.thumb ?? c.item.image} alt="" draggable="false" loading="lazy" decoding="async" />
              </div>
              <span className="object-field__tag">+ {c.item.name}</span>
            </div>
          ))}
        </div>

        <p className="object-field__count">
          ({String(items.length).padStart(2, '0')}) {items.length === 1 ? 'Object' : 'Objects'}
        </p>

        <div className="object-field__controls">
          <span className="object-field__hint">
            <span aria-hidden="true">✥</span> Drag to explore
          </span>
          <button type="button" className="object-field__zoom" onClick={() => zoom(-1)} disabled={zoomIndex === 0} aria-label="Zoom out">
            −
          </button>
          <button type="button" className="object-field__zoom" onClick={() => zoom(1)} disabled={zoomIndex === ZOOMS.length - 1} aria-label="Zoom in">
            +
          </button>
        </div>
      </div>

      {/* Selected object: panel slides in from the left, the table stays live on the right */}
      <aside className="object-field__panel" aria-hidden={!selected} aria-label={selected?.name}>
        {selected && (
          <div key={selected.id} className="object-field__panel-inner">
            <p className="object-field__panel-meta">synth.objects — {selected.meta ?? 'Object'}</p>
            <h2 className="object-field__panel-title">{selected.name}</h2>
            <PanelGallery key={selected.id} item={selected} />
            {selected.description && <p className="object-field__panel-text">{selected.description}</p>}
          </div>
        )}
        <button type="button" className="object-field__close" onClick={() => setSelected(null)} aria-label="Close" tabIndex={selected ? 0 : -1}>
          ×
        </button>
      </aside>
    </section>
  );
}
