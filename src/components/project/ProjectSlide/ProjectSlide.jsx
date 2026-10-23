import { forwardRef } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import './ProjectSlide.css';

/** One full-viewport image in a project's vertical slideshow. */
export const ProjectSlide = forwardRef(function ProjectSlide(
  { slide, index, total, projectName, isPriority = false },
  ref,
) {
  return (
    <section
      ref={ref}
      className="project-slide"
      style={{ '--slide-image': `url("${slide.image}")` }}
      data-index={index}
      aria-roledescription="slide"
      aria-label={`${projectName} — ${index + 1} of ${total}`}
    >
      <SmartImage
        className="project-slide__image"
        src={slide.image}
        alt={slide.alt}
        style={{ objectPosition: slide.focus }}
        loading={isPriority ? 'eager' : 'lazy'}
      />
    </section>
  );
});
