import { useAuth } from '../../providers/UserAuthProvider';

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className='component p-6 rounded shadow text-primary'>
      <h3 className='text-lg font-semibold mb-4'>User Profile</h3>
      <p className='text-secondary'>Name: {user.name}</p>
      <p className='text-secondary'>Email: {user.email}</p>
      <p className='text-secondary'>Role: {user.role}</p>
    </div>
  );
}
