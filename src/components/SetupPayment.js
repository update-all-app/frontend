import React from 'react'
import Submit from '../subcomponents/Submit'
import { useHistory } from 'react-router-dom'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'

export default function SetupPayment(props){

  const history = useHistory()

  const submitPayment = async () => {
    // TODO: Implement payment, tell backedn payment setup is successful
    // add to context payment status
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
      </div>
    </WithHeaderAndFooter>
  )
}
