import { useEffect, useRef } from 'react';

const DRAG_THRESHOLD_PX = 6;

/**
 * Click-and-drag horizontal scrolling for mouse users (touch scrolls natively).
 * A drag that moved more than a few pixels cancels the click that ends it,
 * so dragging across a card doesn't open it.
 */
export function useDragScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return undefined;

    let startX = 0;
    let startScroll = 0;
    let isDown = false;
    let moved = false;

    const onPointerDown = (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      isDown = true;
      moved = false;
      startX = event.clientX;
      startScroll = track.scrollLeft;
    };

    const onPointerMove = (event) => {
      if (!isDown) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) > DRAG_THRESHOLD_PX) {
        moved = true;
        track.classList.add('is-dragging');
      }
      if (moved) track.scrollLeft = startScroll - delta;
    };

    const endDrag = () => {
      isDown = false;
      track.classList.remove('is-dragging');
    };

    const onClickCapture = (event) => {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      }
    };

    track.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    track.addEventListener('click', onClickCapture, true);
    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', endDrag);
      track.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return ref;
}
