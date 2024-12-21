export function Header() {
  return (
    <header className='bg-white shadow flex items-center justify-between px-6 py-4'>
      <div className='text-xl font-bold text-gray-800'>Dashboard</div>
      <div className='text-gray-700 cursor-pointer hover:text-gray-500'>
        Login
      </div>
    </header>
  );
}
