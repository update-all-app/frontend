import React, { useState } from 'react'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import GoogleAddressForm from '../subcomponents/GoogleAddressForm'


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
      </div>
    </WithHeaderAndFooter>
  )

}