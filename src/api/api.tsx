import Content from '../entity/Content';

async function getCharacters(search: string): Promise<Content> {
  const res: Response = await fetch(
    `https://rickandmortyapi.com/api/character/${
      search === '' ? '' : `?name=${search}`
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
