import { useEffect, useRef, useState } from 'react';

const DESKTOP_QUERY = '(min-width: 64rem)';
const WHEEL_COOLDOWN_MS = 650;

/**
 * Desktop behaviour for galleries that move sideways:
 * - a mouse-wheel turn moves one slide left/right
 * - ← → (and ↑ ↓, PageUp/PageDown) step through slides
 * Trackpad side-swipes scroll natively. On mobile nothing changes: the
 * gallery keeps scrolling down. Returns true while the desktop layout is active.
 */
export function useHorizontalGallery(containerRef, { enabled, activeIndex, total, goTo }) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches,
  );
  const state = useRef({ activeIndex, total, goTo });
  state.current = { activeIndex, total, goTo };

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const isActive = enabled && isDesktop;

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) return undefined;

    let lockedUntil = 0;
    const step = (direction) => {
      const { activeIndex: index, total: count, goTo: go } = state.current;
      const next = Math.min(count - 1, Math.max(0, index + direction));
      if (next !== index) go(next);
    };

    const onWheel = (event) => {
      // Sideways trackpad swipes are handled by native scrolling + snap
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      event.preventDefault();
      const now = performance.now();
      if (now < lockedUntil || Math.abs(event.deltaY) < 4) return;
      lockedUntil = now + WHEEL_COOLDOWN_MS;
      step(event.deltaY > 0 ? 1 : -1);
    };

    const onKeyDown = (event) => {
      if (event.target.closest('input, textarea, [contenteditable]')) return;
      const forward = ['ArrowRight', 'ArrowDown', 'PageDown'];
      const backward = ['ArrowLeft', 'ArrowUp', 'PageUp'];
      if (forward.includes(event.key)) step(1);
      else if (backward.includes(event.key)) step(-1);
      else return;
      event.preventDefault();
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [containerRef, isActive]);

  return isActive;
}
