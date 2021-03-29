import React, { useState, useContext } from "react";
import LoadingButton from "../subcomponents/LoadingButton";
import { fbLogin } from "../apiClients/FBClient";
import ApiManager from "../helpers/ApiManager";

import UserContext from "../context/UserContext";
import { ADD_BUSINESS_SERVICE } from "../actionTypes";

export default function ManageEndpoints({ business }) {
  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(UserContext);

  const fbConnected = business.connecedServices && business.connectedServices.find(s => s.provider === "facebook")
  const fbButtonText = fbConnected ? "FB is connected" : "Connect Authorized FB account";
  console.log(business);


  return (
    <div className='p-4'>
      <h1 className='text-2xl'>Manage Endpoints</h1>
      <ul>
        <li>Google Maps</li>
        <LoadingButton
          value={fbButtonText}
          loadingValue='Connecting Facebook Account...'
          loading={loading}
          onClick={() => {
            setLoading(true)
            window.setTimeout(() => {
              setLoading(false)
            }, 3000)
          }}
          disabled={fbConnected}
        />
        <li>Apple Maps</li>
        <li>Yelp</li>
        <li>Trip Advisor</li>
      </ul>
    </div>
  );
}
