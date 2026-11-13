/* eslint-disable @next/next/no-img-element -- the lockups are outlined SVGs; Next's image pipeline adds nothing here */

/**
 * The Tempis lockups: the mark, "Tempis" in Besley and the product name in
 * Besley italic. Drawn as outlines (public/brand), never retyped.
 */
export function Wordmark({
  product = 'Play',
  onDark = false,
  height = 36,
}: {
  product?: 'Play' | 'Studio';
  onDark?: boolean;
  height?: number;
}) {
  const file = `/brand/tempis-${product.toLowerCase()}-lockup${onDark ? '-reversed' : ''}.svg`;
  const width = Math.round(height * (product === 'Play' ? 403 : 453) / 64);
  return <img src={file} alt={`Tempis ${product}`} width={width} height={height} className="block" />;
}
