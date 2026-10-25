import { SynthMark } from '@/components/ui/SynthMark';
import './BrandTape.css';

/* Print on each tape: number, count, and the brand's logo */
const PRINT = {
  formed: { number: '01', meta: '(21)' },
  objects: { number: '02', meta: '(01)' },
  build: { number: '03', meta: '(WIP)' },
  systems: { number: '04', meta: '(WIP)' },
};

/**
 * A strip of packing tape in a sub-brand's colour, printed with its logo.
 * The print scrolls slowly like tape coming off a roll.
 * name: 'formed' | 'objects' | 'build' | 'systems'
 * reverse: scroll the other way · className positions/tilts it
 */
export function BrandTape({ name, reverse = false, className = '' }) {
  const { number, meta } = PRINT[name] ?? PRINT.formed;
  const run = (copy) => (
    <span className="brand-tape__run" key={copy}>
      {[0, 1, 2].map((i) => (
        <span className="brand-tape__unit" key={i}>
          <SynthMark name={name} className="brand-tape__logo" />
          <span className="brand-tape__small">{number}</span>
          <span className="brand-tape__small">{meta}</span>
          <span className="brand-tape__small">extract</span>
          <span className="brand-tape__small">reframe</span>
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
