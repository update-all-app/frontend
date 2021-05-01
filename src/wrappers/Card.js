import React from 'react'


export default function Card(props){

  const {
    onClick=()=>{},
    clickable=true
  } = props

  const clickableClasses = clickable ? 'cursor-pointer hover:bg-secondary transition duration-500' : ''

  return(
    <div 
      className={`${clickableClasses} border-l-2 border-primary inline-block shadow-lg p-10 w-80 overflow-hidden m-8`}
      onClick={onClick}
    >   
      {props.children}
    </div>
  )
}