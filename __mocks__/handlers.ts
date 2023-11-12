import { rest } from 'msw';

export const handlers = [
  rest.get(
    `https://rickandmortyapi.com/api/character/?page=1`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            count: 1,
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
          },
        ])
      );
    }
  ),
  rest.get(`https://rickandmortyapi.com/api/character/1`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Anna',
          species: 'human',
          image: '',
          url: '',
          gender: 'women',
        },
      ])
    );
  }),
];
