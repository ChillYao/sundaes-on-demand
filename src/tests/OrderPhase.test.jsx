import { render, screen } from '../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
  //render app
  const { unmount } = render(<App />);
  // add ice cream scoops and toppings
  const scoopOption = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  const toppingOption = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  const user = userEvent.setup();
  await user.clear(scoopOption);
  await user.type(scoopOption, '1');
  await user.click(toppingOption);
  // find and click order button
  const orderButton = await screen.findByRole('button', { name: /order/i });
  await user.click(orderButton);
  // check summary information based on order
  const orderSummaryTitle = await screen.findByText('Order Summary');
  expect(orderSummaryTitle).toBeInTheDocument();
  const totalAmount = await screen.findByText('Totals: $3.50');
  expect(totalAmount).toBeInTheDocument();
  const termsAndConditions = await screen.findByRole('checkbox', {
    name: /I agree to/i,
  });
  expect(termsAndConditions).toBeInTheDocument();
  const confirmButton = await screen.findByRole('button', {
    name: /Confirm order/i,
  });
  expect(confirmButton).toBeInTheDocument();
  // accept terms and conditions and click button to confirm order
  await user.click(termsAndConditions);
  await user.click(confirmButton);
  // the loading page does not show
  const loadingPage = screen.queryByText(/loading/i);
  expect(loadingPage).not.toBeInTheDocument();
  // confirm order number on confirmation page
  expect(await screen.findByText(/Thank You/i)).toBeInTheDocument();
  expect(
    await screen.findByText(/order number/i, { exact: false })
  ).toBeInTheDocument();
  // click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole('button', {
    name: /new order/i,
  });
  await user.click(newOrderButton);
  // check that scoops and topppings subtotals have been reset
  const scoopsSubtotal = await screen.findByText('scoops total: $', {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  const toppingsSubtotal = await screen.findByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');
  // do we need to await anything to aviod test errors?

  unmount();
});

test('show no toppings if only scoops are selected', async () => {
  const { unmount } = render(<App />);
  const scoopOption = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  const user = userEvent.setup();
  await user.clear(scoopOption);
  await user.type(scoopOption, '1');
  const orderButton = await screen.findByRole('button', { name: /order/i });
  await user.click(orderButton);
  const toppingInfo = screen.queryByText('Toppings: $', { exact: false });
  expect(toppingInfo).not.toBeInTheDocument();
  unmount();
});
test('show no toppings if topping is selected but canceled', () => {});
