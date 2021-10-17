import React from 'react';

export const Cards = ({ children }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {children}
    </div>
  );
};
