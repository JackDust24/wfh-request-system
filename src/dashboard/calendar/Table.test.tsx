import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalendarTable } from './Table';
import * as api from '../../api/userdata';
import { UserRequest } from '../../lib/types';
import { useWFHStore } from '../../store/wfhRequestsStore';

jest.mock('../../api/userdata', () => ({
  useFetchCalendarData: jest.fn(),
}));

jest.mock('../../store/wfhRequestsStore', () => ({
  useWFHStore: jest.fn(),
}));

describe('CalendarTable', () => {
  const addUserMock = jest.fn();
  const addDateMock = jest.fn();

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

  const mockData: UserRequest[] = [
    {
      name: 'Jon Snow',
      dates: ['2024-12-23', '2024-12-25'],
      email: 'hello@hello.com',
      role: 'King of the North',
    },
    {
      name: 'Daenerys Targaryen',
      dates: ['2024-12-24', '2024-12-26'],
      email: 'a@a.com',
      role: 'King of the North',
    },
    {
      name: 'Tyrion Lannister',
      dates: ['2024-12-23', '2024-12-25', '2024-12-27'],
      email: 'b@a.com',
      role: 'King of the North',
    },
  ];

  const mockLoggedInUser = {
    name: 'Jason Whittaker',
    dates: ['2024-12-23', '2024-12-25', '2024-12-27'],
    email: 'jason@example.com',
    role: 'King of the North',
  };

  beforeEach(() => {
    (api.useFetchCalendarData as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    (useWFHStore as unknown as jest.Mock).mockReturnValue({
      addUser: addUserMock,
      users: [...mockData, mockLoggedInUser],
      loggedInUserEmail: 'jason@example.com',
      addDate: addDateMock,
    });
  });

  test('renders the calendar table with correct headers and mock data', () => {
    render(<CalendarTable />);

    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header })
      ).toBeInTheDocument();
    });

    const rowLength = mockData.length + 2; // 1 for header and 1 for logged in user

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(rowLength);

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

  test('able to stored data with mock data', () => {
    render(<CalendarTable />);

    mockData.forEach((user) => {
      expect(addUserMock).toHaveBeenCalledWith(user);
      user.dates.forEach((date) => {
        expect(addDateMock).toHaveBeenCalledWith(date, user.email);
      });
    });
  });

  test('stored data returns mock data and logged in user sorted at the top row', () => {
    render(<CalendarTable />);

    expect(
      screen.getByRole('row', {
        name: /Jason Whittaker/,
      })
    ).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    const firstRow = rows[1]; // First row after the header
    expect(firstRow).toHaveTextContent('Jason Whittaker');
  });
});
