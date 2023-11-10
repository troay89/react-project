import { render, screen } from '../../../../test/test-utils';
import { Card } from './Card';

describe('Card', () => {
  test('renders correctly Card', () => {
    render(
      <Card
        id={1}
        gender={'woman'}
        name={'Anna'}
        species={'human'}
        image={''}
        onClickHandler={() => {}}
      />
    );
    const imgCharacter = screen.getByRole('img');
    expect(imgCharacter).toBeInTheDocument();
    const nameCharacter = screen.getByRole('heading', {
      name: /Anna/i,
    });
    expect(nameCharacter).toBeInTheDocument();
    const text = screen.getByText(/short description/i);
    expect(text).toBeInTheDocument();
    const gender = screen.getByText(/gender: woman/i);
    expect(gender).toBeInTheDocument();
    const species = screen.getByText(/species: human/i);
    expect(species).toBeInTheDocument();
    const detailButton = screen.getByRole('button', {
      name: /подробнее/i,
    });
    expect(detailButton).toBeInTheDocument();
  });
});
