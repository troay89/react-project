import { render, screen } from '../../../test/test-utils';
import { Search } from './Search';

describe('Search', () => {
  test('renders correctly Search', () => {
    render(<Search />);
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByRole('button', {
      name: /найти/i,
    });
    expect(searchButton).toBeInTheDocument();
    const errorButton = screen.getByRole('button', {
      name: /ошибка/i,
    });
    expect(errorButton).toBeInTheDocument();
  });
});
