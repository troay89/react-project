import { render, screen } from '../../../test/test-utils';
import { Content } from './Content';
import user from '@testing-library/user-event';
import { server } from '../../setupTests';
import { http, HttpResponse } from 'msw';

describe('Content', () => {
  test('renders correctly Loading', () => {
    render(<Content />);
    const loader = screen.getByText(/loading/i);
    expect(loader).toBeInTheDocument();
  });
  test('renders correctly Content', async () => {
    render(<Content />);
    const cardListCharacter = await screen.findByRole('characterList');
    expect(cardListCharacter.children).toHaveLength(2);
    const text = screen.getByText(/сколько элементов отображать на странице/i);
    expect(text).toBeInTheDocument();
    const chooseElements = screen.getByRole('combobox');
    expect(chooseElements).toBeInTheDocument();
    expect(chooseElements).toHaveValue('20');
    await user.selectOptions(chooseElements, '10');
    expect(chooseElements).toHaveValue('10');
    const spanPage = await screen.findByRole('page21');
    expect(spanPage).toBeInTheDocument();
    await user.click(spanPage);
  });

  test('Not found', async () => {
    server.use(
      http.get(`https://rickandmortyapi.com/api/character/`, () => {
        return HttpResponse.json({
          count: 2,
          pages: 1,
          next: 'string',
          prev: 'string',
          results: undefined,
        });
      })
    );
    render(<Content />);
    const notFound = await screen.findByText(/извините не чего не найдено/i);
    expect(notFound).toBeInTheDocument();
  });
});
