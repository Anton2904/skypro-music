export type Track = {
  id: number;
  title: string;
  subtitle?: string;
  author: string;
  album: string;
  duration: string;
  year: number;
  genre: string;
};

export const tracks: Track[] = [
  {
    id: 1,
    title: 'Guilt',
    author: 'Nero',
    album: 'Welcome Reality',
    duration: '4:44',
    year: 2011,
    genre: 'Dubstep',
  },
  {
    id: 2,
    title: 'Elektro',
    author: 'Dynoro, Outwork, Mr. Gee',
    album: 'Elektro',
    duration: '2:22',
    year: 2020,
    genre: 'Dance',
  },
  {
    id: 3,
    title: 'I’m Fire',
    author: 'Ali Bakgor',
    album: 'I’m Fire',
    duration: '2:22',
    year: 2022,
    genre: 'House',
  },
  {
    id: 4,
    title: 'Non Stop',
    subtitle: '(Remix)',
    author: 'Стоункат, Psychopath',
    album: 'Non Stop',
    duration: '4:12',
    year: 2019,
    genre: 'Hip-Hop',
  },
  {
    id: 5,
    title: 'Run Run',
    subtitle: '(feat. AR/CO)',
    author: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    duration: '2:54',
    year: 2023,
    genre: 'Tech House',
  },
];

export const sidebarPlaylists = [
  { id: 1, src: '/img/playlist01.png', alt: 'playlist of the day 1' },
  { id: 2, src: '/img/playlist02.png', alt: 'playlist of the day 2' },
  { id: 3, src: '/img/playlist03.png', alt: 'playlist of the day 3' },
];
