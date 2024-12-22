import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalendarTable } from './Table';
import * as api from '../../api/userdata';

jest.mock('../../api/userdata', () => ({
  useFetchCalendarData: jest.fn(),
}));

describe('CalendarTable', () => {
  test('renders the calendar table with correct headers and mock data', () => {
    const mockData = [
      {
        name: 'Jon Snow',
        dates: ['2024-12-23', '2024-12-25'],
      },
      {
        name: 'Daenerys Targaryen',
        dates: ['2024-12-24', '2024-12-26'],
      },
      {
        name: 'Tyrion Lannister',
        dates: ['2024-12-23', '2024-12-25', '2024-12-27'],
      },
    ];

    (api.useFetchCalendarData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<CalendarTable />);

    const headers = [
      'User',
      'Monday 2024-12-23',
      'Tuesday 2024-12-24',
      'Wednesday 2024-12-25',
      'Thursday 2024-12-26',
      'Friday 2024-12-27',
      'Saturday 2024-12-28',
      'Sunday 2024-12-29',
    ];

    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument();
    });

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);

    expect(
      screen.getByRole('row', {
        name: /Jon Snow.*WFH Requested.*WFH Requested/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('row', {
        name: /Daenerys Targaryen.*WFH Requested.*WFH Requested/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('row', {
        name: /Tyrion Lannister.*WFH Requested.*WFH Requested.*WFH Requested/i,
      })
    ).toBeInTheDocument();
  });
});
