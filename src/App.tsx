import React, { useState } from 'react';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Search } from './components/search/Search';
import { Content } from './components/content/Content';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState<string>('R');

  const sendSearch = (search: string) => {
    setInputSearch(search);
    searchParams.set('character', search.trim());
    setSearchParams(searchParams);
  };

  const sendNumberPage = (numberPage: number) => {
    searchParams.set('page', numberPage.toString());
    setSearchParams(searchParams);
  };

  console.log(inputSearch);

  return (
    <ErrorBoundary>
      <Search onSendSearch={sendSearch} />
      <Content search={inputSearch} onNumberPage={sendNumberPage} />
    </ErrorBoundary>
  );
}
