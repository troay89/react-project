import React, { Component } from 'react';
import Search from './components/search/Search';
import ErrorBoundary from './components/error/ErrorBoundary';

export default class App extends Component {
  render(): React.ReactElement {
    return (
      <ErrorBoundary>
        <>
          <Search />
        </>
      </ErrorBoundary>
    );
  }
}
