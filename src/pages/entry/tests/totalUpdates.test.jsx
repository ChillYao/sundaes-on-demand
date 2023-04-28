import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';
import userEvent from '@testing-library/user-event';
import OrderEntry from '../OrderEntry';

test('update scoops subtotal when scoop changes', async () => {
  render(<Options optionType='scoops' />);
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

test('update toppings subtotal when topping changes', async () => {
  render(<Options optionType='toppings' />);
  const toppingsSubtotal = await screen.findByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  const toppingsTickBoxGummi = await screen.findByRole('checkbox', {
    name: 'Gummi bears',
  });
  expect(toppingsTickBoxGummi).not.toBeChecked();
  debugger;

  const user = userEvent.setup();
  //await user.clear(toppingsTickBoxGummi);
  await user.click(toppingsTickBoxGummi);
  expect(toppingsTickBoxGummi).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  await screen.findByText('Cherries');

  const toppingsTickBoxCherries = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  expect(toppingsTickBoxCherries).not.toBeChecked();
  await user.click(toppingsTickBoxCherries);
  expect(toppingsTickBoxCherries).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  await user.click(toppingsTickBoxCherries);
  await user.click(toppingsTickBoxGummi);
  expect(toppingsTickBoxCherries).not.toBeChecked();
  expect(toppingsTickBoxGummi).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('0.00');
});

describe('grand total', () => {
  test('grand total starts at $0.00', async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByText('Grand total: $', {
      exact: false,
    });
    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoops added firstly', async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    const grandTotal = await screen.findByText('Grand total: $', {
      exact: false,
    });
    expect(grandTotal).toHaveTextContent('2.00');
    const toppingsTickBoxCherries = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(toppingsTickBoxCherries);
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if toppings added firstly', async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByText('Grand Total: $', {
      exact: false,
    });
    const user = userEvent.setup();
    const toppingsTickBoxCherries = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    await user.click(toppingsTickBoxCherries);
    expect(grandTotal).toHaveTextContent('1.50');
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = await screen.findByText('Grand Total: $', {
      exact: false,
    });
    const toppingsTickBoxCherries = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    const user = userEvent.setup();
    await user.clear(vanillaInput);
    await user.type(vanillaInput, '1');
    await user.click(toppingsTickBoxCherries);
    expect(grandTotal).toHaveTextContent('3.50');
    await user.type(vanillaInput, '0');
    expect(grandTotal).toHaveTextContent('1.50');
    await user.click(toppingsTickBoxCherries);
    expect(grandTotal).toHaveTextContent('0.00');
  });
});
