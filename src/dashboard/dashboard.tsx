import { CalendarTable } from './calendar';
import { Profile } from './profile';
import { RequestForm } from './requestForm';
import { Sidebar } from './sidebar';
import { Header } from './components/Header';
import { useRequireAuth } from '../hooks/useRequestAuth';

export function Dashboard() {
  const user = useRequireAuth();

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
