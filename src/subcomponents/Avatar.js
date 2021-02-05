import React from 'react'


export default function Avatar(props){

  const { initials } = props

  return(
    <div class="bg-secdark text-primary w-10 h-10 mr-8 rounded-full inline-flex items-center align-middle justify-center font-bold text-xl"> 
      {initials}
    </div>
  )
}