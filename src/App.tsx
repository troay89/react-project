import React, { useState } from 'react';
import { ErrorBoundary } from './components/error/ErrorBoundary';
import { Search } from './components/search/Search';
import { Content } from './components/content/Content';

export default function App() {
  const [inputSearch, setInputSearch] = useState<string>('R');

  const sendSearch = (search: string) => {
    setInputSearch(search);
  };

  console.log(inputSearch, 'App');

  return (
    <ErrorBoundary>
      <>
        <Search onSendSearch={sendSearch} />
        <Content search={inputSearch} />
      </>
    </ErrorBoundary>
  );
}
