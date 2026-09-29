export type Decade = {
  id: string;
  /** Libellé affiché sur la timeline. */
  label: string;
  headline: string;
  artists: readonly string[];
  albumIds: readonly string[];
};

/** Les décennies de la page Discover. */
export const decades: readonly Decade[] = [
  {
    id: '1920s',
    label: '1920s',
    headline: 'Jazz leaves New Orleans.',
    artists: ['Louis Armstrong', 'Duke Ellington', 'Jelly Roll Morton', 'Bessie Smith', 'Sidney Bechet'],
    albumIds: ['hot-fives-and-sevens'],
  },
  {
    id: '1940s',
    label: '1940s',
    headline: 'Bebop breaks the rules.',
    artists: ['Charlie Parker', 'Dizzy Gillespie', 'Bud Powell', 'Thelonious Monk', 'Max Roach'],
    albumIds: ['savoy-sessions', 'amazing-bud-powell'],
  },
  {
    id: '1950s',
    label: '1950s',
    headline: 'Cool, hard, and everywhere.',
    artists: ['Miles Davis', 'Dave Brubeck', 'Thelonious Monk', 'Art Blakey', 'Sonny Rollins', 'Charles Mingus', 'Chet Baker'],
    albumIds: [
      'chet-baker-sings',
      'saxophone-colossus',
      'brilliant-corners',
      'moanin',
      'kind-of-blue',
      'time-out',
      'mingus-ah-um',
    ],
  },
  {
    id: '1960s',
    label: '1960s',
    headline: 'Modes, freedom, and the avant-garde.',
    artists: ['John Coltrane', 'Bill Evans', 'Herbie Hancock', 'Ornette Coleman', 'Wayne Shorter'],
    albumIds: ['giant-steps', 'waltz-for-debby', 'maiden-voyage'],
  },
  {
    id: '1970s',
    label: '1970s',
    headline: 'Jazz plugs in.',
    artists: ['Miles Davis', 'Herbie Hancock', 'Weather Report', 'Keith Jarrett', 'Chick Corea'],
    albumIds: ['bitches-brew', 'head-hunters', 'koln-concert', 'heavy-weather'],
  },
  {
    id: '1980s',
    label: '1980s',
    headline: 'Tradition returns, sounds expand.',
    artists: ['Wynton Marsalis', 'Pat Metheny', 'Branford Marsalis', 'Jaco Pastorius'],
    albumIds: ['black-codes', 'still-life-talking'],
  },
  {
    id: '1990s',
    label: '1990s',
    headline: 'A new generation takes the stand.',
    artists: ['Joshua Redman', 'Cassandra Wilson', 'Brad Mehldau', 'Roy Hargrove'],
    albumIds: ['wish', 'blue-light-til-dawn'],
  },
  {
    id: 'today',
    label: 'TODAY',
    headline: 'Jazz meets everything.',
    artists: ['Kamasi Washington', 'Robert Glasper', 'Esperanza Spalding', 'Nubya Garcia'],
    albumIds: ['black-radio', 'the-epic'],
  },
];
