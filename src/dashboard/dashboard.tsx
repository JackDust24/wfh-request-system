import { CalendarTable } from './calendar';
import { Profile } from './profile';
import { RequestForm } from './requestForm';
import { Sidebar } from './sidebar';
import { Header } from './components/Header';
import { useRequireAuth } from '../hooks/useRequestAuth';
import { useWFHStore } from '../store/wfhRequestsStore';
import { useEffect } from 'react';

export function Dashboard() {
  const user = useRequireAuth();
  const { addUser, setLoggedInUserEmail } = useWFHStore();

  useEffect(() => {
    if (user) {
      addUser({
        email: user.email,
        name: user.name,
        role: user.role,
        dates: [], // If user already exists with data the existing state will handle this
      });
      setLoggedInUserEmail(user.email);
    }
  }, [user, addUser, setLoggedInUserEmail]);

  if (!user) {
    return null; //TODO: Add loading state
  }

  return (
    <>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-6 bg-background'>
          <div className='grid grid-cols-3 gap-6 mb-6'>
            <RequestForm />
            <Profile />
          </div>
          <CalendarTable />
        </main>
      </div>
    </>
  );
}
