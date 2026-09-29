export type CoverMotif =
  | 'horizon'
  | 'steps'
  | 'clock'
  | 'corners'
  | 'stripes'
  | 'orbit'
  | 'waltz'
  | 'split'
  | 'monolith'
  | 'sun';

export type Album = {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  /** Durée totale approximative, en minutes (données mockées). */
  minutes: number;
  /** Morceau mis en avant dans le lecteur. */
  track: { title: string; seconds: number };
  /** Courte note éditoriale affichée sur la page du disque. */
  note: string;
  cover: { motif: CoverMotif; background: string; ink: string; accent: string };
};

type CoverInput = Album['cover'];
const cover = (motif: CoverMotif, background: string, ink: string, accent: string): CoverInput => ({
  motif,
  background,
  ink,
  accent,
});

/** Données mockées : les années des compilations et des sessions sont indicatives. */
export const albums: readonly Album[] = [
  {
    id: 'hot-fives-and-sevens',
    title: 'Hot Fives & Sevens',
    artist: 'Louis Armstrong',
    year: 1927,
    genre: 'New Orleans jazz',
    minutes: 60,
    track: { title: 'West End Blues', seconds: 198 },
    note: 'Studio sessions that made the soloist the centre of jazz.',
    cover: cover('sun', '#2B2118', '#EFE8D8', '#C8642B'),
  },
  {
    id: 'savoy-sessions',
    title: 'The Savoy Sessions',
    artist: 'Charlie Parker',
    year: 1945,
    genre: 'Bebop',
    minutes: 48,
    track: { title: 'Ko-Ko', seconds: 170 },
    note: 'Speed, harmony and daring: bebop announces itself.',
    cover: cover('steps', '#0F1B1A', '#EFE8D8', '#E27B3A'),
  },
  {
    id: 'amazing-bud-powell',
    title: 'The Amazing Bud Powell',
    artist: 'Bud Powell',
    year: 1949,
    genre: 'Bebop',
    minutes: 40,
    track: { title: 'Un Poco Loco', seconds: 240 },
    note: 'The piano trio as we know it, invented in a few sessions.',
    cover: cover('corners', '#221A22', '#E7B98F', '#8E6BA8'),
  },
  {
    id: 'chet-baker-sings',
    title: 'Chet Baker Sings',
    artist: 'Chet Baker',
    year: 1954,
    genre: 'Cool jazz',
    minutes: 33,
    track: { title: 'My Funny Valentine', seconds: 194 },
    note: 'A trumpeter who whispers, and a voice that never raises itself.',
    cover: cover('sun', '#A7B0B4', '#141210', '#141210'),
  },
  {
    id: 'saxophone-colossus',
    title: 'Saxophone Colossus',
    artist: 'Sonny Rollins',
    year: 1956,
    genre: 'Hard bop',
    minutes: 40,
    track: { title: 'St. Thomas', seconds: 418 },
    note: 'Calypso, swagger and improvisation built like architecture.',
    cover: cover('monolith', '#3A2C24', '#EFE8D8', '#C8642B'),
  },
  {
    id: 'brilliant-corners',
    title: 'Brilliant Corners',
    artist: 'Thelonious Monk',
    year: 1957,
    genre: 'Hard bop',
    minutes: 42,
    track: { title: 'Brilliant Corners', seconds: 461 },
    note: 'Angular themes and silences that swing harder than notes.',
    cover: cover('corners', '#1B1613', '#E7B98F', '#C8642B'),
  },
  {
    id: 'moanin',
    title: "Moanin'",
    artist: 'Art Blakey',
    year: 1958,
    genre: 'Hard bop',
    minutes: 39,
    track: { title: "Moanin'", seconds: 559 },
    note: 'The Jazz Messengers turn gospel call-and-response into a groove.',
    cover: cover('split', '#B6461E', '#0A0908', '#EFE8D8'),
  },
  {
    id: 'kind-of-blue',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    year: 1959,
    genre: 'Modal jazz',
    minutes: 46,
    track: { title: 'So What', seconds: 562 },
    note: 'Space, restraint and modes: the best-selling jazz record of all time.',
    cover: cover('horizon', '#0E1A2B', '#EFE8D8', '#3F6FA8'),
  },
  {
    id: 'time-out',
    title: 'Time Out',
    artist: 'Dave Brubeck Quartet',
    year: 1959,
    genre: 'Cool jazz',
    minutes: 38,
    track: { title: 'Take Five', seconds: 324 },
    note: 'Odd meters made irresistible: 5/4 on the radio.',
    cover: cover('clock', '#E4DBC7', '#141210', '#C8642B'),
  },
  {
    id: 'mingus-ah-um',
    title: 'Mingus Ah Um',
    artist: 'Charles Mingus',
    year: 1959,
    genre: 'Hard bop',
    minutes: 44,
    track: { title: 'Goodbye Pork Pie Hat', seconds: 285 },
    note: 'Church, blues and satire in a single restless band.',
    cover: cover('stripes', '#2A1F17', '#EFE8D8', '#E27B3A'),
  },
  {
    id: 'giant-steps',
    title: 'Giant Steps',
    artist: 'John Coltrane',
    year: 1960,
    genre: 'Hard bop',
    minutes: 37,
    track: { title: 'Giant Steps', seconds: 285 },
    note: 'Chord changes so fast that they redrew the map for every saxophonist.',
    cover: cover('steps', '#120F0D', '#EFE8D8', '#C8642B'),
  },
  {
    id: 'waltz-for-debby',
    title: 'Waltz for Debby',
    artist: 'Bill Evans',
    year: 1962,
    genre: 'Cool jazz',
    minutes: 41,
    track: { title: 'My Foolish Heart', seconds: 297 },
    note: 'A trio that listens as much as it plays, recorded live at the Village Vanguard.',
    cover: cover('waltz', '#D8D2C4', '#1B1815', '#7A736A'),
  },
  {
    id: 'maiden-voyage',
    title: 'Maiden Voyage',
    artist: 'Herbie Hancock',
    year: 1965,
    genre: 'Modal jazz',
    minutes: 39,
    track: { title: 'Maiden Voyage', seconds: 471 },
    note: 'Sea-themed suspended chords that still sound like open water.',
    cover: cover('orbit', '#0C2A2E', '#EFE8D8', '#E27B3A'),
  },
  {
    id: 'bitches-brew',
    title: 'Bitches Brew',
    artist: 'Miles Davis',
    year: 1970,
    genre: 'Jazz fusion',
    minutes: 94,
    track: { title: "Pharaoh's Dance", seconds: 1207 },
    note: 'Electric instruments, studio editing and a band that refuses to resolve.',
    cover: cover('orbit', '#2A0F0A', '#EFE8D8', '#C8642B'),
  },
  {
    id: 'head-hunters',
    title: 'Head Hunters',
    artist: 'Herbie Hancock',
    year: 1973,
    genre: 'Jazz fusion',
    minutes: 42,
    track: { title: 'Chameleon', seconds: 941 },
    note: 'Funk bass lines and synthesizers on a jazz label.',
    cover: cover('stripes', '#1B1B0E', '#EFE8D8', '#D9A21B'),
  },
  {
    id: 'koln-concert',
    title: 'The Köln Concert',
    artist: 'Keith Jarrett',
    year: 1975,
    genre: 'Modern jazz',
    minutes: 66,
    track: { title: 'Part I', seconds: 1561 },
    note: 'A solo piano improvised in one evening, on a piano no one wanted to play.',
    cover: cover('waltz', '#1F2529', '#EFE8D8', '#8AA3AD'),
  },
  {
    id: 'heavy-weather',
    title: 'Heavy Weather',
    artist: 'Weather Report',
    year: 1977,
    genre: 'Jazz fusion',
    minutes: 42,
    track: { title: 'Birdland', seconds: 357 },
    note: 'Fusion at its most melodic, with a hit that has outlived its era.',
    cover: cover('horizon', '#2A1A0E', '#EFE8D8', '#E27B3A'),
  },
  {
    id: 'black-codes',
    title: 'Black Codes (From the Underground)',
    artist: 'Wynton Marsalis',
    year: 1985,
    genre: 'Modern jazz',
    minutes: 43,
    track: { title: 'Black Codes', seconds: 360 },
    note: 'A young quintet reclaims acoustic post-bop for a new decade.',
    cover: cover('clock', '#0E0E12', '#EFE8D8', '#C8642B'),
  },
  {
    id: 'still-life-talking',
    title: 'Still Life (Talking)',
    artist: 'Pat Metheny Group',
    year: 1987,
    genre: 'Modern jazz',
    minutes: 44,
    track: { title: 'Last Train Home', seconds: 320 },
    note: 'Guitar synth, Brazilian rhythms and wide-open landscapes.',
    cover: cover('sun', '#1A2A24', '#EFE8D8', '#E7B98F'),
  },
  {
    id: 'wish',
    title: 'Wish',
    artist: 'Joshua Redman',
    year: 1993,
    genre: 'Modern jazz',
    minutes: 56,
    track: { title: "Make 'Em Wait", seconds: 350 },
    note: 'A new generation with an old-school quartet and a lot of fire.',
    cover: cover('split', '#1B2A3A', '#0A0908', '#E27B3A'),
  },
  {
    id: 'blue-light-til-dawn',
    title: "Blue Light 'til Dawn",
    artist: 'Cassandra Wilson',
    year: 1993,
    genre: 'Modern jazz',
    minutes: 70,
    track: { title: 'Come On in My Kitchen', seconds: 320 },
    note: 'Blues, folk and standards sung in a low, unhurried voice.',
    cover: cover('waltz', '#0D1A2B', '#EFE8D8', '#3F6FA8'),
  },
  {
    id: 'black-radio',
    title: 'Black Radio',
    artist: 'Robert Glasper Experiment',
    year: 2012,
    genre: 'Contemporary jazz',
    minutes: 55,
    track: { title: 'Ah Yeah', seconds: 300 },
    note: 'Hip-hop, R&B and improvisation on the same bandstand.',
    cover: cover('stripes', '#14100D', '#EFE8D8', '#C8642B'),
  },
  {
    id: 'the-epic',
    title: 'The Epic',
    artist: 'Kamasi Washington',
    year: 2015,
    genre: 'Contemporary jazz',
    minutes: 173,
    track: { title: 'Change of the Guard', seconds: 750 },
    note: 'Three hours, strings and choir: jazz thinks big again.',
    cover: cover('monolith', '#1B0F2A', '#EFE8D8', '#D9A21B'),
  },
];

export const featuredAlbumIds = ['kind-of-blue', 'giant-steps', 'time-out', 'brilliant-corners'] as const;

export function getAlbum(id: string): Album | undefined {
  return albums.find((album) => album.id === id);
}

/** Résout une liste d'ids en albums, en ignorant ceux qui n'existent plus. */
export function getAlbums(ids: readonly string[]): Album[] {
  return ids.flatMap((id) => getAlbum(id) ?? []);
}

export const defaultAlbum: Album = getAlbum('kind-of-blue') ?? albums[0];
