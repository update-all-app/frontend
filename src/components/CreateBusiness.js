import React, { useState, useContext } from 'react'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import GoogleAddressForm from '../subcomponents/GoogleAddressForm'
import Submit from '../subcomponents/Submit'
import Input from '../subcomponents/Input'
import PhoneInput from '../subcomponents/PhoneInput'
import WithModal from '../wrappers/WithModal'
import ErrorText from '../subcomponents/ErrorText'

import UserContext from '../context/UserContext'

import ApiManager from '../helpers/ApiManager'
import Parser from '../helpers/Parser'

import {
  unformatPhoneNumber, 
  formatPhoneNumber, 
  validateEmail, 
  validatePhoneNumber, 
  hash
} from '../helpers/functions'

import {
  LOADING,
  ADD_BUSINESS,
  LOADING_COMPLETE
} from '../actionTypes'

import { useHistory } from 'react-router-dom'

export default function CreateBusiness(props){

  const {dispatch } = useContext(UserContext)
  const user = useContext(UserContext).state


  const [address, setAddress] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [route, setRoute] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [country, setCountry] = useState('')

  const [addressErrors, setAddressErrors] = useState([])

  const [basicInfoSet, setBasicInfoSet] = useState(false)

  const [businessName, setBusinessName] = useState('')
  const [businessTelephone, setBusinessTelephone] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')

  const [nameErrors, setNameErrors] = useState([])
  const [telephoneErrors, setTelephoneErrors] = useState([])
  const [emailErrors, setEmailErrors] = useState([])
  const [submitErrors, setSubmitErrors] = useState([])

  const isFirstBusiness = !user.data.businesses || user.data.businesses.length === 0


  const history = useHistory()
  
  const saveBusiness = async () => {
    const businessParams = Parser.parseBusinessForRequest({
      businessName, businessEmail, businessTelephone, streetAddress,
      route, city, state, zipCode, country
    })

    try{
      dispatch({type: LOADING})
      const res = await ApiManager.createBusiness(businessParams)
      const business = Parser.parseBusinessForContext(res)
      dispatch({type: ADD_BUSINESS, payload: business})
      if(isFirstBusiness){
        history.push('/setup-payment')
      }else{
        history.push('/')
      }
    }catch(err){
      dispatch({type: LOADING_COMPLETE})
      setSubmitErrors(["An error occurred while making this business"])
    }
  }

  const goHome = () => {
    history.push('/')
  }

  const confirmLocation = () => {
    if(streetAddress && route && city && state && zipCode && country){
      setAddressErrors([])
      saveBusiness()
      
    }else{
      setAddressErrors(['Please select your address'])
    }
  }

  const updatePhoneNumber = num => {
    const unformattedPhoneNumber = unformatPhoneNumber(num)
    const formattedPhoneNumber = formatPhoneNumber(unformattedPhoneNumber)
    setBusinessTelephone(formattedPhoneNumber)
  }

  const updateEmail = email => {
    setBusinessEmail(email)
  }

  const confirmInformation = async () => {
    const validEmail = validateEmail(businessEmail)
    const validPhoneNumber = validatePhoneNumber(businessTelephone)
    const validName = businessName.length > 0
    if(!validEmail){
      setEmailErrors(['You must enter a valid email'])
    }else{
      setEmailErrors([])
    }
    if(!validPhoneNumber){
      setTelephoneErrors(['You must enter a valid phone number'])
    }else{
      setTelephoneErrors([])
    }
    if(!validName){
      setNameErrors(['You must enter a business name'])
    }else{
      setNameErrors([])
    }
    if(validEmail && validPhoneNumber && validName){
      setBasicInfoSet(true)
    }
  }

  const renderAddressErrors = () => {
    return addressErrors.map(e => (
      <ErrorText
        key={hash(e)}
        value={e}
      />
    ))
  }

  const renderExit = () => {
    if(isFirstBusiness){
      return null
    }else{
      return (
      <div 
        className="absolute top-0 right-0 h-10 w-10 text-tertiary hover:text-terdark transition-500 cursor-pointer"
        onClick={goHome}  
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      )
    }
  }

  if(basicInfoSet){
    return(
      <WithHeaderAndFooter>
        <WithModal>
          {renderExit()}
          <h1 className="mt-10 text-3xl font-black text-center">Set up your business</h1>
          <h1 className="mt-10 text-xl font-thin text-center mb-0">Where are you located?</h1>
          <div className='mb-8'>
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
            <div className="m-auto w-160 flex justify-between">
              <Submit 
                value="Confirm Location"
                mt={8}
                onClick={confirmLocation}
              />
              {renderAddressErrors()}
              <div className="float-right">
              <Submit 
                value="Back"
                mt={8}
                onClick={() => setBasicInfoSet(false)}
                />
              </div>
            </div>
            
            
          </div>
        </WithModal>
      </WithHeaderAndFooter>
    )
  }else{
    return(
      <WithHeaderAndFooter>
        <WithModal h="3/4">
          {renderExit()}
          <h1 className="mt-10 text-3xl font-black text-center">Set up your business</h1>
          <h1 className="mt-10 text-xl font-thin text-center mb-0">Tell us your business contact information</h1>
          <div className="flex flex-row justify-left items-baseline m-auto w-160 p-2">
            <div className='mt-10 w-full'>

              <Input
                value={businessName}
                onChange={setBusinessName}
                label="Business Name"
                placeholder="My Amazing Business"
                errors={nameErrors}
                w='11/12'
              />
              <div className="flex flex-row space-between">
                <PhoneInput 
                  value={businessTelephone}
                  placeholder="eg 111-111-1111"
                  label="Business Phone"
                  onChange={updatePhoneNumber}
                  errors={telephoneErrors}
                  w='11/12'
                />
                <Input 
                  value={businessEmail}
                  placeholder="business@email.here"
                  label="Business Email"
                  onChange={updateEmail}
                  errors={emailErrors}
                  w='11/12'
                />
              </div>
    
            </div>
          </div>
          <div className="m-auto w-160 flex justify-between">
            <Submit 
                value="Confirm Information"
                mt={8}
                onClick={confirmInformation}
                errors={submitErrors}
              />
              
          </div>
        </WithModal>
      </WithHeaderAndFooter>
    )
  }

}