const mockCalendar = [
  {
    user: 'John Doe',
    monday: 'WFH',
    tuesday: '',
    wednesday: '',
    thursday: 'WFH',
    friday: '',
    saturday: '',
    sunday: '',
  },
  {
    user: 'Jane Smith',
    monday: '',
    tuesday: '',
    wednesday: 'Vacation',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  },
];

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

//TODO: Implement real data
export function CalendarTable() {
  return (
    <div className='component p-6 rounded shadow'>
      <div className='overflow-auto'>
        <h3 className='text-lg font-semibold mb-4 text-primary'>
          Team Calendar
        </h3>
        <table className='w-full min-w-[800px] table-fixed border-collapse'>
          <thead>
            <tr className='bg-gray-200 text-left'>
              {tableHead.map((head, index) => (
                <th key={index} className='border p-2 w-1/8'>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockCalendar.map((entry, index) => (
              <tr key={index} className='odd:bg-white even:bg-gray-50'>
                <td className='border p-2'>{entry.user}</td>
                <td className='border p-2'>{entry.monday}</td>
                <td className='border p-2'>{entry.tuesday}</td>
                <td className='border p-2'>{entry.wednesday}</td>
                <td className='border p-2'>{entry.thursday}</td>
                <td className='border p-2'>{entry.friday}</td>
                <td className='border p-2'>{entry.saturday}</td>
                <td className='border p-2'>{entry.sunday}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
