import React, {useState} from 'react'
import LoadingButton from '../subcomponents/LoadingButton'

export default function UpdateIt(props){

  const [loading, setLoading] = useState(false)

  const updateIt = () => {
    setLoading(loading => !loading)
    window.setTimeout(() => {
      setLoading(false)
    }, 3000)
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