import React from 'react';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const Button = ({ children, onClick, border }) => {
  const baseButtonClasses =
    'py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-tertiary border-2	border-tertiary hover:opacity-75';
  const fillClasses = border
    ? 'text-tertiary bg-white hover:bg-tertiary hover:text-white'
    : 'text-white bg-tertiary';

  return (
    <button
      className={classNames(baseButtonClasses, fillClasses)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
