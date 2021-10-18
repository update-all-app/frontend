import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Footer(props) {
  const history = useHistory();

  const renderLink = (text, path) => {
    return (
      <button
        className='bg-transparent flex text-sm focus:outline-none hover:text-tertiary focus:ring-2 text-primary rounded-full font-medium ml-1 mr-1 flex px-3 py-1 ring-terdark'
        onClick={() => history.push(path)}
      >
        {text}
      </button>
    );
  };

  return (
    <footer className='bg-white flex justify-center border-t absolute bottom-0 w-full p-3 h-footer'>
      {renderLink('Contact Us', '/contact')}
      {renderLink('Customer Stories', '/customer-stories')}
      {renderLink('Careers', '/careers')}
      {renderLink('Privacy', '/privacy')}
    </footer>
  );
}
