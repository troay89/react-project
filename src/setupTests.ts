import '@testing-library/jest-dom';
import { server } from '../__mocks__/file-mock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());

afterAll(() => server.close());
