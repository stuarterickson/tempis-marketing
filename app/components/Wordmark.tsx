/* eslint-disable @next/next/no-img-element -- the lockups are outlined SVGs; Next's image pipeline adds nothing here */

/**
 * The Backbeat lockups: the mark, "Backbeat" in Schibsted Grotesk and the second
 * part in its italic (Golf, or for Clubs). Drawn as outlines (public/brand), never retyped.
 */
export function Wordmark({
  product = 'Golf',
  onDark = false,
  height = 36,
}: {
  product?: 'Golf' | 'Clubs';
  onDark?: boolean;
  height?: number;
}) {
  const file = `/brand/backbeat-${product.toLowerCase()}-lockup${onDark ? '-reversed' : ''}.svg`;
  const width = Math.round(height * (product === 'Golf' ? 329.36 : 411.61) / 64);
  const alt = product === 'Golf' ? 'Backbeat Golf' : 'Backbeat for Clubs';
  return <img src={file} alt={alt} width={width} height={height} className="block" />;
}
