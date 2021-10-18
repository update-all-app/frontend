import React from 'react';
import Navbar from '../Navbar';
import { useHistory } from 'react-router-dom';
import WithFooter from '../../wrappers/WithFooter';

export default function Pricing(props) {
  const history = useHistory();

  return (
    // <div className="mt-0 h-full" >
    <WithFooter>
      <div className='h-45vh w-full bg-secondary'>
        <Navbar />
        <img
          className='logo bounce-2 border-2 rounded-full border-gray-600'
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt={'logo'}
        />
      </div>
      <div className='info-text white flex flex-col justify-center align-left min-h-1/2 p-8'>
        <div className='border-l-2 border-primary shadow-sm'>
          <p className='text-primary text-left m-4'>
            As of now, we provide one subscription package at $5/mo as an
            all-inclusive package.
          </p>
          <p className='text-primary text-left m-4'>
            With this subscription, you can manage an unlimited number of
            business, and sync their hours of operation with any of the 3rd
            party social media sites you use to promote it. This includes Yelp,
            Facebook groups, Google Maps, Apple Maps, and Twitter.
          </p>
          <p className='text-primary text-left m-4'>
            Payments are handled by Stripe, and at no point will any sensitive
            personal information be saved on our servers or transmitted without
            state-of-the-art encryption.
          </p>
          <button
            className='bg-primary hover:bg-black text-white m-8 font-bold py-2 px-4 border border-primary hover:border-transparent rounded focus:outline-none'
            onClick={() => {
              history.push('/signup');
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </WithFooter>
    // </div>
  );
}
