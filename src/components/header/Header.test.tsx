import { render, screen } from '../../../test/test-utils';
import { Header } from './Header';

describe('Page404', () => {
  test('renders correctly Page404', () => {
    render(<Header />);
    const heading = screen.getByRole('heading', {
      name: /react project/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
