import React, {useState} from 'react'
import LoadingButton from '../subcomponents/LoadingButton'
import ApiManager from '../helpers/ApiManager'
export default function UpdateIt(props){

  const [loading, setLoading] = useState(false)

  const updateIt = async () => {
    setLoading(loading => !loading)
    try{
      await ApiManager.updateHoursForLocation(props.business.locationIds[0])
    }catch(err){
      console.log(err)
      alert("something went wrong")
    }
  }

  return(
    <div className="p-4">
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