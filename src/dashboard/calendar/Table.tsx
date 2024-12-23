import { useCallback, useEffect, useState } from 'react';
import { useFetchCalendarData } from '../../api/userdata';
import { getWeekDates } from '../../lib/dateHelper';
import { UserRequest } from '../../lib/types';
import { useWFHStore } from '../../store/wfhRequestsStore';
import { sortUsers } from './helpers/helper';
import { WFHEventEmitter } from '../../lib/eventEmitter';
import { useRequireAuth } from '../../hooks/useRequestAuth';

const API_URL =
  process.env.MOCK_JSON_API ||
  'https://run.mocky.io/v3/e623cd04-eeca-4155-8da0-6851162c4d53';

const tableHead = [
  'User',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type CalendarDataType = {
  user: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
};

export function CalendarTable() {
  const user = useRequireAuth();

  const [initialLoad, setInitialLoad] = useState(false);
  const { data, loading, error } = useFetchCalendarData(API_URL);
  const { addUser, addDate, users } = useWFHStore();
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);

  const startDate = new Date('2024-12-23'); //TODO: We will get the user to select this
  const weekDates = getWeekDates(startDate);

  const generateCalendarData = () => {
    console.log('generateCalendarData', users);
    console.log('generateCalendarData loggedInUserEmail', user?.email);

    const sortedUsers = sortUsers(users, user?.email ?? null);

    const updatedCalendarData = sortedUsers?.map((item: UserRequest) => {
      return {
        user: item.name,
        monday: item.dates.includes(weekDates[0]) ? 'WFH Requested' : '',
        tuesday: item.dates.includes(weekDates[1]) ? 'WFH Requested' : '',
        wednesday: item.dates.includes(weekDates[2]) ? 'WFH Requested' : '',
        thursday: item.dates.includes(weekDates[3]) ? 'WFH Requested' : '',
        friday: item.dates.includes(weekDates[4]) ? 'WFH Requested' : '',
        saturday: item.dates.includes(weekDates[5]) ? 'WFH Requested' : '',
        sunday: item.dates.includes(weekDates[6]) ? 'WFH Requested' : '',
      };
    });

    setCalendarData(updatedCalendarData);
  };

  useEffect(() => {
    console.log('data useffect');

    if (data) {
      data.forEach((user: UserRequest) => {
        addUser(user);
        user.dates.forEach((date) => addDate(date, user.email));
      });
      generateCalendarData();
      setInitialLoad(true);
    }
  }, [data, addUser, addDate]);

  // useEffect(() => {
  //   const listener = () => {
  //     generateCalendarData();
  //   };

  //   subscribe(listener);

  //   return () => {
  //     unsubscribe(listener);
  //   };
  // }, [subscribe, unsubscribe]);

  useEffect(() => {
    console.log('CalendarTable mounted');
    if (initialLoad) {
      console.log('Set up listeneres');

      const handleEvent = () => {
        generateCalendarData();
      };

      // Attach listeners
      WFHEventEmitter.on('wfhEventChange', handleEvent);

      // Cleanup listeners on unmount
      return () => {
        WFHEventEmitter.off('wfhEventChange', handleEvent);
      };
    }
  }, [initialLoad]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='component p-6 rounded shadow'>
      <div className='overflow-auto'>
        <h3 className='text-lg font-semibold mb-4 text-primary'>
          Team Calendar
        </h3>
        <table className='w-full min-w-[800px] table-fixed border-collapse'>
          <thead>
            <tr className='bg-gray-200 text-left'>
              <th className='border p-2 w-1/8'>User</th>
              {weekDates.map((date, index) => (
                <th key={index} className='border p-2'>
                  {tableHead[index + 1]} <br />
                  <span className='text-xs text-gray-500'>{date}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarData?.map((entry, index) => (
              <tr
                key={index}
                className='odd:bg-white even:bg-gray-50'
                role='row'
              >
                <td className='border p-2'>{entry.user}</td>
                <td className='border p-2'>{entry.monday}</td>
                <td className='border p-2'>{entry.tuesday}</td>
                <td className='border p-2'>{entry.wednesday}</td>
                <td className='border p-2'>{entry.thursday}</td>
                <td className='border p-2'>{entry.friday}</td>
                <td className='border p-2'>Unavailable</td>
                <td className='border p-2'>Unavailable</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
