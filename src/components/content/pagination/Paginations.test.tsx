import { render, screen } from '../../../../test/test-utils';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  test('renders correctly Pagination', () => {
    render(<Pagination numberPage={3} onSelectPage={() => {}} />);
    const text = screen.getByText(/3/i);
    expect(text).toBeInTheDocument();
  });
});
