import { ContentI } from '../models/models';

//поиск: "https://rickandmortyapi.com/api/character/?page=2&name=rick"
//без поиска 'https://rickandmortyapi.com/api/character/?page=2'

async function getCharacters(search: string, page: number): Promise<ContentI> {
  const res: Response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}${
      search === '' ? '' : `&name=${search}`
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await res.json();
}

export default getCharacters;
