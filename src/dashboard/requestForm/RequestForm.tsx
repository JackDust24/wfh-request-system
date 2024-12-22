//TODO: Change the form to a specific calendar third party popup

import { Button } from '../../components/Button';

export function RequestForm() {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit Work From Home Reuqest');
  };

  return (
    <div className='col-span-2 component p-6 rounded shadow'>
      <h3 className='text-lg font-semibold mb-4 text-primary'>
        Book Work From Home
      </h3>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-4'>
          <label
            className='block text-sm font-medium text-secondary'
            htmlFor='start-date'
          >
            Start Date:
          </label>
          <input
            id='start-date'
            type='date'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-sm font-medium text-secondary'
            htmlFor='end-date'
          >
            End Date:
          </label>
          <input
            type='date'
            id='end-date'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <Button type='submit' text='Submit' variant='default' />
      </form>
    </div>
  );
}
