import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalendarTable } from './Table';

//TODO: Implement real data test
describe('CalendarTable', () => {
  test('renders the calendar table with correct headers and mock data', () => {
    render(<CalendarTable />);

    // Check for table headers
    const headers = [
      'User',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument();
    });

    // Check for the correct number of rows
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // 1 header row + 2 data rows

    // Check the first data row
    const johnRow = screen.getByRole('row', {
      name: /Jason Whittaker WFH.*WFH/i,
    });
    expect(johnRow).toBeInTheDocument();

    // Check the second data row
    const janeRow = screen.getByRole('row', { name: /Jane Smith.*Vacation/i });
    expect(janeRow).toBeInTheDocument();
  });
});
