import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App';
import { Launch } from '../launch/Launch';
import { CardDetails } from '../components/content/card-details/CardDetails';
import { Page404 } from '../components/page404/Page404';
import { Provider } from 'react-redux';
import { setupStore } from '../redux/store/store';

const store = setupStore();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <Launch />
      </Provider>
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
