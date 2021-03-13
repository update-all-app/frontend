import React, { useState, useContext } from 'react'
import LoadingButton from '../subcomponents/LoadingButton'
import { fbLogin } from "../apiClients/FBClient"

import UserContext from '../context/UserContext'
import { ADD_BUSINESS_SERVICE } from '../actionTypes'

export default function ManageEndpoints({business}){

  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(UserContext)

  const fbConnected = business.connectedServices && business.connectedServices.includes("fb")
  const fbButtonText = fbConnected ? "FB is synced" : "Sync with FB"
  console.log(business)

  const syncFacebook = async () => {
    setLoading(true)
    try{
      const { accessToken } = await fbLogin()
      console.log(`AccessToken: ${accessToken}`)
      //send access token to backend
      dispatch({type: ADD_BUSINESS_SERVICE, payload: { business, service: "fb" }})
    }catch(err){
      // alert that fb login failed
    }
    setLoading(false)
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl">Manage Endpoints</h1>
      <ul>
        <li>Google Maps</li>
        <li>Facebook Business</li>
        <LoadingButton
          value={fbButtonText}
          loadingValue="Syncing..."
          loading={loading}
          onClick={syncFacebook}
          disabled={fbConnected}
        />
        <li>Apple Maps</li>
        <li>Yelp</li>
        <li>Trip Advisor</li>
      </ul>
    </div>
  );
}