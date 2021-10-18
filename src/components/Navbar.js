import React from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import LandingNavbar from './without_auth_flow/LandingNavbar';
import LoggedInNavbar from './LoggedInNavbar';

export default function Example() {
  const [loggedIn] = useAuth();
  const history = useHistory();

  return (
    <nav className='bg-terdark'>
      <div className='mx-auto px-6'>
        <div className='relative flex items-center justify-between h-header'>
          <div className='flex-1 flex items-center  sm:items-stretch sm:justify-start'>
            <div
              className='flex-shrink-0 flex items-center cursor-pointer'
              onClick={() => history.push('/')}
            >
              <img
                className='w-10 h-10 w-auto'
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt={'logo'}
              />
              <span
                className='hidden lg:block w-auto text-xl font-bold text-white'
                alt='Update It All'
              >
                Update It All
              </span>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            {loggedIn ? <LoggedInNavbar /> : <LandingNavbar />}
          </div>
        </div>
      </div>
    </nav>
  );
}
