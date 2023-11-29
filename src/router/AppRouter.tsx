import { useRoutes, type RouteObject } from 'react-router-dom';
import App from '../App.tsx';
import React from 'react';
import { Controlled } from '../components/Controlled.tsx';
import { Uncontrolled } from '../components/Uncontrolled.tsx';

const paths = {
  root: {
    path: '/',
  },
  controlled: {
    path: '/controlled',
  },
  uncontrolled: {
    path: '/uncontrolled',
  },
};

const allRoutes: RouteObject = {
  path: paths.root.path,
  children: [
    { path: paths.root.path, element: <App /> },
    { path: paths.controlled.path, element: <Controlled /> },
    { path: paths.uncontrolled.path, element: <Uncontrolled /> },
  ],
};

export const AppRouter = React.memo(() => {
  return useRoutes([allRoutes]);
});

AppRouter.displayName = 'AppRouter';

export default AppRouter;
