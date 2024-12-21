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
          <label className='block text-sm font-medium text-secondary'>
            Start Date:
          </label>
          <input
            type='date'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-secondary'>
            End Date:
          </label>
          <input
            type='date'
            className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
