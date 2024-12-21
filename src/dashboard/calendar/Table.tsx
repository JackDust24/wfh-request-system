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

//TODO: Implement real data
export function CalendarTable() {
  return (
    <div className='bg-white p-6 rounded shadow'>
      <h3 className='text-lg font-semibold mb-4'>Team Calendar</h3>
      <table className='w-full table-auto border-collapse'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='border p-2'>User</th>
            <th className='border p-2'>Monday</th>
            <th className='border p-2'>Tuesday</th>
            <th className='border p-2'>Wednesday</th>
            <th className='border p-2'>Thursday</th>
            <th className='border p-2'>Friday</th>
            <th className='border p-2'>Saturday</th>
            <th className='border p-2'>Sunday</th>
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
  );
}
