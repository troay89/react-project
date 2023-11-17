import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ContentI } from '../models/models';

interface QueriesP {
  page: number;
  search: string;
}

export const postAPI = createApi({
  reducerPath: 'Character',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com' }),
  tagTypes: ['Get'],
  endpoints: (build) => ({
    fetchAllPosts: build.query<ContentI, QueriesP>({
      query: ({ page, search }) => ({
        url: `/api/character/`,
        params: {
          page: page,
          name: search,
        },
      }),
    }),
  }),
});
