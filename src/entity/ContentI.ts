import CharacterI from './CharacterI';

export default interface ContentI {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterI[];
}
