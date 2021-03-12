import React from 'react'

export default function WithModal(props){

  const {
    w='max-w-2xl w-11/12',
    h = '',
    position= 'top-8',
    background = null, 
    overflowScroll = 'overflow-scroll'
  } = props

  return(
    <div className="relative h-screen transition duration-300 withModal">
      <div className="overlay-dark"></div>
      {background}
      <div className="w-full h-full flex justify-center items-center">
        <div className={`z-20 relative ${w} ${h} ${position} bg-white ${overflowScroll} shadow-2xl p-10 my-10`}>
          {props.children}
        </div>
      </div>
    </div>
  )
}