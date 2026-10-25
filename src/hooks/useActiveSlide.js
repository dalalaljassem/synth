import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which slide is most visible inside a scroll container.
 * Returns refs to attach plus the active index and a scrollTo helper.
 */
export function useActiveSlide(slideCount) {
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || slideCount === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { root: container, threshold: 0.6 },
    );

    slideRefs.current.slice(0, slideCount).forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [slideCount]);

  const registerSlide = (index) => (element) => {
    slideRefs.current[index] = element;
  };

  const scrollToSlide = (index) => {
    const container = containerRef.current;
    const target = slideRefs.current[index];
    if (!container || !target) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Scroll the gallery itself (works for vertical and horizontal layouts)
    container.scrollTo({
      top: target.offsetTop - container.offsetTop,
      left: target.offsetLeft - container.offsetLeft,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return { containerRef, registerSlide, activeIndex, scrollToSlide };
}
