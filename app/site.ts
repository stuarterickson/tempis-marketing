/** Site-wide facts. Change them here, never in a page. */
export const SITE = {
  name: 'Tempis Play',
  company: 'Tempis Labs',
  url: 'https://tempislabs.com',
  playWebUrl: 'https://play.tempislabs.com',
  privacyUrl: 'https://play.tempislabs.com/privacy',
  // TODO(CEO): confirm this inbox exists and who reads it before launch.
  supportEmail: 'support@tempislabs.com',
  tagline: 'The scorecard, handled.',
} as const;

/** The side games Play settles today (packages/utils/src/casualGames in the app repo). */
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
