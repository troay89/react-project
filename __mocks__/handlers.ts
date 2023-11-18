import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`https://rickandmortyapi.com/api/character/`, () => {
    return HttpResponse.json({
      count: 2,
      pages: 1,
      next: 'string',
      prev: 'string',
      results: [
        {
          id: 1,
          name: 'Anna',
          species: 'human',
          image: '',
          url: '',
          gender: 'women',
        },
        {
          id: 2,
          name: 'Peta',
          species: 'human',
          image: '',
          url: '',
          gender: 'man',
        },
      ],
    });
  }),
  http.get(`https://rickandmortyapi.com/api/character/6`, () => {
    return HttpResponse.json({
      id: 1,
      name: 'Anna',
      species: 'human',
      image: '',
      url: '',
      gender: 'women',
    });
  }),
];
