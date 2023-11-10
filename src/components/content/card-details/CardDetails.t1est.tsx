import { render, screen } from '../../../../test/test-utils';
import { CardDetails } from './CardDetails';

describe('CardDetails', () => {
  test('renders correctly CardDetails', () => {
    render(<CardDetails />);
    const imgCharacter = screen.getByRole('img');
    expect(imgCharacter).toBeInTheDocument();
    const gender = screen.getByText(/gender:/i);
    expect(gender).toBeInTheDocument();
    const species = screen.getByText(/species:/i);
    expect(species).toBeInTheDocument();
  });
});
