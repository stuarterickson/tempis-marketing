/** Site-wide facts. Change them here, never in a page. */
export const SITE = {
  name: 'Backbeat Golf',
  company: 'Backbeat Golf',
  legalName: 'Backbeat Golf LLC',
  // Registered 2026-11-13; goes live once the Vercel project and DNS are set up.
  url: 'https://backbeatgolf.com',
  playWebUrl: 'https://app.backbeatgolf.com',
  privacyUrl: 'https://app.backbeatgolf.com/privacy',
  // Temporary, per the CEO (2026-11-13): his own inbox until the business
  // addresses exist. Switch to support@backbeatgolf.com once it's set up.
  supportEmail: 'stuarterickson@yahoo.com',
  tagline: 'The scorecard, handled.',
} as const;

/** The side games Backbeat settles today (packages/utils/src/casualGames in the app repo). */
export const SIDE_GAMES = [
  'Skins',
  'Nassau',
  'Wolf',
  'Vegas',
  'Sixes',
  'Nines',
  'Snake',
  'Rabbit',
  'Hammer',
  'Junk',
  'Bingo Bango Bongo',
  'Stableford',
] as const;
