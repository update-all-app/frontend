import React from 'react'

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
      let topVal = !!header ? 10 : 20
      if(i == 0){
        mtClass = `mt-${topVal} `
      }
      let icon = (props.children && props.children.length > i) ? props.children[i] : null

      let callback = (callbacks && callbacks.length > i) ? callbacks[i] : () => {}

      if(i == 0 && !icon && props.children){
        icon = props.children
      }

      let activatedClass = ''

      if(i === activeLink){
        activatedClass = 'active-sidebar-link'
      }

      return(
        <li className="mr-3 flex-1 mb-5 block h-full">
          <a onClick={callback} className={`ml-2 ${mtClass}block ${activatedClass} py-2 pl-4 align-middle text-gray-500 no-underline border-l border-secdark sidebar-link cursor-pointer`}>
          {icon}<span className="pb-1 text-base inline">{link}</span>
          </a>
        </li>
      )
    })
  }

  return(
    <div className="w-1/5 min-h-screen h-full custom-shadow bg-primary relative bottom:0 left:0 h-full top:0 float-left">
      {renderHeader()}
      <div className="mx-auto">
        <ul className="list-reset bg-primary flex flex-col text-left">
          {renderLinks()}
        </ul>
      </div>
    </div>
  )
}
