import { ErrorBoundary } from '../components/error/ErrorBoundary';
import { Header } from '../components/header/Header';
import { Outlet } from 'react-router-dom';

const Launch = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Outlet />
    </ErrorBoundary>
  );
};

export { Launch };
