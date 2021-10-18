import React from 'react';

export default function Avatar({ initials }) {
  return (
    <span
      className='bg-secondary text-terdark w-8 h-8 rounded-full flex items-center justify-center font-bold text-l'
      alt='Open user menu'
    >
      {initials}
    </span>
  );
}
