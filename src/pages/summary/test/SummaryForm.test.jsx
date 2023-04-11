import { render, screen } from '@testing-library/react';
import SummaryFrom from '../SummrayForm';
import userEvent from '@testing-library/user-event';

test('checkbox is unchecked by default', () => {
  render(<SummaryFrom />);
  const checkBox = screen.getByRole('checkbox', { name: /I agree to/i });
  expect(checkBox).not.toBeChecked();
});

test('checking checkbox enables button', async () => {
  const user = userEvent.setup();
  render(<SummaryFrom />);
  const checkBox = screen.getByRole('checkbox', { name: /I agree to/i });
  const button = screen.getByRole('button', { name: /Confirm order/i });
  expect(button).toBeDisabled();
  await user.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(button).toBeEnabled();
});

test('Unchecking checkbox again disable button', async () => {
  const user = userEvent.setup();
  render(<SummaryFrom />);
  const checkBox = screen.getByRole('checkbox', { name: /I agree to/i });
  const button = screen.getByRole('button', { name: /Confirm order/i });
  expect(button).toBeDisabled();
  expect(checkBox).not.toBeChecked();

  await user.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(button).toBeEnabled();

  await user.click(checkBox);
  expect(checkBox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test('popover responds to hover', async () => {
  const user = userEvent.setup();
  render(<SummaryFrom />);
  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
