import React, { useState } from 'react';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Search } from './components/search/Search';
import { Content } from './components/content/Content';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState<string>('R');

  searchParams.get('character');

  const sendSearch = (search: string) => {
    setInputSearch(search);
    setSearchParams({ character: inputSearch });
  };

  console.log(inputSearch);

  return (
    <ErrorBoundary>
      <Search onSendSearch={sendSearch} />
      <Content search={inputSearch} />
    </ErrorBoundary>
  );
}
