import React from 'react'
import WithHeaderAndFooter from '../wrappers/WithHeaderAndFooter'
import Submit from '../subcomponents/Submit'

import { useHistory } from 'react-router-dom'

export default function NotFound(props){

  const history = useHistory()

  return(
    <WithHeaderAndFooter>
      <div className="flex h-full w-full flex-col justify-center items-center">
        <h1 className="text-4xl my-10">Oops! Can't find that page</h1>
        <Submit
          value="Go Home"
          onClick={() => {history.push('/')}}
        />
      </div>
    </WithHeaderAndFooter>
  )
}