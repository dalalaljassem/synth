import './ColorPalette.css';

/** Row of colour swatches describing the current slide's palette. */
export function ColorPalette({ colors = [] }) {
  if (colors.length === 0) return null;

  return (
    <ul className="color-palette" aria-label="Colour palette">
      {colors.map((color, index) => (
        <li
          key={`${color}-${index}`}
          className="color-palette__swatch"
          style={{ backgroundColor: color }}
          title={color}
        >
          <span className="visually-hidden">{color}</span>
        </li>
      ))}
    </ul>
  );
}
