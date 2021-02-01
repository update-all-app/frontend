import React from 'react'

function CustomerStoryCard({story: {userName, location, title, content}}) {
  return (
    <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-lx">
      <h4>{ title }</h4>   
      <h5>{ content }</h5>    
      <h6>{ userName } - { location }</h6>    
    </div>
  )
}

export default CustomerStoryCard
