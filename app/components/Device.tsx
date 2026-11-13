/*
 * A realistic phone, set at an angle in 3D with a soft floor shadow.
 * The screen inside is whatever the page puts there (drawn in the Play
 * app's own colours). `tilt` picks which way it turns toward the reader.
 */

export type Tilt = 'left' | 'right' | 'hero' | 'face-left' | 'face-right' | 'flat';

export default function Device({
  children,
  tilt = 'right',
  label,
  float,
  size = 'md',
}: {
  size?: 'md' | 'sm';
  children: React.ReactNode;
  tilt?: Tilt;
  label: string;
  /** Optional card that floats in front of the phone, for depth. */
  float?: React.ReactNode;
}) {
  return (
    <figure className={`dv dv-${tilt} dv-${size}`} role="img" aria-label={label}>
      <div className="dv-stage">
        <div className="dv-floor" aria-hidden />
        <div className="dv-body">
          <span className="dv-btn dv-btn-a" aria-hidden />
          <span className="dv-btn dv-btn-b" aria-hidden />
          <span className="dv-btn dv-btn-c" aria-hidden />
          <div className="dv-screen">
            <div className="dv-island" aria-hidden />
            {children}
            <div className="dv-glare" aria-hidden />
          </div>
        </div>
        {float && <div className="dv-float">{float}</div>}
      </div>
    </figure>
  );
}
