import React from 'react';
import { useHistory } from 'react-router';

export default function SimpleBusinessCard(props) {
  const history = useHistory();
  const { business } = props;
  const { id, name } = business;

  const goToBusiness = () => {
    history.push(`/businesses/${id}`);
  };

  return (
    <div
      className='cursor-pointer border-l-2 border-primary inline-block shadow-sm p-8 hover:bg-secondary transition duration-500 w-96 overflow-hidden m-8'
      onClick={goToBusiness}
    >
      <h1 className='text-3xl'>{name}</h1>
    </div>
  );
}
