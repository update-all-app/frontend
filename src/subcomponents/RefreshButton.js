import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshIcon } from '@heroicons/react/outline';

export const RefreshButton = () => {
  return (
    <Link
      to='/authorize-services'
      className='bg-terdark p-1 rounded-full text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-terdark focus:ring-white ml-3 relative'
    >
      <span className='sr-only'>Update It All</span>
      <RefreshIcon className='h-6 w-6' aria-hidden='true' />
    </Link>
  );
};
