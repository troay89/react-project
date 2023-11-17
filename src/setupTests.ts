import { handlers } from '../__mocks__/handlers';
import { setupServer } from 'msw/node';

beforeAll(() => server.listen());
afterAll(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

export const server = setupServer(...handlers);
