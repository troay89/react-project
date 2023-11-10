import { Search } from './components/search/Search';
import { Content } from './components/content/Content';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Search />
      <Content />
      <Outlet />
    </>
  );
};

export { App };
