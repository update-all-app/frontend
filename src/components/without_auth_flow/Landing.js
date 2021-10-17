import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from '../../subcomponents/Button';

export default function Landing() {
  const history = useHistory();

  const loginClick = () => {
    history.push('/login');
  };

  const signupClick = () => {
    history.push('/signup');
  };

  return (
    <>
      <img
        className='logo h-60 object-contain'
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt={'logo'}
      />

      <div className='white flex flex-col justify-center align-center h-1/2 p-8 text-center'>
        <p className='landing-text text-primary'>
          UpdateItAll is a platform for small businesses like yours to update
          all of their information in one place.
        </p>
      </div>

      <div className='flex justify-evenly max-w-xs m-auto'>
        <Button onClick={signupClick}>Sign Up</Button>
        <Button onClick={loginClick} border>
          Log In
        </Button>
      </div>
    </>
  );
}
