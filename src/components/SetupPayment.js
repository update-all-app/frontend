import React, {useContext} from 'react'
import UserContext from '../context/UserContext'
import Submit from '../subcomponents/Submit'
import { useHistory } from 'react-router-dom'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import {
  VALIDATE_PAYMENT
} from '../actionTypes'

export default function SetupPayment(props){

  const {state, dispatch} = useContext(UserContext)

  const history = useHistory()

  const submitPayment = async () => {
    // TODO: Implement payment, tell backedn payment setup is successful
    // add to context payment status
    dispatch({type: VALIDATE_PAYMENT})
    history.push('/')
  }

  const skipPayment = () => {
    history.push('/')
  }

  return(
    <WithHeaderAndFooter>
      <div className="flex flex-col justify-center items-center min-h-screen h-full w-full">
        <h1 className="text-4xl pb-10">STRIPE PAYMENT PLACEHOLDER PAGE</h1>
        <Submit 
          value="Confirm Payment Info"
          onClick={submitPayment}
        />
        <div className="mt-5">
          <Submit
            value="Skip for now"
            onClick={skipPayment}
          />
        </div>
      </div>
    </WithHeaderAndFooter>
  )
}
