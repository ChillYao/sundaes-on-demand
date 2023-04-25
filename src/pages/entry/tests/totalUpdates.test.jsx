import { render, screen } from '@testing-library/react';
import Options from '../Options';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
//import { logRoles } from '@testing-library/react';

test('update scoops subtotal when scoop changes', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });
  //   const { container } = render(<Options optionType='scoops' />, {
  //     wrapper: OrderDetailsProvider,
  //   });

  const scoopsSubtotal = await screen.findByText('scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla scoops to 1, and check subtotal
  const user = userEvent.setup();
  //   await screen.findByText('Vanilla');
  //   logRoles(container);
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
