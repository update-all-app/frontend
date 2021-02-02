import React, { useState } from 'react'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import GoogleAddressForm from '../subcomponents/GoogleAddressForm'
import Submit from '../subcomponents/Submit'

export default function CreateBusiness(props){
  const [address, setAddress] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [route, setRoute] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')

  return(
    <WithHeaderAndFooter>
      <h1 className="mt-10 text-3xl font-black text-center">Set up your first business</h1>
      <h1 className="mt-10 text-xl font-thin text-center">Where are you located?</h1>
      <div className='w-1/2 m-auto my-10'>
        <GoogleAddressForm 
          address={address}
          setAddress={setAddress}
          streetAddress={streetAddress}
          setStreetAddress={setStreetAddress}
          route={route}
          setRoute={setRoute}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zipCode={zipCode}
          setZipCode={setZipCode}
          country={country}
          setCountry={setCountry}
        />
        <div className="m-auto w-160">
          <Submit 
            value="Verify Location"
            mt={8}
            onClick={() => {}}
          />
        </div>
        
      </div>
      
    </WithHeaderAndFooter>
  )

}