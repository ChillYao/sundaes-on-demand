import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('display error code for scoops and topping', async () => {
  await server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ errorMssage: 'something went wrong' })
      );
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ errorMssage: 'something went wrong' })
      );
    })
  );

  render(<OrderEntry />);

  const allErrorMessage = await screen.findAllByRole('alert', {
    value: 'something went wrong',
  });

  expect(allErrorMessage).toHaveLength(2);
});
