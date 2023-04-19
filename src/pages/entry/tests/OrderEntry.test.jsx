import { render, screen, waitFor } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { rest } from 'msw';

test('display error code for scoops and topping', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const allErrorMessage = await screen.findAllByRole('alert', {
      text: 'An unexpected error happend',
    });

    expect(allErrorMessage).toHaveLength(2);
  });
});
