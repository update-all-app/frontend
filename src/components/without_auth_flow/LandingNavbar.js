import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  const renderLink = (text, path) => (
    <Link
      to={path}
      className='bg-terdark p-1 rounded-full text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-terdark focus:ring-white ml-3 relative'
    >
      {text}
    </Link>
  );

  return (
    <div>
      {renderLink('About', '/about')}
      {renderLink('Pricing', '/pricing')}
      {renderLink('Signup', '/signup')}
      {renderLink('Login', '/login')}
    </div>
  );
}
