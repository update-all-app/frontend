import React from 'react';
import { useHistory } from 'react-router-dom';

export default function InvalidPaymentBanner(props) {
  const history = useHistory();

  const gotoPayment = () => {
    history.push('/setup-payment');
  };

  return (
    <div className='absolute left-center-160-top-1 rounded-sm bg-red-500 text-white m-auto w-160 z-200 p-6 text-center shadow-md'>
      <p>
        There is a problem with your payment information.{' '}
        <button
          onClick={gotoPayment}
          className='text-blue-200 border-b border-blue-200 focus:outline-none focus:text-white focus:border-white'
        >
          Update it here.
        </button>
      </p>
    </div>
  );
}
