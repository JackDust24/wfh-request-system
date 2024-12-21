import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('renders the App and shows the app name on the screen', () => {
    render(<App />);

    expect(screen.getByText('Work From Home Request')).toBeInTheDocument();
  });
});
