import React, { useState, useContext } from 'react';
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter';
import WithModal from '../wrappers/WithModal';
import Submit from '../subcomponents/Submit';
import Input from '../subcomponents/Input';
import ErrorText from '../subcomponents/ErrorText';

import { useHistory } from 'react-router-dom';

import BusinessApiManager from '../apiClients/BusinessApiManager';
import UserContext from '../context/UserContext';
import Parser from '../helpers/Parser';
import { hash } from '../helpers/functions';

import { LOADING, ADD_BUSINESS, LOADING_COMPLETE } from '../actionTypes';
import { Title } from '../subcomponents/Title';

export default function CreateBusinessSimple(props) {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const user = useContext(UserContext).state;

  const [businessName, setBusinessName] = useState('');
  const [nameErrors, setNameErrors] = useState([]);
  const [submitErrors, setSubmitErrors] = useState([]);

  const isFirstBusiness =
    !user.data.businesses || user.data.businesses.length === 0;

  const saveBusiness = async () => {
    const businessParams = Parser.parseBusinessForRequest({
      businessName,
      businessEmail: 'default@email.com',
      businessTelephone: '555-555-5555',
      streetAddress: '123',
      route: 'Street Road',
      city: 'City',
      state: 'ST',
      zipCode: 12345,
      country: 'USA'
    });

    try {
      dispatch({ type: LOADING });
      const res = await BusinessApiManager.createBusiness(businessParams);
      const business = Parser.parseBusinessForContext(res);
      dispatch({ type: ADD_BUSINESS, payload: business });
      if (isFirstBusiness) {
        history.push('/setup-payment');
      } else {
        history.push('/');
      }
    } catch (err) {
      dispatch({ type: LOADING_COMPLETE });
      console.log(err);
      setSubmitErrors(['An error occurred while making this business']);
    }
  };

  const confirmInformation = () => {
    if (businessName.length > 0) {
      if (isFirstBusiness) {
        setNameErrors([]);
        return true;
      } else {
        let nameTaken = false;
        for (let business of user.data.businesses) {
          if (business.name === businessName) {
            nameTaken = true;
            break;
          }
        }
        if (nameTaken) {
          setNameErrors([
            'This name has already been taken by another business'
          ]);
          return false;
        } else {
          setNameErrors([]);
          return true;
        }
      }
    } else {
      setNameErrors(['You must enter a business name']);
      return false;
    }
  };

  const handleSubmit = () => {
    if (confirmInformation()) {
      saveBusiness();
    }
  };

  const renderNameErrors = () => {
    return nameErrors.map((e) => <ErrorText key={hash(e)} value={e} />);
  };

  const firstName = () => {
    return user.data.name.split(' ')[0];
  };

  return (
    <>
      <Title text='New Business' />

      <div classNmae='m-auto w-full flex justify-between'>
        <div className='mt-10'>
          <Input
            value={businessName}
            onChange={setBusinessName}
            label='Your Business Name'
            placeholder={`${firstName()}'s Amazing Business`}
            errors={nameErrors}
          />
        </div>
        <div className='m-auto w-full flex justify-end'>
          <Submit
            value='Create Business'
            mt='mt-8'
            onClick={handleSubmit}
            errors={submitErrors}
          />
        </div>
      </div>
    </>
  );
}
