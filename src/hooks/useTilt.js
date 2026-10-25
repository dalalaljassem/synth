import { useCallback, useRef } from 'react';

const MAX_TILT_DEG = 7;

/**
 * Pointer-follow tilt. Writes CSS variables on the element instead of
 * re-rendering React: --tilt-x / --tilt-y (deg) and --glare-x / --glare-y (%).
 * Disabled for touch input and reduced-motion users.
 */
export function useTilt() {
  const ref = useRef(null);

  const onPointerMove = useCallback((event) => {
    const element = ref.current;
    if (!element || event.pointerType === 'touch') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width; // 0 → 1
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty('--tilt-x', `${((0.5 - y) * MAX_TILT_DEG * 2).toFixed(2)}deg`);
    element.style.setProperty('--tilt-y', `${((x - 0.5) * MAX_TILT_DEG * 2).toFixed(2)}deg`);
    element.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
    element.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
