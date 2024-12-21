import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('renders the header with title, toggle button, and login', () => {
    render(<Header />);

    expect(screen.getByText(/work from home request/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('toggles theme and updates the background color', async () => {
    render(<Header />);

    const user = userEvent.setup();

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });

    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('light'); // Initial set up is ligjt

    await user.click(toggleButton);

    // Verify dark mode is activated
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(toggleButton);

    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
