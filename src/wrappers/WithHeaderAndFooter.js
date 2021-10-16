import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function WithHeaderAndFooter(props) {
  return (
    <div className='page overflow-scroll hide-scroll'>
      <div id='content-wrap'>
        <Navbar />
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
