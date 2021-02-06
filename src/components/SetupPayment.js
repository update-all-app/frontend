import React from 'react'
import Submit from '../subcomponents/Submit'
import { useHistory } from 'react-router-dom'

export default function SetupPayment(props){

  const history = useHistory()

  return(
    <div>
      <h1>STRIPE PAYMENT PAGE</h1>
      <Submit 
        value="Confirm Payment Info"
        onClick={() => {history.push("/home")}}
      />
    </div>
  )
}
