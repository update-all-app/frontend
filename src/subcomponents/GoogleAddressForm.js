import React, { useState, useEffect } from 'react'
import GoogleAutocompleteAddressManager from '../helpers/GoogleAutocompleteAddressManager'
import Input from './Input'

import { hash } from '../helpers/functions'

export default function GoogleAddressForm(props){

  const { 
    address,
    setAddress,      
    streetAddress, 
    setStreetAddress,  
    route,
    setRoute,
    city, 
    setCity,
    state, 
    setState,
    zipCode,
    setZipCode,
    country,
    setCountry
  } = props

  const [autocompleteHash, setAutocompleteHash] = useState('')

  useEffect(() => {
    // const id = hash(String(new Date()))
    // setAutocompleteHash(id)
    let autocompleteManager = GoogleAutocompleteAddressManager.get_instance(1)
    if(!autocompleteManager){
      autocompleteManager = GoogleAutocompleteAddressManager.new_cache(1)
    }
    autocompleteManager.setUpdateStreetAddress(setStreetAddress)
    autocompleteManager.setUpdateRoute(setRoute)
    autocompleteManager.setUpdateCity(setCity)
    autocompleteManager.setUpdateState(setState)
    autocompleteManager.setUpdatePostalCode(setZipCode)
    autocompleteManager.setUpdateCountry(setCountry)

    window.initAutocomplete = autocompleteManager.initAutocomplete.bind(autocompleteManager)

    if(!window.google){
      const script = document.createElement('script');
      script.id = "places_script"
      script.type = 'text/javascript'
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBI6tsN2PSJg4LyI0R2fmmR-dBM_VRYPuQ&callback=initAutocomplete&libraries=places&v=weekly'
      script.async = false
      document.body.appendChild(script)
      console.log('Script added')
    }else{
      autocompleteManager.initAutocomplete()
    }
    

    return () => {
      window.initAutocomplete = () => {}
      autocompleteManager.cleanupAutocomplete()

      const script = document.querySelector("#places_script")
      if(!!script){
        script.remove()
        console.log("removed")
      }
      GoogleAutocompleteAddressManager.remove_instance(1)
    }
  }, [setStreetAddress, setRoute, setCity, setState, setZipCode, setCountry])


  let autocompleteManager = GoogleAutocompleteAddressManager.get_instance(1)
  console.log(autocompleteManager)
  if(!autocompleteManager){
    autocompleteManager = GoogleAutocompleteAddressManager.new_cache(1)
    autocompleteManager.setUpdateStreetAddress(setStreetAddress)
    autocompleteManager.setUpdateRoute(setRoute)
    autocompleteManager.setUpdateCity(setCity)
    autocompleteManager.setUpdateState(setState)
    autocompleteManager.setUpdatePostalCode(setZipCode)
    autocompleteManager.setUpdateCountry(setCountry)
    window.initAutocomplete = autocompleteManager.initAutocomplete.bind(autocompleteManager)
  }
  

  return autocompleteManager ? (
    <div>
      <Input
        id="autocomplete"
        placeholder="Enter your address"
        onFocus={autocompleteManager.geolocate} 
        onChange={setAddress}
        value={address}
      />
      <div className="display-inline-block mb-10">
        <Input 
          id="street_number"
          placeholder="Street Address"
          onChange={() => {}}
          value={streetAddress}
          disabled={true}
          display='inline'
          w='1/4'
        />
        <Input 
          id="route"
          placeholder="Street Name"
          onChange={() => {}}
          value={route}
          disabled={true}
          display='inline'
          w='3/4'
        />
      </div>
      
      <div className="display-inline-block mb-10">
        <Input 
          id="locality"
          placeholder="City"
          onChange={() => {}}
          value={city}
          disabled={true}
          display='inline'
          w='1/4'
        />
        <Input 
          id="administrative_area_level_1"
          placeholder="State"
          onChange={() => {}}
          value={state}
          display='inline'
          w='1/4'
        />
        <Input 
          id="postal_code"
          placeholder="Zip Code"
          onChange={() => {}}
          value={zipCode}
          display='inline'
          w='1/4'
        />
      </div>
      <Input 
        id="country"
        placeholder="Country"
        onChange={() => {}}
        value={country}
        w='1/2'
      />
    </div>
  ) : (
  <>
    <div className="overlay"></div>
    <div className="loader">Loading...</div>
  </>)

}