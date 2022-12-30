import { EResource, EShowTypes } from '~shared/.consts';

export const searchResult = [
  {
    resources: [EResource.IMDB],
    title: 'Star Trek',
    id: 8890843246488445,
    image:
      'https://m.media-amazon.com/images/M/MV5BNDRkMTNiNjgtZDIyOC00NmE1LTlkZjEtMGZiNTcyZDQ0NjcxXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg',
    type: 1,
    year: 1966,
    resourceShowId: 'tt0060028',
  },
  {
    resources: [EResource.IMDB],
    title: 'Star Trek: The Next Generation',
    id: 2988803902618679,
    image:
      'https://m.media-amazon.com/images/M/MV5BOWFhYjE4NzMtOWJmZi00NzEyLTg5NTctYmIxMTU1ZDIxMDAyXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg',
    type: 1,
    year: 1987,
    resourceShowId: 'tt0092455',
  },
  {
    resources: [EResource.IMDB],
    title: 'Star Trek: Discovery',
    id: 4381281537532872,
    image:
      'https://m.media-amazon.com/images/M/MV5BNjg1NTc2MDktZTU5Ni00OTZiLWIyNjQtN2FhNGY4MzAxNmZkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    type: 1,
    year: 2017,
    resourceShowId: 'tt5171438',
  },
  {
    resources: [EResource.IMDB],
    title: 'Star Wars: Episode IV - A New Hope',
    id: 8961740115176478,
    image:
      'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg',
    type: 2,
    year: 1977,
    resourceShowId: 'tt0076759',
  },
  {
    resources: [EResource.IMDB],
    title: 'The Star',
    id: 6332018934095456,
    image: 'https://m.media-amazon.com/images/M/MV5BMTU4MDQ4NTM2N15BMl5BanBnXkFtZTgwNDM1NTIzMzI@._V1_.jpg',
    type: 2,
    year: 2017,
    resourceShowId: 'tt4587656',
  },
  {
    resources: [EResource.IMDB],
    title: 'Star Trek: Strange New Worlds',
    id: 7729470027862058,
    image:
      'https://m.media-amazon.com/images/M/MV5BYWNlYmZkZjQtNjU5OS00YTNkLWJmOTEtYmZiMmUwZGI3NTM3XkEyXkFqcGdeQXVyMTM2NTIwMDIw._V1_.jpg',
    type: 1,
    year: 2022,
    resourceShowId: 'tt12327578',
  },
];

export const showData = {
  imdbId: '0060028',
  resource: EResource.IMDB,
  title: 'Star Trek',
  hash: 0,
  imagePreview:
    'https://m.media-amazon.com/images/M/MV5BNDRkMTNiNjgtZDIyOC00NmE1LTlkZjEtMGZiNTcyZDQ0NjcxXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg',
  type: EShowTypes.TVSHOW,
  year: 1966,
  description:
    'In the 23rd Century, Captain James T. Kirk and the crew of the U.S.S. Enterprise explore the galaxy and defend the United Federation of Planets.',
  resourceShowId: '0060028',
};
