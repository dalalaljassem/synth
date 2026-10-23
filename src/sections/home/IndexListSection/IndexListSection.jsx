import { MorseDivider } from '@/components/ui/MorseDivider';
import { formatIndex } from '@/utils/format';
import './IndexListSection.css';

/** Labelled, numbered list of boxed rows — used for Services and Process. */
export function IndexListSection({ id, label, items, morseCode, className = '' }) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className={`index-list-section ${className}`.trim()}
      aria-labelledby={headingId}
    >
      <MorseDivider code={morseCode} label={label} labelId={headingId} />

      <ol className="index-list-section__list">
        {items.map((item, index) => (
          <li key={item.id} className="index-list-section__item">
            <span className="index-list-section__title">{item.title}</span>
            <span className="index-list-section__index" aria-hidden="true">
              [{formatIndex(index + 1)}]
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
