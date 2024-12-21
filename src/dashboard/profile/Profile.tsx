//TODO: Will be updated Profile component that displays the user's profile information.

export function Profile() {
  return (
    <div className='component p-6 rounded shadow text-primary'>
      <h3 className='text-lg font-semibold mb-4'>User Profile</h3>
      <p className='text-secondary'>Name: John Doe</p>
      <p className='text-secondary'>Email: john@example.com</p>
      <p className='text-secondary'>Role: Frontend Developer</p>
    </div>
  );
}
