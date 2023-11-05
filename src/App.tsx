import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Search } from './components/search/Search';
import { Content } from './components/content/Content';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchCharacter = searchParams.get('character');
  const searchPage = searchParams.get('page');

  const sendSearch = (search: string) => {
    searchParams.set('character', search.trim());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const sendNumberPage = (numberPage: string) => {
    searchParams.set('page', numberPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <ErrorBoundary>
      <Search onSendSearch={sendSearch} />
      <Content
        searchCharacter={searchCharacter}
        onNumberPage={sendNumberPage}
        searchPage={Number(searchPage)}
      />
    </ErrorBoundary>
  );
}
