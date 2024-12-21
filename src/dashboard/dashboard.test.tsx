import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  test('renders the header, sidebar, profile, form and calendar inside the dashboard', () => {
    render(<Dashboard />);

    expect(screen.getByText('Work From Home Request')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Book Work From Home')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Team Calendar')).toBeInTheDocument();
  });
});
