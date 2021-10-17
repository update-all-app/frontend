import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';
import Submit from '../subcomponents/Submit';
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter';
import { VALIDATE_PAYMENT, LOADING, LOADING_COMPLETE } from '../actionTypes';
import UserApiManager from '../apiClients/UserApiManager';
import { Title } from '../subcomponents/Title';

export default function SetupPayment(props) {
  const { state, dispatch } = useContext(UserContext);

  const [paymentErrors, setPaymentErrors] = useState([]);

  const history = useHistory();

  const submitPayment = async () => {
    // TODO: Implement payment, tell backedn payment setup is successful
    // add to context payment status
    try {
      dispatch({ type: LOADING });
      const res = await UserApiManager.completePayment(state.data);
      dispatch({ type: VALIDATE_PAYMENT });
      history.push('/');
    } catch (err) {
      console.log(err);
      setPaymentErrors(['There was a problem updating your payment']);
      dispatch({ type: LOADING_COMPLETE });
    }
  };

  const skipPayment = () => {
    history.push('/');
  };

  return (
    <>
      <Title text='Set Up Payment' />

      <Submit
        value='Confirm Payment Info'
        onClick={submitPayment}
        errors={paymentErrors}
      />
      <div className='mt-5'>
        <Submit value='Skip for now' onClick={skipPayment} />
      </div>
    </>
  );
}
