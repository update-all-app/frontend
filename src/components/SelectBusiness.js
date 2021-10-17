import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter';

import { hash } from '../helpers/functions';

import { Redirect } from 'react-router-dom';
import BusinessCard from '../subcomponents/SimpleBusinessCard';

export default function SelectBusiness(props) {
  const { state } = useContext(UserContext);
  const user = state;

  const renderBusinesses = () => {
    return user.data.businesses.map((b) => (
      <BusinessCard business={b} key={hash(b.name)} />
    ));
  };

  if (!user.data.businesses || user.loading) {
    return <></>;
  } else if (user.data.businesses.length === 0) {
    return <Redirect to='/businesses/new' />;
  } else if (user.data.businesses.length > 1) {
    return (
      <WithHeaderAndFooter>
        <div className='w-full flex flex-wrap justify-left items-left p-14'>
          {renderBusinesses()}
        </div>
      </WithHeaderAndFooter>
    );
  } else {
    return <Redirect to={`/businesses/${user.data.businesses[0].id}`} />;
  }
}
