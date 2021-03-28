import React from 'react'
import {hash} from '../helpers/functions'

export default function Sidebar(props){

  const { links, callbacks, activeLink, header } = props

  const renderHeader = () => {
    if(!!header){
      return(
        <div className="text-lg p-6 flex border-b-4 border-black justify-center items-center text-gray-500">
          <h1>{header}</h1>
        </div>
      )
    }
  }

  const renderLinks = () => {
    return links.map((link, i) => {
      let mtClass = ""
      if(i === 0){
        mtClass = !!header ? 'mt-10' : 'mt-20'
      }
      let icon = (props.children && props.children.length > i) ? props.children[i] : null

      let callback = (callbacks && callbacks.length > i) ? callbacks[i] : () => {}

      if(i === 0 && !icon && props.children){
        icon = props.children
      }

      let activatedClass = ''

      if(i === activeLink){
        activatedClass = 'active-sidebar-link'
      }

      return(
        <li key={hash(link)} className="mr-3 flex-1 mb-5 block h-full">
          <button onClick={callback} className={`ml-2 ${mtClass} block ${activatedClass} py-2 pl-4 w-full text-left text-gray-500 no-underline border-l border-secdark sidebar-link cursor-pointer focus:outline-none`}>
          {icon}<span className="pb-1 inline text-xs hidden md:inline lg:text-base">{link}</span>
          </button>
        </li>
      )
    })
  }

  return(

    <>
      <div className="w-1/5 min-w-1/5 min-h-screen h-full custom-shadow bg-primary relative bottom:0 left:0 h-full top:0 float-left">
        {renderHeader()}
        <div className="mx-auto inline">
          <ul className="list-reset bg-primary flex flex-col text-left">
            {renderLinks()}
          </ul>
        </div>
      </div>
    </>
    
  )
}
