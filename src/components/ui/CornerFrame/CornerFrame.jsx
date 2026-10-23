import './CornerFrame.css';

/** Wraps content in four crop-mark corners (Guidelines graphic toolkit: crop marks). */
export function CornerFrame({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`corner-frame ${className}`.trim()} {...rest}>
      <span className="corner-frame__corner corner-frame__corner--top-left" aria-hidden="true" />
      <span className="corner-frame__corner corner-frame__corner--top-right" aria-hidden="true" />
      <span className="corner-frame__corner corner-frame__corner--bottom-left" aria-hidden="true" />
      <span className="corner-frame__corner corner-frame__corner--bottom-right" aria-hidden="true" />
      {children}
    </Tag>
  );
}
