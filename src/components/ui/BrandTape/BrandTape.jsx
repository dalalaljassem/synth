import { SynthMark } from '@/components/ui/SynthMark';
import './BrandTape.css';

/* Print on each tape: the brand's logo, then a few of its disciplines */
const PRINT = {
  formed: ['art direction', 'motion design', 'ai-generated imagery', 'visual culture'],
  objects: ['product design', 'furniture design', 'collectible objects', 'functional art'],
  build: ['spatial design', 'installations', 'exhibition design', 'set design'],
  systems: ['brand strategy', 'identity systems', 'creative direction', 'visual identity'],
};

/**
 * A strip of packing tape in a sub-brand's colour, printed with its logo.
 * The print scrolls slowly like tape coming off a roll.
 * name: 'formed' | 'objects' | 'build' | 'systems'
 * reverse: scroll the other way · className positions/tilts it
 */
export function BrandTape({ name, reverse = false, className = '' }) {
  const words = PRINT[name] ?? PRINT.formed;
  const run = (copy) => (
    <span className="brand-tape__run" key={copy}>
      {[0, 1, 2].map((i) => (
        <span className="brand-tape__unit" key={i}>
          <SynthMark name={name} className="brand-tape__logo" />
          <span className="brand-tape__words">
            {words.map((word, w) => (
              <span className="brand-tape__small" key={word}>
                {w > 0 && <span className="brand-tape__sep">//</span>}
                {word}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`brand-tape brand-tape--${name} ${reverse ? 'is-reverse' : ''} ${className}`.trim()} aria-hidden="true">
      <div className="brand-tape__track">
        {run('a')}
        {run('b')}
      </div>
    </div>
  );
}
