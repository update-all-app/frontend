import React, { useContext, useState } from 'react'

import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import Card from '../wrappers/Card'

import UserContext from '../context/UserContext'
import LoadingButton from '../subcomponents/LoadingButton'
import { fbLogin } from '../apiClients/FBClient'
import ApiManager from '../helpers/ApiManager'

import { ADD_AUTHORIZED_SERVICE } from '../actionTypes'

export default function AuthorizeServices(props){

  const [loadingFb, setLoadingFb] = useState(false)
  const [loadingIg, setLoadingIg] = useState(false)
  const [loadingTw, setLoadingTw] = useState(false)
  const [loadingGgl, setLoadingGgl] = useState(false)
  const {state, dispatch} = useContext(UserContext)

  const authorizedServices = state.data.services

  const buttonText = service => {
    const isAuthorized = hasService(service)
    return isAuthorized ? "Authorize another account" : "Authorize your account" 
  }

  const syncFacebook = async () => {
    setLoadingFb(true);
    try {
      const { accessToken, userID } = await fbLogin();
      console.log(`AccessToken: ${accessToken}`);
      const res = await ApiManager.getAccessTokenForFacebook(
        accessToken,
        userID
      );
      const {
        provider,
        provider_uid,
        label
      } = res
      const service = {
        provider,
        userID: provider_uid,
        label
      }
      dispatch({
        type: ADD_AUTHORIZED_SERVICE,
        payload: service
      });
    } catch (err) {
      // alert that fb login failed
    }
    setLoadingFb(false);
  };

  const syncInsta = async () => {
    setLoadingIg(true)
    window.setTimeout(() => {
      setLoadingIg(false)
    }, 3000)
  }

  const syncTwitter = async () => {
    setLoadingTw(true)
    window.setTimeout(() => {
      setLoadingTw(false)
    }, 3000)
  }

  const syncGoogle = async () => {
    setLoadingGgl(true)
    window.setTimeout(() => {
      setLoadingGgl(false)
    }, 3000)
  }

  const hasService = service => {
    return !!authorizedServices.find(s => s.provider === service)
  }

  const servicesFor = service => {
    return authorizedServices.filter(s => s.provider === service)
  }

  const renderServicesFor = service => {
    return servicesFor(service).map(s => (
      <div className="rounded bg-gray-200 text-xs p-1 m-2">
        <p>{`Auth: ${s.label}`}</p>
      </div>
    ))
  }

  const renderIcon = service => {

    if(hasService(service)){
      return(
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#059669">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
      )
    }else{
      return(
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#DC2626">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    }
  }


  return(
    <WithHeaderAndFooter>
      <div className="m-12">
        {/* <h1 className="text-center w-full text-2xl">Authorize</h1> */}
        <Card clickable={false}>
          <div className="flex flex-row align-center justify-center mb-4">
            <h1>Facebook</h1>
            {renderIcon('facebook')}
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-col">
              {renderServicesFor('facebook')}
            </div>
            <LoadingButton
              value={buttonText('facebook')}
              loadingValue='Syncing...'
              loading={loadingFb}
              onClick={syncFacebook}
            />
          </div>
        </Card>
        <Card clickable={false}>
          <div className="flex flex-column align-center justify-center mb-4">
            <h1>Instagram</h1>
            {renderIcon('instagram')}
          </div>
          <div className="flex flex-column justify-center items-center">
            <div>
              {renderServicesFor('instagram')}
            </div>
            <LoadingButton
              value={buttonText('instagram')}
              loadingValue='Syncing...'
              loading={loadingIg}
              onClick={syncInsta}
            />
          </div>
        </Card>
        <Card clickable={false}>
          <div className="flex flex-column align-center justify-center mb-4">
            <h1>Twitter</h1>
            {renderIcon('twitter')}
          </div>
          <div className="flex flex-column justify-center items-center">
            <div>
              {renderServicesFor('twitter')}
            </div>
            <LoadingButton
              value={buttonText('twitter')}
              loadingValue='Syncing...'
              loading={loadingTw}
              onClick={syncTwitter}
            />
          </div>
        </Card>
        <Card clickable={false}>
          <div className="flex flex-column align-center justify-center mb-4">
            <h1>Google</h1>
            {renderIcon('google')}
          </div>
          <div className="flex flex-column justify-center items-center">
            <div>
              {renderServicesFor('google')}
            </div>
            <LoadingButton
              value={buttonText('google')}
              loadingValue='Syncing...'
              loading={loadingGgl}
              onClick={syncGoogle}
            />
          </div>
        </Card>
      </div>
    </WithHeaderAndFooter>
  )
}