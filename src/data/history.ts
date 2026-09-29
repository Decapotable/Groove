export type Chapter = {
  id: string;
  /** Grand libellé de la période. */
  period: string;
  title: string;
  text: string;
  artists: readonly string[];
  albumIds: readonly string[];
};

/** Les chapitres de la page History. */
export const chapters: readonly Chapter[] = [
  {
    id: 'birth',
    period: '1920s',
    title: 'The birth of jazz culture',
    text: 'In the ports and dance halls of New Orleans, Chicago and New York, blues, ragtime and brass bands merge into something new. Recording turns a local scene into a national language, and the soloist steps forward.',
    artists: ['Louis Armstrong', 'Duke Ellington', 'Jelly Roll Morton', 'Bessie Smith'],
    albumIds: ['hot-fives-and-sevens'],
  },
  {
    id: 'bebop',
    period: '1940s',
    title: 'Bebop',
    text: 'Small groups, fast tempos and dense harmony. Musicians who had played for dancers start playing for listeners, and the after-hours jam session becomes the laboratory of modern jazz.',
    artists: ['Charlie Parker', 'Dizzy Gillespie', 'Bud Powell', 'Thelonious Monk'],
    albumIds: ['savoy-sessions', 'amazing-bud-powell'],
  },
  {
    id: 'cool-hard-bop',
    period: '1950s',
    title: 'Hard bop / Cool jazz',
    text: 'Two answers to bebop. West Coast cool favours space and arrangement; hard bop returns to blues, gospel and drive. The long-playing record gives both a home, and 1959 becomes one of the great years in music.',
    artists: ['Miles Davis', 'Dave Brubeck', 'Art Blakey', 'Sonny Rollins', 'Charles Mingus'],
    albumIds: ['kind-of-blue', 'time-out', 'moanin'],
  },
  {
    id: 'modal-free',
    period: '1960s',
    title: 'Modal jazz / Free jazz',
    text: 'Fewer chords, more time. Modal playing opens up long, patient improvisation; free jazz drops the rules entirely. A decade of searching, spiritual and political, played at full volume.',
    artists: ['John Coltrane', 'Bill Evans', 'Herbie Hancock', 'Ornette Coleman'],
    albumIds: ['giant-steps', 'waltz-for-debby', 'maiden-voyage'],
  },
  {
    id: 'fusion',
    period: '1970s',
    title: 'Jazz fusion',
    text: 'Electric guitars, synthesizers and rock and funk rhythms enter the studio. Purists protest, audiences grow, and a generation of virtuosos builds a new instrumental music.',
    artists: ['Miles Davis', 'Herbie Hancock', 'Weather Report', 'Chick Corea'],
    albumIds: ['bitches-brew', 'head-hunters', 'heavy-weather'],
  },
  {
    id: 'modern',
    period: '1980s+',
    title: 'Modern jazz',
    text: 'From the acoustic revival to hip-hop collaborations, jazz stops being a single style. Today it is a way of playing, more than a genre: open, cross-cultural and always in conversation with the past.',
    artists: ['Wynton Marsalis', 'Pat Metheny', 'Cassandra Wilson', 'Kamasi Washington'],
    albumIds: ['black-codes', 'wish', 'the-epic'],
  },
];
