import { useEffect, useRef, useState } from 'react';
import './CursorDot.css';

const FOLLOW = 0.18; // 0–1: how quickly the dot catches up with the pointer
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor]';

/**
 * The dot from the synth. logo, following the pointer around the site.
 * Grows over links and buttons; shows a label over elements with
 * data-cursor="Label". Mouse/trackpad only — hidden on touch screens.
 */
export function CursorDot() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState({ hovering: false, label: '', visible: false, pressed: false });

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;

    const tick = () => {
      const ease = reduceMotion ? 1 : FOLLOW;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      dot.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      const hit = event.target.closest?.(INTERACTIVE);
      const label = hit?.getAttribute('data-cursor') ?? '';
      setState((prev) =>
        prev.visible && prev.hovering === Boolean(hit) && prev.label === label
          ? prev
          : { ...prev, visible: true, hovering: Boolean(hit), label },
      );
    };
    const onLeave = () => setState((prev) => ({ ...prev, visible: false }));
    const onDown = () => setState((prev) => ({ ...prev, pressed: true }));
    const onUp = () => setState((prev) => ({ ...prev, pressed: false }));

    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const classes = [
    'cursor-dot',
    state.visible && 'is-visible',
    state.hovering && 'is-hovering',
    state.label && 'has-label',
    state.pressed && 'is-pressed',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={dotRef} className={classes} aria-hidden="true">
      <span className="cursor-dot__body">
        {state.label && <span className="cursor-dot__label">{state.label}</span>}
      </span>
    </div>
  );
}
