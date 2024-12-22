import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RequestForm } from './RequestForm';

describe('RequestForm', () => {
  test('renders the form with all fields and submit button', () => {
    render(<RequestForm />);

    expect(
      screen.getByRole('heading', { name: /book work from home/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/start date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('opens the date picker when the Start Date input is clicked and displays selected date', async () => {
    render(<RequestForm />);
    const user = userEvent.setup();

    const startDateInput = screen.getByLabelText(/start date:/i);

    await user.click(startDateInput);
    expect(startDateInput).toHaveFocus();

    await user.type(startDateInput, '2024-12-24');
    expect(startDateInput).toHaveValue('2024-12-24');
  });

  test('opens the date picker when the End Date input is clicked and displays selected date', async () => {
    render(<RequestForm />);
    const user = userEvent.setup();

    const endDateInput = screen.getByLabelText(/end date:/i);

    await user.click(endDateInput);
    expect(endDateInput).toHaveFocus();

    await user.type(endDateInput, '2024-12-27');
    expect(endDateInput).toHaveValue('2024-12-27');
  });

  test('calls the submit handler when the form is submitted', async () => {
    //TODO: This will change when the handler is implemented properly
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<RequestForm />);

    const user = userEvent.setup();

    const startDateInput = screen.getByLabelText(/start date:/i);
    const endDateInput = screen.getByLabelText(/end date:/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(startDateInput, '2024-12-24');
    await user.type(endDateInput, '2024-12-31');

    await user.click(submitButton);

    expect(consoleLogSpy).toHaveBeenCalledWith('Submit Work From Home Reuqest');
    consoleLogSpy.mockRestore();
  });
});
