import { render, screen } from '../../../test/test-utils';
import { Page404 } from './Page404';

describe('Page404', () => {
  test('renders correctly Page404', () => {
    render(<Page404 />);
    const text = screen.getByText(
      /вы ввели что то не так, такой страницы нету/i
    );
    expect(text).toBeInTheDocument();
  });
});
