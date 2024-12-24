import { useEffect, useState } from 'react';
import { useFetchCalendarData } from '../../api/userdata';
import { getWeekDates, START_DATE } from '../../lib/dateHelper';
import { CalendarDataType, UserRequest } from '../../lib/types';
import { useWFHStore } from '../../store/wfhRequestsStore';
import { sortUsers } from './helpers/helper';
import { WFHEventEmitter } from '../../lib/eventEmitter';
import { useRequireAuth } from '../../hooks/useRequestAuth';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';

const API_URL =
  process.env.MOCK_JSON_API ||
  'https://run.mocky.io/v3/e623cd04-eeca-4155-8da0-6851162c4d53';

export function CalendarTable() {
  const user = useRequireAuth();

  const [initialLoad, setInitialLoad] = useState(false);
  const { data, loading, error } = useFetchCalendarData(API_URL);
  const { addUser, addDate, deleteDate, users } = useWFHStore();
  const [calendarData, setCalendarData] = useState<CalendarDataType[]>([]);

  const startDate = START_DATE;
  const weekDates = getWeekDates(startDate);

  const generateCalendarData = () => {
    const sortedUsers = sortUsers(users, user?.email ?? null);

    const updatedCalendarData = sortedUsers?.map((item: UserRequest) => {
      return {
        user: item.name,
        email: item.email,
        monday: item.dates.includes(weekDates[0]) ? 'WFH Requested' : '',
        tuesday: item.dates.includes(weekDates[1]) ? 'WFH Requested' : '',
        wednesday: item.dates.includes(weekDates[2]) ? 'WFH Requested' : '',
        thursday: item.dates.includes(weekDates[3]) ? 'WFH Requested' : '',
        friday: item.dates.includes(weekDates[4]) ? 'WFH Requested' : '',
      };
    });

    setCalendarData(updatedCalendarData);
  };

  useEffect(() => {
    if (data && !initialLoad) {
      // Update the store with the fetched data
      data.forEach((user: UserRequest) => {
        addUser(user);
      });
      generateCalendarData();
      setInitialLoad(true);
    }
  }, [data, addUser]);

  //TODO: Unable to get even listener to work as of yet
  useEffect(() => {
    if (initialLoad) {
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
  }, []);

  useEffect(() => {
    generateCalendarData();
  }, [users]);

  // Here we handle the add/delete request depending on which the user clicked
  const handleRequestClick = (day: string, action: 'add' | 'delete') => {
    if (action === 'add') {
      const callAddDate = addDate(day, user?.email ?? '');
      if (callAddDate.success) {
        generateCalendarData();
      }
      alert(callAddDate.message);
    } else if (action === 'delete') {
      const callDeleteDate = deleteDate(day, user?.email ?? '');
      if (callDeleteDate.success) {
        generateCalendarData();
      }
      alert(callDeleteDate.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='component p-6 rounded shadow'>
      <div className='overflow-auto'>
        <h3 className='text-lg font-semibold mb-4 text-primary'>
          Team Calendar
        </h3>
        <h4 className='text-secondary'>
          Under your name you can see the days you have requested to work from
          home. Click the appropriate day to submit a request.
        </h4>
        <h4 className='mb-4 text-secondary'>
          <strong>Hover</strong> over an existing request to remove the request.
        </h4>
        <table className='w-full min-w-[800px] table-fixed border-collapse'>
          <thead>
            <TableHeader weekDates={weekDates} />
          </thead>
          <tbody>
            {calendarData?.map((entry, index) => (
              <TableRow
                key={index}
                entry={entry}
                userEmail={user?.email ?? null}
                weekDates={weekDates}
                onClick={(day, action) => handleRequestClick(day, action)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
