import React from 'react';
import { useHistory } from 'react-router-dom';

export default function BusinessCard(props) {
  const history = useHistory();

  const { business } = props;

  const {
    addressLine1,
    addressLine2,
    city,
    state,
    zipcode,
    country,
    name,
    emailAddress,
    phoneNumber,
    id
  } = business;

  const goToBusiness = () => {
    history.push(`/businesses/${id}`);
  };

  return (
    <div
      className='cursor-pointer border-l-2 border-primary inline-block shadow-sm p-10 hover:bg-secondary transition duration-500 w-96 overflow-hidden m-8'
      onClick={goToBusiness}
    >
      <h1 className='text-4xl'>{name}</h1>
      <div>
        <h3 className='text-xl border-t-2 my-2'>Contact</h3>
        <p>{phoneNumber}</p>
        <p>{emailAddress}</p>
      </div>
      <div>
        <h3 className='text-xl border-t-2 my-2'>Location</h3>
        <p>
          {addressLine1} {addressLine2}
        </p>
        <p>
          {city}, {state} {zipcode}
        </p>
        <p>{country}</p>
      </div>
    </div>
  );
}
