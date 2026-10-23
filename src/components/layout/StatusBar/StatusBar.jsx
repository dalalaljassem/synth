import './StatusBar.css';

/** Technical metadata strip under the header (location · year · status). */
export function StatusBar({ descriptor, location, year, status }) {
  return (
    <div className="status-bar">
      <p className="status-bar__descriptor">{descriptor}</p>
      <p className="status-bar__meta">
        <span className="status-bar__item">{location}</span>
        <span className="status-bar__item">{year}</span>
        <span className="status-bar__item status-bar__item--status">
          {status}
          <span className="status-bar__indicator" aria-hidden="true" />
        </span>
      </p>
    </div>
  );
}
