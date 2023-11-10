import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Launch } from '../launch/Launch';
import { CardDetails } from '../components/content/card-details/CardDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Launch />,
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
    ],
  },
]);

export { router };
