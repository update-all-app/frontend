import React from 'react'

export default function Label(props){

  const { value, forInput } = props

  return(
    <label htmlFor={forInput} className={`block text-xs color-primary ml-2`}>{value}</label>
  )

}
