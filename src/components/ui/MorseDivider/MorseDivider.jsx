import './MorseDivider.css';

const GROUPS_PER_STRIP = 12;

/**
 * Animated rule made of the SYNTH morse code ("···—·—— —·—····").
 * The strip is rendered twice and translated by half its width, so the
 * loop is seamless. An optional section label sits on top of the line.
 */
export function MorseDivider({ code, label, labelId, tone = 'dark', direction = 'left', className = '' }) {
  const classes = [
    'morse-divider',
    `morse-divider--${tone}`,
    `morse-divider--${direction}`,
    label ? 'morse-divider--labelled' : '',
    className,
  ];
  const strip = Array.from({ length: GROUPS_PER_STRIP }, () => code).join(' ');

  return (
    <div className={classes.filter(Boolean).join(' ')}>
      <div className="morse-divider__track" aria-hidden="true">
        <span className="morse-divider__strip">{strip}&nbsp;</span>
        <span className="morse-divider__strip">{strip}&nbsp;</span>
      </div>
      {label && (
        <h2 className="morse-divider__label" id={labelId}>
          {label}
        </h2>
      )}
    </div>
  );
}
