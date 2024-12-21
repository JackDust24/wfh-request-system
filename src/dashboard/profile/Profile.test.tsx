import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Profile } from './Profile';

//TODO: Implement real data test
describe('Profile', () => {
  test('renders Name, Email, and Role in the User Profile', () => {
    render(<Profile />);

    expect(
      screen.getByRole('heading', { name: /user profile/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/name: john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/email: john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/role: frontend developer/i)).toBeInTheDocument();
  });
});
