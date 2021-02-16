import React from 'react'
import Input from '../subcomponents/Input'
import Submit from '../subcomponents/Submit'

export default function EditBusiness(props){

  const {business} = props

  const {
    addressLine1,
    addressLine2,
    city,
    state,
    zipcode,
    country,
    name,
    emailAddress,
    phoneNumber,
    id
  } = business

  return(
    <div className="m-auto w-3/4">
      <Input
        label="Business Name"
        value={name}
      />
      <div className="flex flex-row justify-between">
        <Input 
          label="Business Email"
          value={emailAddress}
          w="11/12"
        />
        <Input
          label="Phone Number"
          value={phoneNumber}
          w="11/12"
        />
      </div>
      <div className="flex flex-row justify-between">
        <Input 
          label="Street Number"
          value={addressLine1}
          w="11/12"
        />
        <Input 
          label="Streen Name"
          value={addressLine2}
          w="11/12"
        />
      </div>
      <div className="flex flex-row justify-between">
        <Input 
          label="City"
          value={city}
          w="11/12"
        />
        <Input 
          label="State"
          value={state}
          w="11/12"
        />
        <Input 
          label="Zip Code"
          value={zipcode}
          w="11/12"
        />
      </div>
      
      <Input 
        label="Country"
        value={country}
        w="1/2"
      />

      <Submit 
        value="Save"
      />
      
    </div>
  )
}