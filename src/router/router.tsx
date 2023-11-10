import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Launch } from '../launch/Launch';
import { CardDetails } from '../components/content/card-details/CardDetails';
import { AuthProvider } from '../context/context';
import { Page404 } from '../components/page404/Page404';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Launch />
      </AuthProvider>
    ),
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/details/:id',
            element: <CardDetails />,
          },
        ],
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

export { router };
