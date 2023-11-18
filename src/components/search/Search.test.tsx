import { render, screen, cleanup } from '../../../test/test-utils';
import { Search } from './Search';
import user from '@testing-library/user-event';
import { SEARCH_VALUE } from '../../models/models';
// import { cleanup } from '@testing-library/react';

cleanup();

describe('Search', () => {
  test('renders correctly Search', () => {
    render(<Search />);
    const searchInput = screen.getByRole('searchbox');
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByRole('button', {
      name: /найти/i,
    });
    expect(searchButton).toBeInTheDocument();
  });

  test('check', async () => {
    render(<Search />);
    const searchButton = await screen.findByRole('button', {
      name: /найти/i,
    });
    await user.click(searchButton);
    expect(localStorage.getItem(SEARCH_VALUE)).toBe(null);
    const searchInput = await screen.findByRole('searchbox');
    expect(searchInput).toHaveAttribute('value', '');
  });

  test('Save value to the local storage', async () => {
    localStorage.clear();
    render(<Search />);
    expect(localStorage.getItem(SEARCH_VALUE)).toBe(null);
    const searchInput = await screen.findByRole('searchbox');
    await user.type(searchInput, 'anna');
    const searchButton = await screen.findByRole('button', {
      name: /найти/i,
    });
    await user.click(searchButton);
    expect(localStorage.getItem(SEARCH_VALUE)).toBe('anna');
    expect(searchInput).toHaveAttribute('value', 'anna');
  });

  test('Recieves the value from local storage', async () => {
    localStorage.setItem(SEARCH_VALUE, 'Svea');

    render(<Search />);

    const searchInput = await screen.findByRole('searchbox');
    expect(searchInput).toHaveAttribute('value', 'Svea');
  });
});
