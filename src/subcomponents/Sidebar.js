import React from 'react'

export default function Sidebar(props){

  const { links } = props

  const renderLinks = () => {
    return links.map((link, i) => {
      let mtClass = ""
      if(i == 0){
        mtClass = "mt-20 "
      }
      return(
        <li class="mr-3 flex-1 mb-5">
          <a href="#" className={`ml-2 ${mtClass}block py-2 pl-4 align-middle text-gray-500 no-underline border-l border-secdark sidebar-link`}>
          <i class="fas fa-link pr-0"></i><span class=" pb-1 text-base block">{link}</span>
          </a>
        </li>
      )
    })
  }

  return(
    <div class="w-1/5 min-h-screen custom-shadow bg-primary relative bottom:0 left:0 h-full top:0">
      <div class="mx-auto">
        <ul class="list-reset bg-primary flex flex-col text-left">
          {renderLinks()}
        </ul>
      </div>
    </div>
  )
}
