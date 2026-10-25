import { useEffect } from 'react';

const RESUME_DELAY_MS = 1500;

/**
 * Continuously scrolls a horizontal track (a marquee you can still drag).
 * The track must contain its content twice; `loopRef` points at the start of
 * the second copy, and scrolling wraps back by that distance for a seamless loop.
 * Pauses on hover, focus, mouse drag and touch; off for reduced-motion users.
 */
export function useAutoScroll(trackRef, loopRef, { speed = 40 } = {}) {
  useEffect(() => {
    const track = trackRef.current;
    const loopStart = loopRef.current;
    if (!track || !loopStart) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    let lastTime = performance.now();
    let position = track.scrollLeft;
    let isHovered = false;
    let isFocused = false;
    let isHeld = false;
    let resumeTimer = 0;

    const loopWidth = () => loopStart.offsetLeft - track.firstElementChild.offsetLeft;
    const isPaused = () => isHovered || isFocused || isHeld;

    const tick = (now) => {
      const elapsed = Math.min(now - lastTime, 64); // ignore long gaps (tab in background)
      lastTime = now;
      const width = loopWidth();

      if (isPaused()) {
        position = track.scrollLeft; // follow manual drags / swipes
      } else {
        position += (speed * elapsed) / 1000;
        track.scrollLeft = position;
      }

      // Seamless loop in both directions
      if (width > 0 && track.scrollLeft >= width) {
        position = track.scrollLeft - width;
        track.scrollLeft = position;
      } else if (width > 0 && track.scrollLeft <= 0 && isPaused()) {
        position = track.scrollLeft + width;
        track.scrollLeft = position;
      }

      frame = requestAnimationFrame(tick);
    };

    const hold = () => {
      clearTimeout(resumeTimer);
      isHeld = true;
    };
    const release = () => {
      clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        isHeld = false;
      }, RESUME_DELAY_MS);
    };
    const onPointerEnter = (event) => {
      if (event.pointerType === 'mouse') isHovered = true;
    };
    const onPointerLeave = (event) => {
      if (event.pointerType === 'mouse') isHovered = false;
    };
    // Only keyboard focus pauses; a mouse click also focuses the track
    const onFocusIn = () => {
      isFocused = Boolean(track.querySelector(':focus-visible')) || track.matches(':focus-visible');
    };
    const onFocusOut = () => {
      isFocused = false;
    };

    track.addEventListener('pointerenter', onPointerEnter);
    track.addEventListener('pointerleave', onPointerLeave);
    track.addEventListener('pointerdown', hold);
    window.addEventListener('pointerup', release);
    track.addEventListener('touchstart', hold, { passive: true });
    track.addEventListener('touchend', release);
    track.addEventListener('focusin', onFocusIn);
    track.addEventListener('focusout', onFocusOut);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resumeTimer);
      track.removeEventListener('pointerenter', onPointerEnter);
      track.removeEventListener('pointerleave', onPointerLeave);
      track.removeEventListener('pointerdown', hold);
      window.removeEventListener('pointerup', release);
      track.removeEventListener('touchstart', hold);
      track.removeEventListener('touchend', release);
      track.removeEventListener('focusin', onFocusIn);
      track.removeEventListener('focusout', onFocusOut);
    };
  }, [trackRef, loopRef, speed]);
}
