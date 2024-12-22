import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Profile } from './Profile';
import { useAuth } from '../../providers/UserAuthProvider';

jest.mock('../../providers/UserAuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('Profile', () => {
  beforeEach(() => {
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
  test('renders Name, Email, and Role in the User Profile', () => {
    render(<Profile />);

    expect(
      screen.getByRole('heading', { name: /user profile/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/name: Jason Whittaker/i)).toBeInTheDocument();
    expect(screen.getByText(/email: jason@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/role: frontend developer/i)).toBeInTheDocument();
  });

  test('returns null when no user is provided', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    const { container } = render(<Profile />);
    expect(container).toBeEmptyDOMElement();
  });
});
