import CharacterI from './Character';

export default interface ContentI {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterI[];
}
