import { useEffect } from 'react';

/** Locks page scroll while `isLocked` is true (used by the menu overlay). */
export function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return undefined;
    document.body.classList.add('is-scroll-locked');
    return () => document.body.classList.remove('is-scroll-locked');
  }, [isLocked]);
}
