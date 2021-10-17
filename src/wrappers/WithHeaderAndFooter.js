import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function WithHeaderAndFooter({ children, fullWidth }) {
  return (
    <div className='page overflow-scroll hide-scroll'>
      <Navbar />

      {fullWidth ? (
        <div className='md:flex flex-col md:flex-row w-full overflow-scroll h-content-narrow md:h-content'>
          <div className='max-w-5xl mx-auto py-10 px-10 w-full h-fit-content'>
            {children}
          </div>
        </div>
      ) : (
        <div className='md:flex flex-col md:flex-row w-full'>{children}</div>
      )}
      <Footer />
    </div>
  );
}
