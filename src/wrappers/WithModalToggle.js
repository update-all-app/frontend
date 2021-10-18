import React from 'react';

export default function WithModalToggle(props) {
  const {
    w = 'w-11/12 max-w-2xl',
    h = '',
    leftCenterWidth = 'left-center-160',
    position = 'top-12',
    modal = null,
    on = false,
    onExit,
    hasExit = false
  } = props;

  const hiddenClass = on ? '' : 'hidden';

  const renderExit = () => {
    if (hasExit) {
      return (
        <div
          className='absolute top-0 right-0 h-10 w-10 text-tertiary hover:text-terdark transition-500 cursor-pointer'
          onClick={onExit}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={`relative h-screen transition-opacity duration-300 p-4 withModalToggle`}
      >
        {props.children}
        <div className={`overlay-dark ${hiddenClass}`}></div>
        {/* <div className="w-full h-full flex justify-center items-center"> */}
        <div
          className={`z-20 absolute ${leftCenterWidth} ${w} ${h} ${position} bg-white overflow-scroll hide-scroll shadow-2xl p-10  ${hiddenClass}`}
        >
          {renderExit()}
          {modal}
        </div>
      </div>
    </>
  );
}
