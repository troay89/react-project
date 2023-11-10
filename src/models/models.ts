const SEARCH_VALUE = 'searchValue';
const NOT_FOUNDED_MESSAGE = 'Извините не чего не найдено';

interface ContentI {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterI[];
}

interface CharacterI {
  id: number;
  name: string;
  species: string;
  image: string;
  url: string;
  gender: string;
}

export type { ContentI, CharacterI };
export { SEARCH_VALUE, NOT_FOUNDED_MESSAGE };
