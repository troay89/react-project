import { CharacterI, ContentI } from '../models/models';

async function getCharacters(
  search: string,
  page: number,
  abortController: AbortController
): Promise<ContentI> {
  const res: Response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}${
      search === '' ? '' : `&name=${search}`
    }`,
    {
      method: 'GET',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await res.json();
}

async function getCharacterDetails(id: number): Promise<CharacterI> {
  const res: Response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await res.json();
}

export { getCharacters, getCharacterDetails };
