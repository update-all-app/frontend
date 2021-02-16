import React from 'react'

export default function WithModal(props){

  const {
    w='3/4',
    h='7/8',
    modal=null,
    on=false,
    onExit,
    hasExit=false
  } = props

  const hiddenClass = on ? "" : "hidden"

  const renderExit = () => {
    if(hasExit){
      return (
        <div 
          className="absolute top-0 right-0 h-10 w-10 text-tertiary hover:text-terdark transition-500 cursor-pointer"
          onClick={onExit}  
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>            
        </div>
      )
    }
  }

  return (
    <>
    
    <div className={`overlay-wrapper transition `}>
      {props.children}
      <div className={`overlay-dark ${hiddenClass}`}></div>
      {/* <div className="w-full h-full flex justify-center items-center"> */}
        <div className={`z-20 absolute left-center-${w} w-${w} h-${h} m-auto bg-white overflow-scroll shadow-2xl p-10 my-10 ${hiddenClass}`}>
          {renderExit()}
          {modal}
      </div>
    </div>
    </>
  ) 
}