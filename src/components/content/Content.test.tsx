import { render, screen } from '../../../test/test-utils';
import { Content } from './Content';
import user from '@testing-library/user-event';

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
});
