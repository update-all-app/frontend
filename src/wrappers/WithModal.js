import React from 'react'

export default function WithModal(props){

  const {
    w='3/4',
    h='7/8'
  } = props

  return(
    <div className="overlay-wrapper transition">
      <div className="overlay-dark"></div>
      <div className="w-full h-full flex justify-center items-center">
        <div className={`z-20 relative w-${w} h-${h} bg-white overflow-scroll shadow-2xl p-10 my-10`}>
          {props.children}
        </div>
      </div>
    </div>
  )
}