import { render, screen } from '../../../../test/test-utils';
import { Pagination } from './Pagination';
import user from '@testing-library/user-event';

describe('Pagination', () => {
  test('renders correctly Pagination', async () => {
    user.setup();
    const onHandler = jest.fn();
    render(<Pagination numberPage={3} onSelectPage={onHandler} />);
    const text = await screen.findByText(/3/i);
    expect(text).toBeInTheDocument();
    await user.click(text);
    expect(onHandler).toHaveBeenCalledTimes(1);
  });
});
