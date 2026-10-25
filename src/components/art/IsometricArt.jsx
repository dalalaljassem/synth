/**
 * Static isometric line drawings for the sub-brand pages (placeholder until an
 * image or video replaces them). Top faces take the page accent (--accent).
 * variant: 'formed' — stacked planes · 'objects' — a box with the synth dot above it
 */
const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const CX = 260;
const CY = 300;

// x, y on the ground plane, z up → screen point
const iso = (x, y, z = 0) => [CX + (x - y) * COS, CY + (x + y) * SIN - z];
const pts = (list) => list.map((p) => iso(...p).map((n) => n.toFixed(1)).join(',')).join(' ');

function Formed() {
  const s = 110;
  const levels = [0, 46, 92, 138];
  const square = (z) => pts([[-s, -s, z], [s, -s, z], [s, s, z], [-s, s, z]]);
  const corners = [[-s, -s], [s, -s], [s, s], [-s, s]];
  return (
    <>
      {corners.map(([x, y], i) => {
        const [x1, y1] = iso(x, y, levels[0]);
        const [x2, y2] = iso(x, y, levels[levels.length - 1]);
        return <line key={i} className="iso-art__guide" x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {levels.map((z, i) => (
        <polygon
          key={z}
          className={i === levels.length - 1 ? 'iso-art__face iso-art__face--accent' : 'iso-art__face'}
          points={square(z)}
        />
      ))}
      {/* faint rules on the top plane */}
      <polyline className="iso-art__rule" points={pts([[-s * 0.6, -s * 0.2, 138], [s * 0.6, -s * 0.2, 138]])} />
      <polyline className="iso-art__rule" points={pts([[-s * 0.6, s * 0.15, 138], [s * 0.3, s * 0.15, 138]])} />
    </>
  );
}

function Objects() {
  const s = 92;
  const h = 150;
  const [dx, dy] = iso(0, 0, h + 92);
  return (
    <>
      <polygon className="iso-art__face iso-art__face--shade" points={pts([[-s, s, 0], [s, s, 0], [s, s, h], [-s, s, h]])} />
      <polygon className="iso-art__face" points={pts([[s, -s, 0], [s, s, 0], [s, s, h], [s, -s, h]])} />
      <polygon className="iso-art__face iso-art__face--accent" points={pts([[-s, -s, h], [s, -s, h], [s, s, h], [-s, s, h]])} />
      {/* lid lifted off and tilted */}
      <polygon className="iso-art__face" points={pts([[-s, -s - 30, h + 54], [s, -s - 30, h + 34], [s, s - 30, h + 34], [-s, s - 30, h + 54]])} />
      <polyline className="iso-art__rule" points={pts([[-s * 0.7, s, h * 0.35], [s * 0.4, s, h * 0.35]])} />
      <polyline className="iso-art__rule" points={pts([[s, -s * 0.6, h * 0.55], [s, s * 0.5, h * 0.55]])} />
      {/* the synth dot rising out of the box */}
      <circle className="iso-art__dot" cx={dx} cy={dy} r="26" />
      <ellipse className="iso-art__shadow" cx={iso(0, 0, h)[0]} cy={iso(0, 0, h)[1]} rx="34" ry="12" />
    </>
  );
}

export function IsometricArt({ variant = 'formed', className = '', label }) {
  return (
    <svg className={`iso-art ${className}`.trim()} viewBox="0 0 520 520" role="img" aria-label={label}>
      {variant === 'objects' ? <Objects /> : <Formed />}
    </svg>
  );
}
