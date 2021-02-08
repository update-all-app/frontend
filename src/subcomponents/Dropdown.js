import React from 'react'
import { hash } from '../helpers/functions'
import usePrev from '../hooks/usePrev'


export default function Dropdown(props){

  const {
    links, hidden
  } = props

  const prevHidden = usePrev(hidden)

  const renderLinks = () => {
    const linkComponents = []
    for(let link in links){
      linkComponents.push(
        <a onClick={links[link]} key={hash(link)} class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{link}</a>
      )
    }
    return linkComponents
  }

  const entering = "transition ease-out duration-100"
  const enteringFrom = "transform opacity-0 scale-95"
  const enteringTo = "transform opacity-100 scale-100"
  const leaving = "transition ease-in duration-75"
  // const leavingFrom = "transform opacity-100 scale-100"
  const leavingTo = "transform opacity-0 scale-95"

  let className
  if(hidden && prevHidden === undefined){
    // Initial render
    className=`${entering} ${enteringFrom} absolute -z-10`
  }else if(!hidden && prevHidden){
    // display the modal
    className=`${entering} ${enteringTo} absolute z-30`
  }else if(hidden && !prevHidden){
    //going away
    className=`${leaving} ${leavingTo} absolute -z-10`
  }else{
    className=`${entering} ${enteringFrom} absolute -z-10`
  }

  return (
    <div className={`absolute z-30 origin-top-right  right-0 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 border-terdark border-t-4 border-l-2 border-b-2 border-r-2 ${className}`}>
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {renderLinks()}
      </div>
    </div>
  )
}