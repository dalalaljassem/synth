import { useEffect, useRef } from 'react';

/**
 * Calls onProgress(p) as the element scrolls through the viewport:
 * p = 0 when its top reaches the bottom of the screen, 1 when its bottom
 * leaves the top. Runs at most once per frame; nothing re-renders unless
 * the callback sets state. Skipped for reduced-motion users.
 */
export function useScrollProgress(ref, onProgress) {
  const callback = useRef(onProgress);
  callback.current = onProgress;

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const total = box.height + window.innerHeight;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - box.top) / total));
      callback.current(progress);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
}
