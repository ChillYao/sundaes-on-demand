import { render, screen } from '@testing-library/react';
import Options from '../Options';
import userEvent from '@testing-library/user-event';

test('update scoops subtotal when scoop changes', async () => {
  render(<Options optionType='scoops' />);
  const scoopsSubtotal = await screen.findByText(/scoops total/i, {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1, and check subtotal
  const user = userEvent.setup();
  const vanillaInput = await screen.findByRole('spinButton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinButton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
