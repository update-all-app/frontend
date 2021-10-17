import React from 'react';

export const Tabs = () => {
  return (
    <nav class='flex flex-col sm:flex-row'>
      <button class='text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500'>
        Calendar
      </button>
      <button class='text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none'>
        Regular Schedule
      </button>
      <button class='text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none'>
        Specific Days
      </button>
    </nav>
  );
};
