import React, {useState} from 'react'
import LoadingButton from '../subcomponents/LoadingButton'
import ApiManager from '../helpers/ApiManager'
import InformationBanner from '../subcomponents/InformationBanner'
import ErrorBanner from '../subcomponents/ErrorBanner'

export default function UpdateIt(props){

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

  return(
    <div className="p-4">
      {renderBanners()}
      <h1>Update main page</h1>
      <div className="mt-10">
        <LoadingButton
          value="Update It"
          loadingValue="Updating"
          loading={loading}
          onClick={updateIt}
        />
      </div>
    </div>
  )
}