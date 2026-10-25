import { synthLogos } from '@/data/synthLogos';
import './SynthMark.css';

/**
 * Official SYNTH logo as inline SVG, so it inherits `color` and its full stop
 * can carry an accent (set `--mark-dot` on a parent, e.g. a sub-brand colour).
 * name: 'synth' | 'formed' | 'objects' | 'build' | 'systems'
 */
export function SynthMark({ name = 'synth', className = '', title }) {
  const logo = synthLogos[name] ?? synthLogos.synth;
  const label = title ?? (name === 'synth' ? 'synth.' : `synth.${name}`);

  return (
    <svg className={`synth-mark ${className}`.trim()} viewBox={logo.viewBox} role="img" aria-label={label}>
      {logo.paths.map((path, index) => (
        <path key={index} d={path.d} className={path.dot ? 'synth-mark__dot' : undefined} />
      ))}
    </svg>
  );
}
