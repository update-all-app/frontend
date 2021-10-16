import React from 'react';
import WithFooter from '../../wrappers/WithFooter';
import LandingNavbar from './LandingNavbar';
import { useHistory } from 'react-router-dom';

export default function Landing(props) {
  const history = useHistory();

  const loginClick = () => {
    history.push('/login');
  };

  const signupClick = () => {
    history.push('/signup');
  };

  return (
    <WithFooter>
      <div className='h-45vh w-full bg-secondary'>
        <LandingNavbar />
        <img
          className='logo bounce-2 border-2 rounded-full border-gray-600'
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt={'logo'}
        />
        <div className='m-auto opacity-100 flex justify-center align-center'>
          <button
            className='bg-tertiary hover:bg-terdark text-white font-bold py-2 px-4 border border-tertiary hover:border-transparent rounded auth-button focus:outline-none'
            onClick={signupClick}
          >
            Sign Up
          </button>
          <button
            className='bg-transparent hover:bg-secdark text-tertiary font-semibold py-2 px-4 border border-tertiary hover:text-terdark rounded auth-button focus:outline-none'
            onClick={loginClick}
          >
            Log In
          </button>
        </div>
      </div>
      <div className='white flex flex-col justify-center align-center h-1/2 p-8 text-center'>
        <p className='landing-text text-primary'>
          UpdateItAll is a platform for small businesses like yours to update
          all of their information in one place.
        </p>
      </div>
      {/* <img className="bg-img" src={process.env.PUBLIC_URL + '/bg-test.jpg'} alt=""/> */}
    </WithFooter>
  );
}
