import { ColorPalette } from '@/components/project/ColorPalette';
import './ProjectInfo.css';

/** Palette + campaign caption pinned to the bottom of the project view. */
export function ProjectInfo({ palette, description, showCaption }) {
  const hasCaption = Boolean(description) && showCaption;
  if (palette.length === 0 && !hasCaption) return null;

  return (
    <div className="project-info">
      <ColorPalette colors={palette} />
      <p className={`project-info__caption ${hasCaption ? '' : 'is-hidden'}`.trim()}>
        {description}
      </p>
    </div>
  );
}
