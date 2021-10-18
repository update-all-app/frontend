import React from 'react';

export default function ErrorBanner(props) {
  const { onExit, message } = props;

  return (
    <div className='absolute top-4 w-3/4 bg-red-600 p-6 text-center text-secondary shadow-lg rounded'>
      <div>
        <svg
          className='h-4 w-4 absolute top-0 right-0 m-1 cursor-pointer'
          onClick={onExit}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
        <p>{message}</p>
      </div>
    </div>
  );
}
