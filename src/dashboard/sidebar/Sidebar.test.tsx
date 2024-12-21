import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('renders the Sidebar header and the menu items', () => {
    render(<Sidebar />);

    expect(screen.getByText('Menu')).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    // Test that all list items are rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    // Test content of specific list items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Other Area')).toBeInTheDocument();
    expect(screen.getByText('Other Area 2')).toBeInTheDocument();
  });
});
