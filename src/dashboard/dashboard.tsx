import { CalendarTable } from './calendar';
import { Profile } from './profile';
import { RequestForm } from './requestForm';
import { Sidebar } from './sidebar';
import { Header } from './components/Header';
import { useRequireAuth } from '../hooks/useRequestAuth';
import { useWFHStore } from '../store/wfhRequestsStore';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const user = useRequireAuth();
  const { addUser } = useWFHStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (user) {
      const addData = () => {
        addUser({
          email: user.email,
          name: user.name,
          role: user.role,
          dates: [],
        });
        setIsLoading(false);
      };
      addData();
    }
  }, [user, addUser]);

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
          {!isLoading && <CalendarTable />}
        </main>
      </div>
    </>
  );
}
