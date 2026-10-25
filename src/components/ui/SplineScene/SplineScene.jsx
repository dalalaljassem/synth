import { useEffect, useRef } from 'react';
import './SplineScene.css';

/**
 * A Spline 3D scene rendered as a click-through background layer.
 * Mouse: follows the cursor. Touch: follows a dragging finger and drifts by itself now and then.
 * - The runtime is loaded on demand (its own chunk), only once the layer is on screen.
 * - The real pointer is forwarded to the canvas, so the scene's "follow"
 *   interactions work while links and buttons underneath stay clickable.
 * - `reach` (0–1) scales how far from the centre the forwarded pointer goes,
 *   keeping the scene's moving parts inside its own bounds.
 * - Rendering runs only while the pointer is moving and the layer is on screen;
 *   after IDLE_MS of stillness it pauses on its last frame (the scene's
 *   shape blending is heavy, so it must not run constantly).
 */
const IDLE_MS = 1500;

export function SplineScene({ scene, className = '', reach = 1 }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !scene) return undefined;
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let app = null;
    let disposed = false;
    let started = false;
    let inView = false;
    let isPlaying = false;
    let idleTimer = 0;

    const pause = () => {
      if (app && isPlaying) {
        app.stop?.();
        isPlaying = false;
      }
    };
    const wake = () => {
      if (!app || !inView) return;
      if (!isPlaying) {
        app.play?.();
        isPlaying = true;
      }
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(pause, IDLE_MS);
    };

    const send = (clientX, clientY) => {
      if (!app || !inView) return;
      wake();
      const box = canvas.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const x = cx + (clientX - cx) * reach;
      const y = cy + (clientY - cy) * reach;
      for (const type of ['pointermove', 'mousemove']) {
        const EventType = type === 'pointermove' ? PointerEvent : MouseEvent;
        canvas.dispatchEvent(
          new EventType(type, {
            clientX: x,
            clientY: y,
            screenX: x,
            screenY: y,
            bubbles: false,
            pointerType: 'mouse',
            isPrimary: true,
          }),
        );
      }
    };

    // Ignore our own forwarded events (they would loop)
    const forward = (event) => {
      if (event.target === canvas) return;
      send(event.clientX, event.clientY);
    };

    // Touch screens have no cursor: every few seconds the droplets drift on
    // their own for a moment (a slow loop around the centre), then rest.
    let driftTimer = 0;
    let driftFrame = 0;
    const drift = () => {
      if (!app || !inView) {
        driftTimer = window.setTimeout(drift, 4000);
        return;
      }
      const box = canvas.getBoundingClientRect();
      const start = performance.now();
      const turn = Math.random() * Math.PI * 2;
      const step = (now) => {
        const t = Math.min(1, (now - start) / 2600);
        const angle = turn + t * Math.PI * 1.6;
        const radius = Math.sin(t * Math.PI) * box.width * 0.45;
        send(box.left + box.width / 2 + Math.cos(angle) * radius, box.top + box.height / 2 + Math.sin(angle) * radius * 0.7);
        if (t < 1) driftFrame = requestAnimationFrame(step);
        else driftTimer = window.setTimeout(drift, 5200);
      };
      driftFrame = requestAnimationFrame(step);
    };

    const start = async () => {
      started = true;
      const { Application } = await import('@splinetool/runtime');
      if (disposed) return;
      app = new Application(canvas);
      await app.load(scene);
      if (disposed) return;
      // Paint the page's own background (a transparent canvas leaves trails)
      app.setBackgroundColor(getComputedStyle(document.body).backgroundColor || '#ffffff');
      wrap.classList.add('is-ready');
      isPlaying = true;
      idleTimer = window.setTimeout(pause, IDLE_MS); // settle, then rest
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !started) start().catch(() => wrap.classList.add('is-failed'));
        if (!inView) pause();
      },
      { rootMargin: '200px' },
    );
    observer.observe(wrap);
    window.addEventListener('pointermove', forward, { passive: true });
    if (isTouch && !reduceMotion) driftTimer = window.setTimeout(drift, 2200);

    return () => {
      disposed = true;
      clearTimeout(idleTimer);
      clearTimeout(driftTimer);
      cancelAnimationFrame(driftFrame);
      observer.disconnect();
      window.removeEventListener('pointermove', forward);
      app?.dispose?.();
    };
  }, [scene, reach]);

  return (
    <div ref={wrapRef} className={`spline-scene ${className}`.trim()} aria-hidden="true">
      <canvas ref={canvasRef} className="spline-scene__canvas" />
    </div>
  );
}
