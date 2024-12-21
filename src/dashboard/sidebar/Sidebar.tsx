export function Sidebar() {
  return (
    <aside className='w-64 bg-gray-800 text-white p-4'>
      <h2 className='text-xl font-bold mb-4'>Menu</h2>
      <ul className='space-y-4'>
        <li className='cursor-pointer hover:text-gray-300'>Dashboard</li>
        <li className='cursor-pointer hover:text-gray-300'>Profile</li>
        <li className='cursor-pointer hover:text-gray-300'>Calendar</li>
      </ul>
    </aside>
  );
}
