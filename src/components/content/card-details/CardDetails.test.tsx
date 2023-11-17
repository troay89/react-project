import { render, screen } from '../../../../test/test-utils';
import { CardDetails } from './CardDetails';
import user from '@testing-library/user-event';
import { Content } from '../Content';
import { server } from '../../../setupTests';
import { http, HttpResponse } from 'msw';

describe('CardDetails', () => {
  test('click button detail', async () => {
    render(<Content />);
    const detailButton = await screen.findAllByRole('button', {
      name: /подробнее/i,
    });
    await user.click(detailButton[0]);
  });
  test('renders correctly CardDetails', async () => {
    server.use(
      http.get(`https://rickandmortyapi.com/api/character/1`, () => {
        return HttpResponse.json({
          id: 1,
          name: 'Anna',
          species: 'human',
          image: '',
          url: '',
          gender: 'women',
        });
      })
    );
    render(<CardDetails />);
    const imgDetailCharacter = await screen.findByRole('img');
    expect(imgDetailCharacter).toBeInTheDocument();
    const nameDetailCharacter = await screen.findByRole('heading');
    expect(nameDetailCharacter).toBeInTheDocument();
    const species = await screen.findByText(/species:/i);
    expect(species).toBeInTheDocument();
    const gender = await screen.findByText(/gender:/i);
    expect(gender).toBeInTheDocument();
  });
  test('check button close', async () => {
    render(<CardDetails />);
    const species = await screen.findByText(/species:/i);
    const gender = await screen.findByText(/gender:/i);
    expect(species).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
    const detailButton = await screen.findByRole('windowClose');
    await user.click(detailButton);
  });
});
