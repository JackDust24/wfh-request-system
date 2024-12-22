import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dashboard } from './dashboard';
import { useRequireAuth } from '../hooks/useRequestAuth';
import { useAuth } from '../providers/UserAuthProvider';

jest.mock('../hooks/useRequestAuth', () => ({
  useRequireAuth: jest.fn(),
}));

jest.mock('../providers/UserAuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    (useRequireAuth as jest.Mock).mockReturnValue({
      id: '1',
      name: 'Jason Whittaker',
      email: 'jason@example.com',
      role: 'Frontend Developer',
    });
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: '1',
        name: 'Jason Whittaker',
        email: 'jason@example.com',
        role: 'Frontend Developer',
      },
      login: jest.fn(),
      logout: jest.fn(),
    });
  });
  test('renders the header, sidebar, profile, form and calendar inside the dashboard', () => {
    render(<Dashboard />);

    expect(screen.getByText('Work From Home Studio')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Book Work From Home')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Team Calendar')).toBeInTheDocument();
  });
});
