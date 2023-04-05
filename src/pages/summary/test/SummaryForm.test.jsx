import { render, fireEvent, screen } from '@testing-library/react';
import SummaryFrom from '../SummrayForm';

test('checkbox is unchecked by default', () => {
  render(<SummaryFrom />);
  const checkBox = screen.getByRole('checkbox', { name: /I agree to/i });
  expect(checkBox).not.toBeChecked();
});

test('checking checkbox enables button', () => {
  render(<SummaryFrom />);
  const checkBox = screen.getByRole('checkbox', { name: /I agree to/i });
  const button = screen.getByRole('button', { name: /Confirm order/i });
  expect(button).toBeDisabled();
  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(button).toBeEnabled();
});

test('Unchecking checkbox again disable button', () => {
  render(<SummaryFrom />);
  const checkBox = screen.getByRole('checkbox', { name: /I agree to/i });
  const button = screen.getByRole('button', { name: /Confirm order/i });
  expect(button).toBeDisabled();
  expect(checkBox).not.toBeChecked();

  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();
  expect(button).toBeEnabled();

  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked();
  expect(button).toBeDisabled();
});
