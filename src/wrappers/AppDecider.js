import React from 'react';
import useAuth from '../hooks/useAuth';

export default function AppDecider(props) {
  const [loggedIn, loading] = useAuth();

  const renderModal = () => {
    if (loading) {
      return (
        <>
          <div className='overlay'></div>
          <div className='loader'>Loading...</div>
        </>
      );
    }
  };

  if (!loggedIn) {
    return (
      <>
        {renderModal()}
        {props.children[0]}
      </>
    );
  } else {
    return (
      <>
        {renderModal()}
        {props.children[1]}
      </>
    );
  }
}
