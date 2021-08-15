import React, { useState, useContext } from 'react'
import UserContext from '../context/UserContext'
import LoadingButton from '../subcomponents/LoadingButton'
import ApiManager from '../helpers/ApiManager'
import InformationBanner from '../subcomponents/InformationBanner'
import ErrorBanner from '../subcomponents/ErrorBanner'
import { SUPPORTED_SERVICES } from '../constants'
import getSocialMediaIcon from '../helpers/SocialMediaIcons'

export default function UpdateIt(props){

  const { business } = props
  const user = useContext(UserContext).state
  const connectedServices = user.data.services
  const serviceLookupByProviderOauthTokenId = {}
  for(let service of connectedServices){
    serviceLookupByProviderOauthTokenId[service.providerOauthTokenId] = service.provider 
  }

  const [loading, setLoading] = useState(false)
  const [showSuccessBanner, setShowSuccessBanner] = useState(false)
  const [showErrorBanner, setShowErrorBanner] = useState(false)

  const updateIt = async () => {
    setLoading(true)
    try{
      await ApiManager.updateHoursForLocation(props.business.locationIds[0])
      setShowSuccessBanner(true)
      setTimeout(() => {
        setShowSuccessBanner(false)
      }, 5000)
    }catch(err){
      console.log(err)
      setShowErrorBanner(true)
      setTimeout(() => {
        setShowErrorBanner(false)
      }, 5000)
    }
    finally{
      setLoading(false)
    }
  }

  const renderBanners = () => {
    if(showSuccessBanner){
      return (
        <InformationBanner 
          message='Your information has successfully been updated'
          onExit={() => setShowSuccessBanner(false)}
        />
      )
    }else if(showErrorBanner){
      <ErrorBanner 
        message='Something went wrong. Please try again and contact us if the problem persists'
        onExit={() => setShowErrorBanner(false)}
      />
    }
  }

  const renderServicesStatus = () => {
    const connectedPages = business.connectedPages.map(page => {
      return serviceLookupByProviderOauthTokenId[page.providerOauthTokenId]
    })
    return SUPPORTED_SERVICES.map(service => {
      if(connectedPages.includes(service.value)){
        return (
          <div className="flex-row">
            {getSocialMediaIcon(service.value)}<p>........................Up to date</p>
          </div>
        )
      }else{
        return(
          <div className="flex-row">
            {getSocialMediaIcon(service.value)}<p>........................Out of sync</p>
          </div>
        )
      }
    });
  }

  return(
    <div className="p-4">
      {renderBanners()}
      <h1 className="text-3xl m-10">Update Status</h1>
      <div>
        { renderServicesStatus() }
      </div>
      <div className="m-10">
        <LoadingButton
          value="Update It All"
          loadingValue="Updating"
          loading={loading}
          onClick={updateIt}
        />
      </div>
    </div>
  )
}