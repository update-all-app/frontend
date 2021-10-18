import React from 'react';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const Card = ({ children, small }) => {
  return (
    <div
      className={classNames(
        small ? 'p-4' : 'p-10',
        'border rounded-md bg-white'
      )}
    >
      {children}
    </div>
  );
};
